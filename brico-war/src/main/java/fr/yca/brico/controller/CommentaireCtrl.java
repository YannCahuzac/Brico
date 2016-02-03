package fr.yca.brico.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import fr.yca.brico.services.CommentaireSrv;

@EnableWebMvc
@Controller("commentaireCtrl")
public class CommentaireCtrl {

	final static Logger logger = Logger.getLogger(CommentaireCtrl.class.getName());

	@Autowired
	CommentaireSrv commentaireSrv;

}