package fr.yca.brico.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import fr.yca.brico.services.UtilisateurSrv;

public class UtilisateurCtrl {

	final static Logger logger = Logger.getLogger(UtilisateurCtrl.class.getName());

	@Autowired
	UtilisateurSrv utilisateurSrv;

}