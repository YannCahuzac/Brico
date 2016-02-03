package fr.yca.brico.bean;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "COMMENTAIRE")
@Table(name = "COMMENTAIRE")
public class Commentaire implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDCOMM")
	private Integer idComm;

	@Column(name = "DATE_CREATION")
	private Timestamp dateCreation;

	@Column(name = "IDUSER_CREATION")
	private Integer idUserCreation;

	@Column(name = "IDCOMM_REF")
	private Integer idCommRef;

	@Column(name = "COMM")
	private String comm;

	@Column(name = "NB_VOTES")
	private Integer nbVotes;

	@Column(name = "NOTE")
	private Integer note;

	@Column(name = "COMM_VALIDATE")
	private Integer commValidate;

	public Commentaire() {
		super();
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

}