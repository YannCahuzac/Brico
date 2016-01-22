package fr.yca.brico.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import fr.yca.brico.utils.JsonFLux;

public class Theme {

	private Map<Integer, JsonFLux> themesMap = null;

	public Theme() {
		super();
		themesMap = new HashMap<Integer, JsonFLux>();
		themesMap.put(1, new JsonFLux(1, "Plomberie", "fa-tint"));
		themesMap.put(2, new JsonFLux(2, "Menuiserie", "fa-sun-o"));
		themesMap.put(3, new JsonFLux(3, "Électricité", "fa-bolt"));
		themesMap.put(4, new JsonFLux(4, "Jardinage", "fa-leaf"));
		themesMap.put(5, new JsonFLux(5, "Maçonnerie", "fa-wrench"));
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