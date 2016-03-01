package fr.yca.brico.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.JsonFLux;

public class TypeSrv {

	final static Logger logger = Logger.getLogger(TypeSrv.class.getName());

	private Map<Integer, JsonFLux> typesMap = null;

	public TypeSrv() {
		super();
		typesMap = new HashMap<Integer, JsonFLux>();
		typesMap.put(0, new JsonFLux(0, Constants.libType1, Constants.libCssType1));
		typesMap.put(1, new JsonFLux(1, Constants.libType2, Constants.libCssType2));
	}

	/**
	 * @return la liste de tous les types de posts:
	 */
	public List<JsonFLux> getTypes() {
		List<JsonFLux> ret = null;
		if (typesMap != null) {
			ret = new ArrayList<JsonFLux>();
			for (Map.Entry<Integer, JsonFLux> entry : typesMap.entrySet()) {
				ret.add(typesMap.get(entry.getKey()));
			}
		}
		return ret;
	}
}