package fr.yca.brico.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

import fr.yca.brico.dao.PostDao;

public class Outils {

	public static String formateDate(Date d, String format) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(d);
	}

	public static Boolean isValidPostDao(PostDao postDao) {
		Boolean ret = Boolean.TRUE;
		if (postDao == null || (postDao != null && !(isFull(postDao.getIdUserCreation()) && isFull(postDao.getThemeId()) && isFull(postDao.getTitle(), 100) && isFull(postDao.getPost(), 500)))) {
			ret = Boolean.FALSE;
		}
		return ret;
	}

	public static boolean isFull(String s, int size) {
		return (s != null && !s.equals("") && s.length() < (size + 1));
	}

	public static boolean isFull(Integer i) {
		return (i != null);
	}

	public static Boolean checkMail(String mail) {
		if (mail != null) {
			Pattern patternMail = Pattern.compile("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
			return patternMail.matcher(mail).matches();
		} else {
			return Boolean.FALSE;
		}
	}

	public static Boolean checkNum(String num) {
		if (num != null) {
			Pattern patternMail = Pattern.compile("^[1-9]+[0-9]*$");
			return patternMail.matcher(num).matches();
		} else {
			return Boolean.FALSE;
		}
	}
}