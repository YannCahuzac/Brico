package fr.yca.brico.security;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import fr.yca.brico.services.UtilisateurSrv;

public class MyUserDetailsService implements UserDetailsService {

	@Inject
	UtilisateurSrv utilisateurSrv;

	final static Logger logger = Logger.getLogger(MyUserDetailsService.class.getName());

	public UserDetails loadUserByUsername(String username) {
		return utilisateurSrv.getUserRole(username);
	}
}