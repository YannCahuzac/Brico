package fr.yca.brico.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.yca.brico.bean.Post;
import fr.yca.brico.dao.PostDao;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.TypeRecherche;

@Service("postSrv")
@Transactional
public class PostSrv {

	final static Logger logger = Logger.getLogger(PostSrv.class.getName());

	protected EntityManager entityManager;

	@Autowired
	Post post;

	public EntityManager getEntityManager() {
		return entityManager;
	}

	@PersistenceContext
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
	 * Methode générique pour recuperer les posts en base en fonction d'une clause WHERE.
	 */
	public List<PostDao> getPosts(TypeRecherche typeRecherche, Integer idRecherche) {

		List<PostDao> ret = null;
		List<Post> postList = null;
		TypedQuery<Post> tq = null;

		try {
			switch (typeRecherche) {
			case FIND_POSTS_BY_ID_POST:
				if (idRecherche != null) {
					tq = entityManager.createQuery(Constants.findPostsByIdPost, Post.class).setParameter("idPostRef", idRecherche).setParameter("idPost", idRecherche);
				}
				break;
			case FIND_POSTS_BY_ID_THEME:
				if (idRecherche != null) {
					tq = entityManager.createQuery(Constants.findPostsByIdTheme, Post.class).setParameter("themeId", idRecherche);
				}
				break;
			case FIND_POSTS_BY_ID_USER:
				if (idRecherche != null) {
					tq = entityManager.createQuery(Constants.findPostsByIdUser, Post.class).setParameter("idUserCreation", idRecherche);
				}
				break;
			case FIND_RECENTS_POSTS:
				tq = entityManager.createQuery(Constants.findRecentsPosts, Post.class).setMaxResults(Constants.MAX_POST_RESULT);
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
			Iterator<Post> itPost = postList.iterator();
			while (itPost.hasNext()) {
				Post post = itPost.next();
				if (post != null) {
					ret.add(new PostDao(post, typeRecherche));
				}
			}
		}
		return ret;
	}
}