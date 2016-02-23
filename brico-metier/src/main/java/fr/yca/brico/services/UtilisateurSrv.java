package fr.yca.brico.services;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.yca.brico.bean.Utilisateur;
import fr.yca.brico.dao.UtilisateurDao;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.JsonFLux;
import fr.yca.brico.utils.Outils;

/**
 * @Component | generic stereotype for any Spring-managed component
 * @Repository| stereotype for persistence layer
 * @Service | stereotype for service layer
 * @Controller| stereotype for presentation layer (spring-mvc)
 * @Transactional| c'est pour dire à Spring que c'est cette classe qu'il doit transactionner (attention à bien mettre le @PersistenceContext sur l'em pour Spring).
 */

@Service("utilisateurSrv")
@Transactional
public class UtilisateurSrv {

	final static Logger logger = Logger.getLogger(UtilisateurSrv.class.getName());

	protected EntityManager entityManager;

	@Autowired
	Utilisateur utilisateur;

	public UtilisateurSrv() {
		super();
	}

	/**
	 * Recupere et retourne l'utilisateur en base avec ses identifiants.
	 */
	public UtilisateurDao getUserByMailAndPsw(String mail, String psw) {
		UtilisateurDao userDao = null;
		try {
			Utilisateur user = entityManager.createQuery("select t from Utilisateur t where t.mail = :mail and t.password = :psw", Utilisateur.class).setParameter("mail", mail)
					.setParameter("psw", psw).getSingleResult();
			if (user != null) {
				userDao = new UtilisateurDao(user);
			}
		} catch (NoResultException nre) {
			logger.info("Aucun utilisateur trouve.");
		} catch (Exception e) {
			logger.info("Exception lors de la recherche d'utilisateur: " + e.getMessage());
		}
		return userDao;
	}

	/************************** SPRING SECURITY **************************/
	public UserDetails getUserRole(String username) {
		UserDetails ret = null;
		try {
			ret = entityManager.createQuery("select t from Utilisateur t where t.pseudo = :username", Utilisateur.class).setParameter("username", username).getSingleResult();
		} catch (Exception e) {
			logger.error(e);
		}
		return ret;
	}

	public EntityManager getEntityManager() {
		return entityManager;
	}

	@PersistenceContext
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
	 * Créer un nv compte Utilisateur:
	 */
	public JsonFLux createNewAccount(UtilisateurDao utilisateurDao) {
		JsonFLux fluxRet = new JsonFLux();
		fluxRet.setCreate(Boolean.TRUE);

		if (!(Outils.isFull(utilisateurDao.getMail(), 200) && Outils.isFull(utilisateurDao.getCp(), 10) && Outils.isFull(utilisateurDao.getPseudo(), 100)
				&& Outils.isFull(utilisateurDao.getPassword(), 100) && Outils.isFull(utilisateurDao.getVille(), 100) && Outils.isFull(utilisateurDao.getRue(), 100))) {
			// Vérif champs obligatoires saisis:
			fluxRet.setCreate(Boolean.FALSE);
			fluxRet.setLib1("Enregistrement impossible: il faut saisir tous les champs obligatoires et respecter la taille limite pour chaque champs.");
		} else if (!Outils.checkMail(utilisateurDao.getMail())) {
			// Vérif regex mail:
			fluxRet.setCreate(Boolean.FALSE);
			fluxRet.setLib1("Enregistrement impossible car le mail saisi est incorrect.");
		} else if (!Outils.checkNum(utilisateurDao.getCp())) {
			// Vérif regex cp:
			fluxRet.setCreate(Boolean.FALSE);
			fluxRet.setLib1("Enregistrement impossible car le code postal saisi est incorrect.");
		} else {
			try {
				// Vérif mail existant base:
				Long countMail = entityManager.createQuery(Constants.countUserMail, Long.class).setParameter("mail", utilisateurDao.getMail().trim()).getSingleResult();
				if (countMail > 0) {
					fluxRet.setCreate(Boolean.FALSE);
					fluxRet.setLib1("Création de compte impossible car le mail donné existe déjà.");
				} else {
					// Vérif cp existant base:
					Long countPseudo = entityManager.createQuery(Constants.countUserPseudo, Long.class).setParameter("pseudo", utilisateurDao.getPseudo().trim()).getSingleResult();
					if (countPseudo > 0) {
						fluxRet.setCreate(Boolean.FALSE);
						fluxRet.setLib1("Création de compte impossible car le pseudo donné est déjà utilisé.");
					} else {
						entityManager.merge(new Utilisateur(utilisateurDao, true));
					}
				}
			} catch (Exception e) {
				fluxRet.setCreate(Boolean.FALSE);
				logger.info("Exception lors de la création de l'utilisateur: " + e.getMessage());
				fluxRet.setLib1("Exception en base lors de la création de l'utilisateur.");
			}
		}
		return fluxRet;
	}
}