package fr.yca.brico.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import fr.yca.brico.services.TypeSrv;
import fr.yca.brico.utils.JsonFLux;

//Permet de ne pas avoir l'erreur 406 sur format manquant = application/json: 
@EnableWebMvc
@Controller("typeCtrl")
public class TypeCtrl {

	final static Logger logger = Logger.getLogger(TypeCtrl.class.getName());

	@Autowired
	TypeSrv typeSrv;

	/**
	 * Return tous les types de posts.
	 */
	@ResponseBody
	@RequestMapping(value = "getTypes", method = RequestMethod.GET)
	public ResponseEntity<List<JsonFLux>> getTypes(HttpServletRequest request) {
		List<JsonFLux> types = typeSrv.getTypes();
		return new ResponseEntity<List<JsonFLux>>(types, HttpStatus.OK);
	}
}