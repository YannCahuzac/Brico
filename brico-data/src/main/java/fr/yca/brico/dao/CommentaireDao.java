package fr.yca.brico.dao;

import java.sql.Timestamp;

import fr.yca.brico.bean.Commentaire;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.Outils;

public class CommentaireDao {

	private Integer idComm;
	private Timestamp dateCreation;
	private Integer idUserCreation;
	private Integer idCommRef;
	private Integer themeId;
	private String title;
	private String comm;
	private Integer nbVotes;
	private Integer note;
	private Integer commValidate;
	private String dateCreaS;

	public CommentaireDao() {
		super();
	}

	public CommentaireDao(Commentaire comm) {
		if (comm != null) {
			setIdComm(comm.getIdComm());
			setDateCreation(comm.getDateCreation());
			setIdUserCreation(comm.getIdUserCreation());
			setIdCommRef(comm.getIdCommRef());
			setThemeId(comm.getThemeId());
			setTitle(comm.getTitle());
			setComm(comm.getComm());
			setNbVotes(comm.getNbVotes());
			setNote(comm.getNote());
			setCommValidate(comm.getCommValidate());
		}
	}

	public Integer getIdComm() {
		return idComm;
	}

	public void setIdComm(Integer idComm) {
		this.idComm = idComm;
	}

	public Timestamp getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Timestamp dateCreation) {
		this.dateCreation = dateCreation;
		if (this.dateCreation != null) {
			setDateCreaS(Outils.formateDate(this.dateCreation, Constants.formatDateTheme));
		}
	}

	public Integer getIdUserCreation() {
		return idUserCreation;
	}

	public void setIdUserCreation(Integer idUserCreation) {
		this.idUserCreation = idUserCreation;
	}

	public Integer getIdCommRef() {
		return idCommRef;
	}

	public void setIdCommRef(Integer idCommRef) {
		this.idCommRef = idCommRef;
	}

	public String getComm() {
		return comm;
	}

	public void setComm(String comm) {
		this.comm = comm;
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

	public Integer getCommValidate() {
		return commValidate;
	}

	public void setCommValidate(Integer commValidate) {
		this.commValidate = commValidate;
	}

	public Integer getThemeId() {
		return themeId;
	}

	public void setThemeId(Integer themeId) {
		this.themeId = themeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDateCreaS() {
		return dateCreaS;
	}

	public void setDateCreaS(String dateCreaS) {
		this.dateCreaS = dateCreaS;
	}

}