package fr.yca.brico.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.JsonFLux;

public class ThemeSrv {

	final static Logger logger = Logger.getLogger(ThemeSrv.class.getName());

	private Map<Integer, JsonFLux> themesMap = null;

	public ThemeSrv() {
		super();
		themesMap = new HashMap<Integer, JsonFLux>();
		themesMap.put(1, new JsonFLux(1, Constants.libTheme1, Constants.libCssTheme1));
		themesMap.put(2, new JsonFLux(2, Constants.libTheme2, Constants.libCssTheme2));
		themesMap.put(3, new JsonFLux(3, Constants.libTheme3, Constants.libCssTheme3));
		themesMap.put(4, new JsonFLux(4, Constants.libTheme4, Constants.libCssTheme4));
		themesMap.put(5, new JsonFLux(5, Constants.libTheme5, Constants.libCssTheme5));
	}

	/**
	 * @return la liste de tous les themes:
	 */
	public List<JsonFLux> getThemes() {
		List<JsonFLux> ret = null;
		if (themesMap != null) {
			ret = new ArrayList<JsonFLux>();
			for (Map.Entry<Integer, JsonFLux> entry : themesMap.entrySet()) {
				ret.add(themesMap.get(entry.getKey()));
			}
		}
		return ret;
	}

	/**
	 * @return le theme correspondant à l'Id en entrée:
	 */
	public JsonFLux getThemeById(int id) {
		JsonFLux ret = null;
		if (themesMap != null && themesMap.containsKey(id)) {
			ret = themesMap.get(id);
		}
		return ret;
	}
}