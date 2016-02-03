package fr.yca.brico.em;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.apache.log4j.Logger;

public class MyPU {

	final static Logger logger = Logger.getLogger(MyPU.class.getName());

	public EntityManagerFactory emf;
	public EntityManager em;
	private static MyPU INSTANCE = new MyPU();

	private MyPU() {
		super();
		emf = Persistence.createEntityManagerFactory("PU");
		em = emf.createEntityManager();
	}

	public static MyPU getInstance() {
		return INSTANCE;
	}
}