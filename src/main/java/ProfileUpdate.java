import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

@WebServlet("/ProfileUpdate")
public class ProfileUpdate extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String userId = request.getParameter("user_id");
        System.out.println("user id (profile update) : " + userId);

        if (userId == null || userId.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(new JSONObject().put("status", "error").put("message", "User not authenticated").toString());
            return;
        }

        String query = """
            SELECT u.UNAME, u.ADDRESS, u.CITY, u.COUNTRY, u.PINCODE, u.MOBILE_NO, u.EMAIL
            FROM users u
            WHERE u.USER_ID = ?
        """;

        try (Connection con = dbconnection.getConnection();
             PreparedStatement pstmt = con.prepareStatement(query)) {

            pstmt.setString(1, userId);
            ResultSet rs = pstmt.executeQuery();

            JSONObject user = new JSONObject();
            if (rs.next()) {
                user.put("uname", rs.getString("UNAME"));
                user.put("address", rs.getString("ADDRESS"));
                user.put("city", rs.getString("CITY"));
                user.put("country", rs.getString("COUNTRY"));
                user.put("pincode", rs.getString("PINCODE"));
                user.put("mobile_no", rs.getString("MOBILE_NO"));
                user.put("email", rs.getString("EMAIL"));
            }

            response.getWriter().write(user.toString());

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(new JSONObject().put("status", "error").put("message", e.getMessage()).toString());
        }
    }
}
