package fr.smabtp.yca.test;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import fr.yca.brico.bean.Post;
import fr.yca.brico.utils.Constants;

public class BricoTest {

	final static Logger logger = Logger.getLogger(BricoTest.class.getName());

	private static EntityManagerFactory emf;
	private static EntityManager em;

	static {
		emf = Persistence.createEntityManagerFactory("PU");
		em = emf.createEntityManager();
	}

	@Before
	public void initialize() {
		logger.info("#################### Debut Test ####################");
		// System.setProperty("AS_DERBY_INSTALL", "C:\\glassfish3\\javadb");
	}

	@After
	public void end() {
		logger.info("#################### Fin Test ######################\n");
	}

	@Test
	@Ignore
	public void test() {
		try {
			List<Post> l = em.createQuery(Constants.findRecentsPosts, Post.class).setMaxResults(20).getResultList();
			System.out.println(l.size());
		} catch (Exception e) {
			logger.error(e);
		}
	}
}