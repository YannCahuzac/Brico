package fr.yca.brico.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.yca.brico.bean.Post;
import fr.yca.brico.bean.Utilisateur;
import fr.yca.brico.dao.PostDao;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.JsonFLux;
import fr.yca.brico.utils.Outils;
import fr.yca.brico.utils.TypeRecherche;

@Service("postSrv")
@Transactional
public class PostSrv {

	final static Logger logger = Logger.getLogger(PostSrv.class.getName());

	protected EntityManager entityManager;

	public EntityManager getEntityManager() {
		return entityManager;
	}

	@PersistenceContext
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
	 * Création d'un nouveau post parent.
	 */
	public JsonFLux createPost(PostDao postDao) {
		JsonFLux fluxRet = new JsonFLux();
		fluxRet.setCreate(Boolean.TRUE);

		if (Outils.isValidPostDao(postDao)) {
			try {
				entityManager.merge(new Post(postDao, true));
			} catch (Exception e) {
				fluxRet.setCreate(Boolean.FALSE);
				fluxRet.setLib1("Exception en base lors de la création du post.");
				logger.info("Exception lors de la création du post: " + e.getMessage());
			}
		} else {
			fluxRet.setCreate(Boolean.FALSE);
			fluxRet.setLib1("Enregistrement impossible: il faut saisir tous les champs obligatoires et respecter la taille limite pour chaque champs.");
		}
		return fluxRet;
	}

	/**
	 * Validation d'un post parent.
	 */
	public JsonFLux validatePost(PostDao postDao) {
		JsonFLux fluxRet = new JsonFLux();
		fluxRet.setCreate(Boolean.TRUE);
		if (postDao != null && postDao.getIdPost() != null) {
			try {
				entityManager.createQuery(Constants.validatePosts).setParameter("id", postDao.getIdPost()).executeUpdate();
			} catch (Exception e) {
				fluxRet.setCreate(Boolean.FALSE);
				fluxRet.setLib1("Exception en base lors de la validation du post.");
				logger.info("Exception lors de la validation du post: " + e.getMessage());
			}
		} else {
			fluxRet.setCreate(Boolean.FALSE);
			fluxRet.setLib1("Aucun post id à valider.");
		}
		return fluxRet;
	}

	/**
	 * Methode générique pour recuperer les posts en base en fonction d'une clause WHERE.
	 */
	public List<PostDao> getPosts(TypeRecherche typeRecherche, Integer idRecherche) {

		List<PostDao> ret = null;
		List<Object> postList = null;
		TypedQuery<Object> tq = null;

		try {
			switch (typeRecherche) {
			case FIND_POSTS_BY_ID_POST:
				if (idRecherche != null) {
					tq = entityManager.createQuery(Constants.findPostsByIdPost, Object.class).setParameter("idPostRef", idRecherche).setParameter("idPost", idRecherche);
				}
				break;
			case FIND_POSTS_BY_ID_THEME:
				if (idRecherche != null) {
					tq = entityManager.createQuery(Constants.findPostsByIdTheme, Object.class).setParameter("themeId", idRecherche);
				}
				break;
			case FIND_POSTS_BY_ID_USER:
				if (idRecherche != null) {
					tq = entityManager.createQuery(Constants.findPostsByIdUser, Object.class).setParameter("idUserCreation", idRecherche);
				}
				break;
			case FIND_RECENTS_POSTS:
				tq = entityManager.createQuery(Constants.findRecentsPosts, Object.class).setMaxResults(Constants.MAX_POST_RESULT);
				break;
			}
			if (tq != null) {
				postList = tq.getResultList();
			}
		} catch (NoResultException nre) {
			logger.info("Aucun post trouve.");
		} catch (Exception e) {
			logger.info("Exception lors de la recherche des posts: " + e.getMessage());
		}

		if (postList != null && postList.size() > 0) {
			ret = new ArrayList<PostDao>();
			Object[] o = null;
			Post post = null;
			Utilisateur user = null;
			Iterator<Object> itPost = postList.iterator();
			while (itPost.hasNext()) {
				o = (Object[]) itPost.next();
				if (o != null && o.length > 1 && o[0] instanceof Post && o[0] != null && o[1] instanceof Utilisateur && o[1] != null) {
					post = (Post) o[0];
					user = (Utilisateur) o[1];
					ret.add(new PostDao(post, user, typeRecherche));
					post = null;
					user = null;
				}
				o = null;
			}
		}
		return ret;
	}
}