package fr.yca.brico.bean;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import fr.yca.brico.dao.UtilisateurDao;
import fr.yca.brico.utils.Constants;

/**
 * @Entity est le nom que va utiliser notre em pour que ce soit cette classe qu'il transactionne. Si default schema n'est pas défini dans le persistence, le rajouter dans @table ci-dessous.
 */
@Entity(name = "Utilisateur")
@Table(name = "KV01.UTILISATEUR")
@NamedQueries({ @NamedQuery(name = "findByLib", query = "SELECT t FROM Utilisateur t WHERE t.pseudo = :username") })
public class Utilisateur implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDUSER")
	private Integer idUser;

	@Column(name = "DATE_CREATION")
	private Timestamp dateCreation;

	@Column(name = "PSEUDO")
	private String pseudo;

	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "TEL")
	private String tel;

	@Column(name = "MAIL")
	private String mail;

	@Column(name = "VILLE")
	private String ville;

	@Column(name = "CP")
	private String cp;

	@Column(name = "RUE")
	private String rue;

	@Column(name = "NB_VOTES")
	private Integer nbVotes;

	@Column(name = "NOTE")
	private Integer note;

	@Column(name = "ROLE")
	private Integer role;

	public Utilisateur() {
		super();
	}

	public Utilisateur(UtilisateurDao userDao, boolean init) {
		if (userDao != null) {

			if (userDao.getPseudo() != null) {
				setPseudo(userDao.getPseudo().trim());
			}
			if (userDao.getPassword() != null) {
				setPassword(userDao.getPassword().trim());
			}
			if (userDao.getTel() != null) {
				setTel(userDao.getTel().trim());
			}
			if (userDao.getMail() != null) {
				setMail(userDao.getMail().trim());
			}
			if (userDao.getVille() != null) {
				setVille(userDao.getVille().trim());
			}
			if (userDao.getCp() != null) {
				setCp(userDao.getCp().trim());
			}
			if (userDao.getRue() != null) {
				setRue(userDao.getRue().trim());
			}

			if (init) {
				setIdUser(null);
				setDateCreation(new Timestamp(Constants.TODAY.getTime()));
				setNbVotes(0);
				setNote(0);
				setRole(0);
			} else {
				setIdUser(userDao.getIdUser());
				setDateCreation(userDao.getDateCreation());
				setNbVotes(userDao.getNbVotes());
				setNote(userDao.getNote());
				setRole(userDao.getRole());
			}
		}
	}

	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

	public Timestamp getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Timestamp dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getCp() {
		return cp;
	}

	public void setCp(String cp) {
		this.cp = cp;
	}

	public String getRue() {
		return rue;
	}

	public void setRue(String rue) {
		this.rue = rue;
	}

	public Integer getNbVotes() {
		return nbVotes;
	}

	public void setNbVotes(Integer nbVotes) {
		this.nbVotes = nbVotes;
	}

	public Integer getNote() {
		return note;
	}

	public void setNote(Integer note) {
		this.note = note;
	}

	public String getPseudo() {
		return pseudo;
	}

	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	/************************** SPRING SECURITY **************************/

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
		ret.add(new Coll(getRole()));
		return ret;
	}

	@Override
	public String getUsername() {
		return getPseudo();
	}

	@Override
	public String getPassword() {
		return password;
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
		return "\nUser login: " + getUsername() + "\nPassword: " + getPassword() + "\nRoles: " + rolesToString;
	}
}