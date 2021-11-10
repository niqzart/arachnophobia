package lab3;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.HashMap;
import java.util.List;


@ApplicationScoped
public class DBKeeper {
    private EntityManagerFactory entityManagerFactory;

    @PostConstruct
    void init() {
        String username = System.getenv("DBU");
        String password = System.getenv("DBP");

        if (username == null || password == null) {
            System.out.println("DBKeeper can't be initialized: couldn't get credentials from the environment");
            return;
        }

        HashMap<String, String> config = new HashMap<>();
        config.put("javax.persistence.jdbc.user", username);
        config.put("javax.persistence.jdbc.password", password);

        try {
            entityManagerFactory = Persistence.createEntityManagerFactory("points", config);
            System.out.println("DBKeeper has been initialized (local)");
        } catch (Exception e1) {
            try {
                config.put("javax.persistence.jdbc.url", "jdbc:postgresql://pg:5432/studs");
                entityManagerFactory = Persistence.createEntityManagerFactory("points", config);
                System.out.println("DBKeeper has been initialized (helios)");
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }

    public boolean add(Point point) {
        EntityManager manager = entityManagerFactory.createEntityManager();
        EntityTransaction transaction = manager.getTransaction();
        try {
            transaction.begin();
            manager.persist(point);
            transaction.commit();
            return true;
        } catch (Exception e1) {
            try {
                transaction.rollback();
            } catch (Exception e2) {
                e2.printStackTrace();
            }
            return false;
        } finally {
            manager.close();
        }
    }

    public List<Point> findBySession(String session) {
        EntityManager manager = entityManagerFactory.createEntityManager();

        CriteriaQuery<Point> criteriaQuery = manager.getCriteriaBuilder().createQuery(Point.class);
        Root<Point> root = criteriaQuery.from(Point.class);
        CriteriaQuery<Point> all = criteriaQuery.select(root);
        TypedQuery<Point> allQuery = manager.createQuery(all);
        List<Point> result = allQuery.getResultList();
        manager.close();

        return result;
    }
}
