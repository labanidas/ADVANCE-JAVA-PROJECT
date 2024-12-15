

import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@WebServlet("/SignupServlet")
public class SignupServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public SignupServlet() {
        super();
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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
        System.out.println("Received JSON data: " + requestData.toString());

        try {
            JSONObject jsonData = new JSONObject(requestData.toString());

            String name = jsonData.optString("name");
            String address = jsonData.optString("address");
            String pincode = jsonData.optString("pincode");
            String city = jsonData.optString("city");
            String country = jsonData.optString("country");
            String mobile_no = jsonData.optString("mobile_no");
            String email = jsonData.optString("email");
            String userId = jsonData.optString("userId");
            String password = jsonData.optString("password");
            
            if (name == null || address == null || pincode == null || city == null || country == null || mobile_no == null || email == null || userId == null || password == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write(new JSONObject().put("status", "error").put("message", "Missing required fields").toString());
                return;
            }

            try (Connection con = dbconnection.getConnection();
                 PreparedStatement pstmt = con.prepareStatement(
                         "INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                pstmt.setString(1, userId);
                pstmt.setString(2, password);
                pstmt.setString(3, name);
                pstmt.setString(4, address);
                pstmt.setString(5, pincode);
                pstmt.setString(6, city);
                pstmt.setString(7, country);
                pstmt.setString(8, mobile_no);
                pstmt.setString(9, email);

                int rowsAffected = pstmt.executeUpdate();

                JSONObject jsonResponse = new JSONObject();
                if (rowsAffected > 0) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    jsonResponse.put("status", "success").put("message", "Signup successful!");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.put("status", "error").put("message", "Signup failed!");
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


