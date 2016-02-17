package fr.yca.brico.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Outils {

	public static String formateDate(Date d, String format) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(d);
	}
}