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
	public Boolean createNewAccount(UtilisateurDao utilisateurDao) {
		Boolean ret = Boolean.TRUE;
		// TODO Vérification Regex
		// TODO Trim
		// TODO Vérification DB Existant
		// TODO Enregistrement
		return ret;
	}
}