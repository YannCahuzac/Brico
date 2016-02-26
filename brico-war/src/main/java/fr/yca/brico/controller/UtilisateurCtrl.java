package fr.yca.brico.controller;

import java.util.Random;

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

import fr.yca.brico.dao.UtilisateurDao;
import fr.yca.brico.services.UtilisateurSrv;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.JsonFLux;

@EnableWebMvc
@Controller("utilisateurCtrl")
public class UtilisateurCtrl {

	final static Logger logger = Logger.getLogger(UtilisateurCtrl.class.getName());

	@Autowired
	UtilisateurSrv utilisateurSrv;

	@ResponseBody
	@RequestMapping(value = "getUserByMailAndPsw/mail/{mail}/psw/{psw}", method = RequestMethod.GET)
	public ResponseEntity<UtilisateurDao> getUserByMailAndPsw(HttpServletRequest request, @PathVariable("mail") String mail, @PathVariable("psw") String psw) {

		UtilisateurDao user = utilisateurSrv.getUserByMailAndPsw(mail, psw);
		if (user == null) {
			return new ResponseEntity<UtilisateurDao>(user, HttpStatus.BAD_REQUEST);
		} else {
			// Mise en place du token pour l'user:
			Long tokenLong = new Random().nextLong();
			String token = tokenLong.toString();
			request.getSession().setAttribute(Constants.TOKEN, token);
			user.setToken(token);
			logger.info("Login: [User id: " + user.getIdUser() + "; Token" + user.getToken() + "]");
			return new ResponseEntity<UtilisateurDao>(user, HttpStatus.OK);
		}
	}

	@ResponseBody
	@RequestMapping(value = "mergeAccount", method = { RequestMethod.POST }, consumes = "application/json")
	public ResponseEntity<JsonFLux> mergeAccount(@RequestBody UtilisateurDao utilisateurDao) {
		JsonFLux fluxRet = utilisateurSrv.mergeAccount(utilisateurDao);
		return new ResponseEntity<JsonFLux>(fluxRet, HttpStatus.OK);
	}
}