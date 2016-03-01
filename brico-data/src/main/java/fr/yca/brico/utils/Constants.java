package fr.yca.brico.utils;

public class Constants {

	public static final String formatDateTheme = "dd/MM/yyyy 'à' HH'h'mm";
	public static final int MAX_POST_RESULT = 100;
	public static final String SPACE = " ";
	public static final String TOKEN = "token";

	// Libellés Thèmes
	public static final String libTheme1 = "Plomberie";
	public static final String libTheme2 = "Menuiserie";
	public static final String libTheme3 = "Électricité";
	public static final String libTheme4 = "Jardinage";
	public static final String libTheme5 = "Maçonnerie";

	// Libellés CSS Thèmes
	public static final String libCssTheme1 = "fa-tint";
	public static final String libCssTheme2 = "fa-sun-o";
	public static final String libCssTheme3 = "fa-bolt";
	public static final String libCssTheme4 = "fa-leaf";
	public static final String libCssTheme5 = "fa-wrench";
	public static final String libCssThemeDefault = "fa-tag";

	// Libellés Types Posts
	public static final String libType1 = "Demande de conseils";
	public static final String libType2 = "Aide pour la réalisation de travaux";

	// Libellés CSS Types Posts
	public static final String libCssType1 = "fa-comments";
	public static final String libCssType2 = "fa-child";

	// Requetes JPQL pour la recherche des posts:
	// La clause [WHERE c.idPostRef = 0] c'est pour dire qu'il s'agit d'un post parent (cad qu'il ne fait pas reference à un autre post):
	public static final String findPostsByIdTheme = "SELECT c, u FROM Post c, Utilisateur u WHERE c.idUserCreation = u.idUser AND c.themeId = :themeId AND c.idPostRef = 0";
	public static final String findPostsByIdUser = "SELECT c, u FROM Post c, Utilisateur u WHERE c.idUserCreation = u.idUser AND c.idUserCreation = :idUserCreation";
	public static final String findPostsByIdPost = "SELECT c, u FROM Post c, Utilisateur u WHERE c.idUserCreation = u.idUser AND (c.idPostRef = :idPostRef OR c.idPost = :idPost) ORDER BY c.dateCreation DESC";
	public static final String findRecentsPosts = "SELECT c, u FROM Post c, Utilisateur u WHERE c.idUserCreation = u.idUser AND c.idPostRef = 0 ORDER BY c.dateCreation DESC";

	// Requetes JPQL pour la recherche des utilisateurs:
	public static final String countUserMail = "SELECT count(u) FROM Utilisateur u WHERE u.mail = :mail";
	public static final String countUserPseudo = "SELECT count(u) FROM Utilisateur u WHERE u.pseudo = :pseudo";

	public static final String postContribution = "[Contribution]" + SPACE;
}