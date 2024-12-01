import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class dbconnection {
	private static final String DRIVERNAME = "oracle.jdbc.driver.OracleDriver";
	private static final String URL = "jdbc:oracle:thin:@localhost:1521:XE";
	private static final String PASSWORD ="123";
	private static final String USERNAME ="C##medicine";
	public static Connection getConnection() {
		Connection con = null;
		try {
			Class.forName(DRIVERNAME);
			
			con = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			System.out.println("connection establisted" );
		} catch (ClassNotFoundException ex) {

			System.out.println("connection not establisted" );
			ex.printStackTrace();
		} catch (SQLException e) {
			System.out.println("connection not establisted1111" );
			e.printStackTrace();
		} catch (Exception e1) {
			System.out.println("connection not establisted2222" );
			e1.printStackTrace();
		}
		return con;
	}

}
