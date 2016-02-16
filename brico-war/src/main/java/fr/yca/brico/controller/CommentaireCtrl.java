package fr.yca.brico.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import fr.yca.brico.dao.CommentaireDao;
import fr.yca.brico.services.CommentaireSrv;

@EnableWebMvc
@Controller("commentaireCtrl")
public class CommentaireCtrl {

	final static Logger logger = Logger.getLogger(CommentaireCtrl.class.getName());

	@Autowired
	CommentaireSrv commentaireSrv;

	@ResponseBody
	@RequestMapping(value = "getCommByThemeId/{themeId}", method = RequestMethod.GET)
	public ResponseEntity<List<CommentaireDao>> getCommByThemeId(HttpServletRequest request, @PathVariable("themeId") int themeId) {
		// TODO Voir Gestion si y'a plus de 20 commentaires retournés
		List<CommentaireDao> ret = commentaireSrv.getCommByThemeId(themeId);
		if (ret == null || (ret != null && ret.size() == 0)) {
			// TODO Voir comment retourner erreur personnalisées.
			return new ResponseEntity<List<CommentaireDao>>(ret, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<CommentaireDao>>(ret, HttpStatus.OK);
		}
	}
}