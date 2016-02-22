package fr.yca.brico.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import fr.yca.brico.dao.PostDao;

public class Outils {

	public static String formateDate(Date d, String format) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(d);
	}

	public static Boolean isValidPostDao(PostDao postDao) {
		Boolean ret = Boolean.TRUE;
		if (postDao == null || (postDao != null && !(isFull(postDao.getIdUserCreation()) && isFull(postDao.getThemeId()) && isFull(postDao.getTitle()) && isFull(postDao.getPost())))) {
			ret = Boolean.FALSE;
		}
		return ret;
	}

	public static boolean isFull(String s) {
		return (s != null && !s.equals(""));
	}

	public static boolean isFull(Integer i) {
		return (i != null);
	}

}