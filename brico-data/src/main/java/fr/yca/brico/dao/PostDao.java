package fr.yca.brico.dao;

import java.sql.Timestamp;

import fr.yca.brico.bean.Post;
import fr.yca.brico.bean.Utilisateur;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.Outils;
import fr.yca.brico.utils.TypeRecherche;

public class PostDao {

	private Integer idPost;
	private Timestamp dateCreation;
	private Integer idUserCreation;
	private Integer idPostRef;
	private Integer themeId;
	private String title = "";
	private String post = "";
	private Integer typePost;
	private Integer nbVotes;
	private Integer note;
	private Integer postValidate;

	// Utilis�s pour l'IHM:
	private Integer noteUser = 0;
	private boolean overStar = false;
	private boolean alreadyVoted = false;
	private Integer noteUserOver = 0;
	private String dateCreaS;
	private String libcss1;
	private UtilisateurDao userDao;

	private String tokenUser;

	public PostDao() {
		super();
	}

	public PostDao(Post post, Utilisateur user, TypeRecherche typeRecherche) {
		if (post != null) {
			setIdPost(post.getIdPost());
			setDateCreation(post.getDateCreation());
			setIdUserCreation(post.getIdUserCreation());
			setIdPostRef(post.getIdPostRef());
			setThemeId(post.getThemeId());
			setTitle(post.getTitle());
			if (typeRecherche.equals(TypeRecherche.FIND_POSTS_BY_ID_POST)) {
				// On ne le fait que dans ce cas car sinon �a va saturer la m�moire utilisateur c�t� client:
				setPost(post.getPost());
			}
			setTypePost(post.getTypePost());
			setNbVotes(post.getNbVotes());
			setNote(post.getNote());
			setPostValidate(post.getPostValidate());
			setUserDao(new UtilisateurDao(user));
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
		if (this.themeId != null) {
			switch (this.themeId) {
			case 1:
				setLibcss1(Constants.libCssTheme1);
				break;
			case 2:
				setLibcss1(Constants.libCssTheme2);
				break;
			case 3:
				setLibcss1(Constants.libCssTheme3);
				break;
			case 4:
				setLibcss1(Constants.libCssTheme4);
				break;
			case 5:
				setLibcss1(Constants.libCssTheme5);
				break;
			default:
				setLibcss1(Constants.libCssThemeDefault);
				break;
			}
		}
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
		if (note != null) {
			this.note = note;
		} else {
			this.note = new Integer(0);
		}
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

	public String getLibcss1() {
		return libcss1;
	}

	public void setLibcss1(String libcss1) {
		this.libcss1 = libcss1;
	}

	public Integer getNoteUser() {
		return noteUser;
	}

	public void setNoteUser(Integer noteUser) {
		this.noteUser = noteUser;
	}

	public boolean isOverStar() {
		return overStar;
	}

	public void setOverStar(boolean overStar) {
		this.overStar = overStar;
	}

	public Integer getNoteUserOver() {
		return noteUserOver;
	}

	public void setNoteUserOver(Integer noteUserOver) {
		this.noteUserOver = noteUserOver;
	}

	public String getTokenUser() {
		return tokenUser;
	}

	public void setTokenUser(String tokenUser) {
		this.tokenUser = tokenUser;
	}

	public Integer getTypePost() {
		return typePost;
	}

	public void setTypePost(Integer typePost) {
		this.typePost = typePost;
	}

	public UtilisateurDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UtilisateurDao userDao) {
		this.userDao = userDao;
	}

	public boolean isAlreadyVoted() {
		return alreadyVoted;
	}

	public void setAlreadyVoted(boolean alreadyVoted) {
		this.alreadyVoted = alreadyVoted;
	}

}