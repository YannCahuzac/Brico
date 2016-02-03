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

import fr.yca.brico.services.ThemeSrv;
import fr.yca.brico.utils.JsonFLux;

//Permet de ne pas avoir l'erreur 406 sur format manquant = application/json: 
@EnableWebMvc
@Controller("themeCtrl")
public class ThemeCtrl {

	final static Logger logger = Logger.getLogger(ThemeCtrl.class.getName());

	@Autowired
	ThemeSrv themeSrv;

	/**
	 * Return tous les thèmes de l'application.
	 */
	@ResponseBody
	@RequestMapping(value = "getThemes", method = RequestMethod.GET)
	public ResponseEntity<List<JsonFLux>> getThemes(HttpServletRequest request) {
		List<JsonFLux> themes = themeSrv.getThemes();
		return new ResponseEntity<List<JsonFLux>>(themes, HttpStatus.OK);
	}

	/**
	 * Return le lib du theme Id en entrée.
	 */
	@ResponseBody
	@RequestMapping(value = "getThemeById/{themeId}", method = RequestMethod.GET)
	public ResponseEntity<JsonFLux> getThemeById(HttpServletRequest request, @PathVariable("themeId") int themeId) {
		JsonFLux theme = themeSrv.getThemeById(themeId);
		return new ResponseEntity<JsonFLux>(theme, HttpStatus.OK);
	}
}