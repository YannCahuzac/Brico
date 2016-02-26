package fr.yca.brico.dao;

import java.sql.Timestamp;

import fr.yca.brico.bean.Utilisateur;

public class UtilisateurDao {

	private Integer idUser;
	private Timestamp dateCreation;
	private String pseudo;
	private String password;
	private String tel;
	private String mail;
	private String ville;
	private String cp;
	private String rue;
	private Integer nbVotes;
	private Integer note;
	private Integer role;
	private String token;

	public UtilisateurDao() {
		super();
	}

	public UtilisateurDao(Utilisateur user) {
		if (user != null) {
			setIdUser(user.getIdUser());
			setDateCreation(user.getDateCreation());
			setPseudo(user.getPseudo());
			setPassword(user.getPassword());
			setTel(user.getTel());
			setMail(user.getMail());
			setVille(user.getVille());
			setCp(user.getCp());
			setRue(user.getRue());
			setNbVotes(user.getNbVotes());
			setNote(user.getNote());
			setRole(user.getRole());
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

	public String getPassword() {
		return password;
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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}