
import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public LoginServlet() {
        super();
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        StringBuilder requestData = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                requestData.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            JSONObject jsonData = new JSONObject(requestData.toString());
            String userId = jsonData.optString("userId");
            String password = jsonData.optString("password");
      

            if (userId == null || password == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write(new JSONObject().put("status", "error").put("message", "Missing required fields").toString());
                return;
            }

            try (Connection con = dbconnection.getConnection();
                 PreparedStatement pstmt = con.prepareStatement("SELECT user_id FROM users WHERE user_id = ? AND password = ?")) {
                pstmt.setString(1, userId);
                pstmt.setString(2, password);
                
                HttpSession session = request.getSession(true);
                
                
                ResultSet rs = pstmt.executeQuery();
                JSONObject jsonResponse = new JSONObject();
                if (rs.next()) {
                	userId=rs.getString(1);
                	session.setAttribute("user_id", userId);
                    response.setStatus(HttpServletResponse.SC_OK);
                    System.out.println("user id = "+userId);
                    jsonResponse.put("status", "success").put("message", "Login successful!").put("userId", userId);
                    
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.put("status", "error").put("message", "Login failed!");
                }
                response.getWriter().write(jsonResponse.toString());
            } catch (SQLException e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write(new JSONObject().put("status", "error").put("message", e.getMessage()).toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(new JSONObject().put("status", "error").put("message", "Invalid JSON format").toString());
        }
    }
}