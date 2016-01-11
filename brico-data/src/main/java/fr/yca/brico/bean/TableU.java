package fr.yca.brico.bean;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Si le default schema n'est pas défini dans le persistence, le rajouter dans entity et table ci-dessous.
 */
@Entity(name = "TABLEU")
@Table(name = "TABLEU")
@NamedQueries({ @NamedQuery(name = "findByLib", query = "SELECT t FROM TABLEU t WHERE t.TuLib = :username") })
public class TableU implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "TU_LIB")
	private String TuLib;

	@Column(name = "TU_MOTDEPASSE")
	private String TuMotdepasse;

	@Column(name = "TU_NIVEAU")
	private Integer TuNiveau;

	public TableU() {
		super();
	}

	public String getTuLib() {
		return TuLib;
	}

	public void setTuLib(String tuLib) {
		TuLib = tuLib;
	}

	public String getTuMotdepasse() {
		return TuMotdepasse;
	}

	public void setTuMotdepasse(String tuMotdepasse) {
		TuMotdepasse = tuMotdepasse;
	}

	public Integer getTuNiveau() {
		return TuNiveau;
	}

	public void setTuNiveau(Integer tuNiveau) {
		TuNiveau = tuNiveau;
	}

	public class Coll implements GrantedAuthority {

		private static final long serialVersionUID = 1L;

		public String role;

		public Coll(Integer TuNiveau) {
			super();
			if (TuNiveau != null) {
				switch (TuNiveau) {
				case 0:
					this.role = "ROLE_ADMIN";
					break;
				case 1:
					this.role = "ROLE_ACTION1";
					break;
				case 2:
					this.role = "ROLE_ACTION2";
					break;
				default:
					this.role = "ROLE_USER";
					break;
				}
			} else {
				this.role = "ROLE_USER";
			}
		}

		@Override
		public String getAuthority() {
			return role;
		}

	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<Coll> ret = new ArrayList<Coll>();
		ret.add(new Coll(getTuNiveau()));
		return ret;
	}

	@Override
	public String getPassword() {
		return getTuMotdepasse();
	}

	@Override
	public String getUsername() {
		return getTuLib();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String toString() {
		String rolesToString = "";
		Collection<Coll> roles = (Collection<Coll>) getAuthorities();
		if (roles != null && roles.size() > 0) {
			for (Coll role : roles) {
				rolesToString += role.getAuthority() + "\n";
			}
		}
		return "\nUser: " + getUsername() + "\nPassword: " + getPassword() + "\nRoles: " + rolesToString;
	}
}