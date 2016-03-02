package fr.yca.brico.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import fr.yca.brico.dao.PostDao;
import fr.yca.brico.services.PostSrv;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.JsonFLux;
import fr.yca.brico.utils.TypeRecherche;

@EnableWebMvc
@Controller("postCtrl")
public class PostCtrl {

	final static Logger logger = Logger.getLogger(PostCtrl.class.getName());

	@Autowired
	PostSrv postSrv;

	@ResponseBody
	@RequestMapping(value = "getPostsByThemeId/{themeId}", method = RequestMethod.GET)
	public ResponseEntity<List<PostDao>> getPostsByThemeId(HttpServletRequest request, @PathVariable("themeId") int themeId) {
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_POSTS_BY_ID_THEME, themeId);
		return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "getPostsByPostId/{postId}", method = RequestMethod.GET)
	public ResponseEntity<List<PostDao>> getPostsByPostId(HttpServletRequest request, @PathVariable("postId") int postId) {
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_POSTS_BY_ID_POST, postId);
		return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "getPostsByUserId/{userId}", method = RequestMethod.GET)
	public ResponseEntity<List<PostDao>> getPostsByUserId(HttpServletRequest request, @PathVariable("userId") int userId) {
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_POSTS_BY_ID_USER, userId);
		return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "getRecentsPosts", method = RequestMethod.GET)
	public ResponseEntity<List<PostDao>> getRecentsPosts(HttpServletRequest request) {
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_RECENTS_POSTS, null);
		return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
	}

	/**
	 * Création d'un nouveau post parent.
	 */
	@ResponseBody
	@RequestMapping(value = "createPost", method = { RequestMethod.POST }, consumes = "application/json")
	public ResponseEntity<JsonFLux> createPost(HttpServletRequest request, @RequestBody PostDao postDao) {

		// Vérification du token pour pouvoir créer le post:
		logger.info("Creation Post: [User Id: " + postDao.getIdUserCreation() + "; Token User Client: " + postDao.getTokenUser() + "; Token User Serveur: "
				+ request.getSession().getAttribute(Constants.TOKEN) + "]");

		JsonFLux fluxRet = null;

		if (request.getSession() != null && postDao.getTokenUser() != null && postDao.getTokenUser().equals(request.getSession().getAttribute(Constants.TOKEN))) {
			fluxRet = postSrv.createPost(postDao);
		} else {
			fluxRet = new JsonFLux();
			fluxRet.setCreate(Boolean.FALSE);
			fluxRet.setLib1("Enregistrement impossible: authentification KO.");
		}

		return new ResponseEntity<JsonFLux>(fluxRet, HttpStatus.OK);
	}

	/**
	 * Validation d'un post parent.
	 */
	@ResponseBody
	@RequestMapping(value = "validatePost", method = { RequestMethod.POST }, consumes = "application/json")
	public ResponseEntity<JsonFLux> validatePost(HttpServletRequest request, @RequestBody PostDao postDao) {

		// Vérification du token pour pouvoir valider le post:
		logger.info("Validation Post: [User Id: " + postDao.getIdUserCreation() + "; Token User Client: " + postDao.getTokenUser() + "; Token User Serveur: "
				+ request.getSession().getAttribute(Constants.TOKEN) + "]");

		JsonFLux fluxRet = null;

		if (request.getSession() != null && postDao.getTokenUser() != null && postDao.getTokenUser().equals(request.getSession().getAttribute(Constants.TOKEN))) {
			fluxRet = postSrv.validatePost(postDao);
		} else {
			fluxRet = new JsonFLux();
			fluxRet.setCreate(Boolean.FALSE);
			fluxRet.setLib1("Validation du post impossible: authentification KO.");
		}

		return new ResponseEntity<JsonFLux>(fluxRet, HttpStatus.OK);
	}
}