package fr.yca.brico.utils;

public class Constants {

	public static final String formatDateTheme = "dd/MM/yyyy 'à' HH'h'mm";

	// Requetes JPQL pour la recherche des posts:
	// La clause where = 0 c'est pour dire qu'il s'agit d'un post parent (il ne fait pas ref à un autre post)
	public static final String findPostsByIdTheme = "select c from Post c where c.themeId = :themeId and c.idPostRef = 0";
	public static final String findPostsByIdUser = "select c from Post c where c.idUserCreation = :idUserCreation";
	public static final String findPostsByIdPost = "select c from Post c where c.idPostRef = :idPostRef or c.idPost = :idPost";

}