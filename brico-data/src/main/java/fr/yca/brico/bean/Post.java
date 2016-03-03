package fr.yca.brico.bean;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import fr.yca.brico.dao.PostDao;
import fr.yca.brico.utils.Constants;

@Entity(name = "Post")
@Table(name = "KV01.POST")
public class Post implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDPOST")
	private Integer idPost;

	@Column(name = "DATE_CREATION")
	private Timestamp dateCreation;

	@Column(name = "IDUSER_CREATION")
	private Integer idUserCreation;

	@Column(name = "IDPOST_REF")
	private Integer idPostRef;

	@Column(name = "THEME_ID")
	private Integer themeId;

	@Column(name = "TITLE")
	private String title;

	@Column(name = "POST")
	private String post;

	@Column(name = "TYPE_POST")
	private Integer typePost;

	@Column(name = "NB_VOTES")
	private Integer nbVotes;

	@Column(name = "NOTE")
	private Integer note;

	@Column(name = "POST_VALIDATE")
	private Integer postValidate;

	public Post() {
		super();
	}

	public Post(PostDao postDao, boolean init) {
		if (postDao != null) {
			// Récupérer dans le flux Json:
			setIdUserCreation(postDao.getIdUserCreation());
			setThemeId(postDao.getThemeId());
			setPost(postDao.getPost());
			setTypePost(postDao.getTypePost());
			// 0 pour dire qu'il s'agit d'un post parent ou idParent sinon:
			setIdPostRef(postDao.getIdPostRef());
			setPostValidate(postDao.getPostValidate());

			if (init) {
				if (postDao.getIdPostRef() != null && postDao.getIdPostRef() != 0) {
					// Veillez à ce que la taille du titre ne dépasse pas 80 chars pour continuer à pouvoir rajouter le champs suivant par la suite:
					setTitle(Constants.postContribution + postDao.getTitle());
				} else {
					setTitle(postDao.getTitle());
				}

				setDateCreation(new Timestamp(new Date().getTime()));
				// Init:
				setNbVotes(0);
				setNote(0);
			} else {
				setIdPost(postDao.getIdPost());
				setDateCreation(postDao.getDateCreation());
				setNbVotes(postDao.getNbVotes());
				setNote(postDao.getNote());
				setTitle(postDao.getTitle());
			}
		}
	}

	public Integer getIdPost() {
		return idPost;
	}

	public void setIdPost(Integer idPost) {
		this.idPost = idPost;
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

	public Integer getIdPostRef() {
		return idPostRef;
	}

	public void setIdPostRef(Integer idPostRef) {
		this.idPostRef = idPostRef;
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

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
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

	public Integer getPostValidate() {
		return postValidate;
	}

	public void setPostValidate(Integer postValidate) {
		this.postValidate = postValidate;
	}

	public Integer getTypePost() {
		return typePost;
	}

	public void setTypePost(Integer typePost) {
		this.typePost = typePost;
	}

}