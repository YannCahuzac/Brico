package fr.yca.brico.bean;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Si le default schema n'est pas défini dans le persistence, le rajouter dans
 * entity et table ci-dessous.
 */
@Entity(name = "SMABTP_HISTOPPE")
@Table(name = "SMABTP_HISTOPPE")
public class Histo implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pk;

	@Column(name = "NOMUP")
	private String nomUp;

	@Column(name = "PRENOMUP")
	private String prenomUp;

	@Column(name = "CL_DATE_HISTO")
	private Timestamp clDateHisto;

	public Histo() {
		super();
	}

	public Histo(String nomUp, String prenomUp) {
		super();
		this.nomUp = nomUp;
		this.prenomUp = prenomUp;
	}

	public Histo(String nomUp, String prenomUp, Timestamp clDateHisto) {
		super();
		this.nomUp = nomUp;
		this.prenomUp = prenomUp;
		this.clDateHisto = clDateHisto;
	}

	public Integer getPk() {
		return pk;
	}

	public void setPk(Integer pk) {
		this.pk = pk;
	}

	public String getNomUp() {
		return nomUp;
	}

	public void setNomUp(String nomUp) {
		this.nomUp = nomUp;
	}

	public String getPrenomUp() {
		return prenomUp;
	}

	public void setPrenomUp(String prenomUp) {
		this.prenomUp = prenomUp;
	}

	public Timestamp getClDateHisto() {
		return clDateHisto;
	}

	public void setClDateHisto(Timestamp clDateHisto) {
		this.clDateHisto = clDateHisto;
	}

	@Override
	public String toString() {
		return "\n\nPk: " + getPk() + "\nNomUp: " + getNomUp() + "\nPrenomUp: "
				+ getPrenomUp() + "\nClDateHisto: " + getClDateHisto() + "\n";
	}

}