package fr.yca.brico.utils;

public class Constants {

	public static final String formatDateTheme = "dd/MM/yyyy 'à' HH'h'mm";
	public static final int MAX_POST_RESULT = 100;

	// Requetes JPQL pour la recherche des posts:
	// La clause [WHERE c.idPostRef = 0] c'est pour dire qu'il s'agit d'un post parent (cad qu'il ne fait pas reference à un autre post):
	public static final String findPostsByIdTheme = "SELECT c FROM Post c WHERE c.themeId = :themeId AND c.idPostRef = 0";
	public static final String findPostsByIdUser = "SELECT c FROM Post c WHERE c.idUserCreation = :idUserCreation";
	public static final String findPostsByIdPost = "SELECT c FROM Post c WHERE c.idPostRef = :idPostRef OR c.idPost = :idPost ORDER BY c.dateCreation DESC";
	public static final String findRecentsPosts = "SELECT c FROM Post c WHERE c.idPostRef = 0 ORDER BY c.dateCreation DESC";

}