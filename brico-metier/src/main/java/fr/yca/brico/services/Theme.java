package fr.yca.brico.services;

import java.util.ArrayList;
import java.util.List;

import fr.yca.brico.utils.JsonFLux;

public class Theme {

	/**
	 * @return la liste de tous les themes.
	 */
	public List<JsonFLux> getThemes() {
		// TODO
		List<JsonFLux> themes = new ArrayList<JsonFLux>();
		themes.add(new JsonFLux("Menuiserie", ""));
		themes.add(new JsonFLux("Plomberie", ""));
		return themes;
	}
}