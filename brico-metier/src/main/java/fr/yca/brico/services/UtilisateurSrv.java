package fr.yca.brico.services;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.yca.brico.bean.Utilisateur;

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
}