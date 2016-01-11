package fr.yca.brico.em;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.apache.log4j.Logger;

public class PU {

	final static Logger logger = Logger.getLogger(PU.class.getName());

	public EntityManagerFactory emf;
	public EntityManager em;
	private static PU INSTANCE = new PU();

	private PU() {
		super();
		emf = Persistence.createEntityManagerFactory("PU");
		em = emf.createEntityManager();
	}

	public static PU getInstance() {
		return INSTANCE;
	}
}