package fr.yca.brico.services;

import org.springframework.security.core.userdetails.UserDetails;

import fr.yca.brico.bean.TableU;
import fr.yca.brico.em.PU;

public class Utilisateur {

	public UserDetails getUserRole(String username) {
		return PU.getInstance().em.createQuery("select t from TABLEU t where t.TuLib = :username", TableU.class).setParameter("username", username).getSingleResult();
	}
}