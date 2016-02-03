package fr.yca.brico.services;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import fr.yca.brico.bean.Commentaire;

public class CommentaireSrv {

	final static Logger logger = Logger.getLogger(CommentaireSrv.class.getName());

	@Autowired
	Commentaire commentaire;

}