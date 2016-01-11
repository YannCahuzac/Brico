package fr.yca.brico.security;

import org.apache.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import fr.yca.brico.services.Utilisateur;

public class MyUserDetailsService implements UserDetailsService {

	// @Inject
	// Utilisateur utilisateur;
	Utilisateur utilisateur = new Utilisateur();

	final static Logger logger = Logger.getLogger(MyUserDetailsService.class.getName());

	public UserDetails loadUserByUsername(String username) {
		return utilisateur.getUserRole(username);
	}
}