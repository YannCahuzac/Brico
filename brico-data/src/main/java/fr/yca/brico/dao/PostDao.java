package fr.yca.brico.dao;

import java.sql.Timestamp;

import fr.yca.brico.bean.Post;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.Outils;

public class PostDao {

	private Integer idPost;
	private Timestamp dateCreation;
	private Integer idUserCreation;
	private Integer idPostRef;
	private Integer themeId;
	private String title;
	private String post;
	private Integer nbVotes;
	private Integer note;
	private Integer postValidate;
	private String dateCreaS;

	public PostDao() {
		super();
	}

	public PostDao(Post post) {
		if (post != null) {
			setIdPost(post.getIdPost());
			setDateCreation(post.getDateCreation());
			setIdUserCreation(post.getIdUserCreation());
			setIdPostRef(post.getIdPostRef());
			setThemeId(post.getThemeId());
			setTitle(post.getTitle());
			setPost(post.getPost());
			setNbVotes(post.getNbVotes());
			setNote(post.getNote());
			setPostValidate(post.getPostValidate());
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

	public String getDateCreaS() {
		return dateCreaS;
	}

	public void setDateCreaS(String dateCreaS) {
		this.dateCreaS = dateCreaS;
	}

}