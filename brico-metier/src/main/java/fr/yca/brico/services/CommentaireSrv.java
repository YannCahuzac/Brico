package fr.yca.brico.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.yca.brico.bean.Commentaire;
import fr.yca.brico.dao.CommentaireDao;

@Service("utilisateurSrv")
@Transactional
public class CommentaireSrv {

	final static Logger logger = Logger.getLogger(CommentaireSrv.class.getName());

	protected EntityManager entityManager;

	@Autowired
	Commentaire commentaire;

	public EntityManager getEntityManager() {
		return entityManager;
	}

	@PersistenceContext
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
	 * @return la liste des commentaires en fonction du theme id en entrée.
	 */
	public List<CommentaireDao> getCommByThemeId(int themeId) {
		List<CommentaireDao> ret = null;
		List<Commentaire> commList = null;
		try {
			commList = entityManager.createQuery("select c from Commentaire c where c.themeId = :themeId", Commentaire.class).setParameter("themeId", themeId).getResultList();
		} catch (NoResultException nre) {
			logger.info("Aucun commentaire trouve.");
		} catch (Exception e) {
			logger.info("Exception lors de la recherche des commentaires: " + e.getMessage());
		}
		if (commList != null && commList.size() > 0) {
			ret = new ArrayList<CommentaireDao>();
			Iterator<Commentaire> itComm = commList.iterator();
			while (itComm.hasNext()) {
				Commentaire comm = itComm.next();
				if (comm != null) {
					ret.add(new CommentaireDao(comm));
				}
			}
		}
		return ret;
	}
}