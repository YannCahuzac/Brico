package fr.yca.brico.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

//Permet de ne pas avoir l'erreur 406 sur format manquant = application/json: 
@EnableWebMvc
@Controller("bricoCtrl")
public class BricoCtrl {

	/**
	 * Accès Interdit
	 */
	@RequestMapping(value = "403", method = RequestMethod.GET)
	public ModelAndView accessDenied(HttpServletRequest request) {

		// TODO VOir pour retourner la page d'accueil
		ModelAndView mav = new ModelAndView();
		mav.setViewName("403");
		mav.addObject("message", "Vous n'avez pas accès à cette page.");
		return mav;
	}
}