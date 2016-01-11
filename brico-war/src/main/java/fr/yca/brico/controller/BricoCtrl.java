package fr.yca.brico.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import fr.yca.brico.services.Theme;
import fr.yca.brico.utils.JsonFLux;

//Permet de ne pas avoir l'erreur 406 sur format manquant = application/json: 
@EnableWebMvc
@Controller("bricoCtrl")
public class BricoCtrl {

	@Autowired
	Theme theme;

	/**
	 * Accès Interdit
	 */
	@RequestMapping(value = "403", method = RequestMethod.GET)
	public ModelAndView accessDenied(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView();
		mav.setViewName("403");
		mav.addObject("message", "Vous n'avez pas accès à cette page.");
		return mav;
	}

	/**
	 * Return tous les thèmes de l'application.
	 */
	@ResponseBody
	@RequestMapping(value = "getThemes", method = RequestMethod.GET)
	public ResponseEntity<List<JsonFLux>> getThemes(HttpServletRequest request) {
		List<JsonFLux> themes = theme.getThemes();
		return new ResponseEntity<List<JsonFLux>>(themes, HttpStatus.OK);
	}
}