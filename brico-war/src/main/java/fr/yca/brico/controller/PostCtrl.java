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
		// TODO Voir Gestion si y'a plus de 20 posts retournés
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_POSTS_BY_ID_THEME, themeId);
		if (ret == null || (ret != null && ret.size() == 0)) {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
		}
	}

	@ResponseBody
	@RequestMapping(value = "getPostsByPostId/{postId}", method = RequestMethod.GET)
	public ResponseEntity<List<PostDao>> getPostsByPostId(HttpServletRequest request, @PathVariable("postId") int postId) {
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_POSTS_BY_ID_POST, postId);
		if (ret == null || (ret != null && ret.size() == 0)) {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
		}
	}

	@ResponseBody
	@RequestMapping(value = "getPostsByUserId/{userId}", method = RequestMethod.GET)
	public ResponseEntity<List<PostDao>> getPostsByUserId(HttpServletRequest request, @PathVariable("userId") int userId) {
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_POSTS_BY_ID_USER, userId);
		if (ret == null || (ret != null && ret.size() == 0)) {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
		}
	}

	@ResponseBody
	@RequestMapping(value = "getRecentsPosts", method = RequestMethod.GET)
	public ResponseEntity<List<PostDao>> getRecentsPosts(HttpServletRequest request) {
		List<PostDao> ret = postSrv.getPosts(TypeRecherche.FIND_RECENTS_POSTS, null);
		if (ret == null || (ret != null && ret.size() == 0)) {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<PostDao>>(ret, HttpStatus.OK);
		}
	}

	/**
	 * Création d'un nouveau post parent.
	 */
	@ResponseBody
	@RequestMapping(value = "createPost", method = { RequestMethod.POST }, consumes = "application/json")
	public ResponseEntity<Boolean> createPost(@RequestBody PostDao postDao) {

		// TODO Voir comment retourner erreur personnalisées.
		Boolean ret = Boolean.TRUE;
		HttpStatus httpStatus = HttpStatus.CREATED;

		ret = postSrv.createPost(postDao);

		if (!ret) {
			httpStatus = HttpStatus.BAD_REQUEST;
		}

		return new ResponseEntity<Boolean>(ret, httpStatus);
	}

}