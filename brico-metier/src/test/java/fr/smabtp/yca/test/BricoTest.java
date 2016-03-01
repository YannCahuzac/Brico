package fr.smabtp.yca.test;

import java.util.Iterator;
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
import fr.yca.brico.bean.Utilisateur;
import fr.yca.brico.utils.Constants;
import fr.yca.brico.utils.Outils;

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
		System.setProperty("AS_DERBY_INSTALL", "C:\\glassfish3\\javadb");
	}

	@After
	public void end() {
		logger.info("#################### Fin Test ######################\n");
	}

	@Test
	@Ignore
	public void testRegex() {
		try {
			String mail = "_yann.cahuzac@gmail.com";
			System.out.println(Outils.checkMail(mail));
			String num = "0123";
			System.out.println(Outils.checkNum(num));
		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Test
	@Ignore
	public void test() {
		try {
			String mail = "d@d";

			Long countMail = em.createQuery(Constants.countUserMail, Long.class).setParameter("mail", mail).getSingleResult();
			System.out.println(countMail);

			int countMail2 = em.createQuery(Constants.countUserMail, Long.class).setParameter("mail", mail).getFirstResult();
			System.out.println(countMail2);

		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Test
	@Ignore
	public void testJoin() {
		try {
			String joinReq = "SELECT c, u FROM Post c, Utilisateur u WHERE c.idUserCreation = u.idUser AND c.idPostRef = 0 ORDER BY c.dateCreation DESC";
			List<Object> postList = em.createQuery(joinReq, Object.class).setMaxResults(Constants.MAX_POST_RESULT).getResultList();

			if (postList != null && postList.size() > 0) {
				Iterator<Object> itPost = postList.iterator();
				while (itPost.hasNext()) {
					Object[] o = (Object[]) itPost.next();
					if (o[0] instanceof Post) {
						Post post = (Post) o[0];
						System.out.println(post);
					}
					if (o[1] instanceof Utilisateur) {
						Utilisateur user = (Utilisateur) o[1];
						System.out.println(user);
					}
				}
			}
		} catch (Exception e) {
			logger.error(e);
		}
	}
}