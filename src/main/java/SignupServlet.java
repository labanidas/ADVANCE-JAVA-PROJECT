

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
        // Setting up CORS headers for frontend integration
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // If the request method is OPTIONS, return immediately
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Reading and parsing JSON data from the request body
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

            // Extracting fields from JSON
            String name = jsonData.optString("name", null);
            String address = jsonData.optString("address", null);
            String pincode = jsonData.optString("pincode", null);
            String city = jsonData.optString("city", null);
            String country = jsonData.optString("country", null);
            String mobile_no = jsonData.optString("mobile_no", null);
            String email = jsonData.optString("email", null);
            String userId = jsonData.optString("userId", null);
            String password = jsonData.optString("password", null);

            // Validate required fields
            if (name == null || address == null || pincode == null || city == null || country == null || mobile_no == null || email == null || userId == null || password == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write(new JSONObject().put("status", "error").put("message", "Missing required fields").toString());
                return;
            }

            // Database connection and insertion logic
            try (Connection con = dbconnection.getConnection();
                 PreparedStatement pstmt = con.prepareStatement(
                         "INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                // Setting query parameters
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

                // Sending response based on query execution result
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

//		response.setContentType("application/json");
//        response.getWriter().write("{\"message\": \"Hello from SignupServlet!\"}");
//		try {
//			Connection con = dbconnection.getConnection();
//			if (request.getParameter("uname") != null) {
//			    //Connection con = null;
//			    String uname = request.getParameter("uname");
//			    String address = request.getParameter("address");
//			    String pincode = request.getParameter("pincode");
//			    String city = request.getParameter("city");
//			    String country = request.getParameter("country");
//			    String email = request.getParameter("email");
//			    String user_id = request.getParameter("user_id");
//			    String password = request.getParameter("password");
//			    String mobile_no = request.getParameter("mobile_no");
//			    
//			    PrintWriter out=response.getWriter();
//
//			    try {
//			        PreparedStatement pstmt = con.prepareStatement("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
//			        pstmt.setString(1, user_id);
//			        pstmt.setString(2, password);
//			        pstmt.setString(3, uname);
//			        pstmt.setString(4, address);
//			        pstmt.setString(5, pincode);
//			        pstmt.setString(6, city);
//			        pstmt.setString(7, country);
//			        pstmt.setString(8, mobile_no);
//			        pstmt.setString(9, email);
//
//			        int rows = pstmt.executeUpdate();
//			        if (rows > 0) {
//			            System.out.println("<p>Sign-up successful!</p>");
//			            RequestDispatcher rd=request.getRequestDispatcher("Login.jsp");
//			        	rd.forward(request,response);
//			        } else {
//			            out.println("<p>Error in sign-up!</p>");
//			        }
//			    } catch (SQLException e) {
//			        out.println("<p>Error: " + e.getMessage() + "</p>");
//			        e.printStackTrace();
//			    } finally {
//			        if (con != null) {
//			            try {
//			                con.close();
//			            } catch (SQLException e) {
//			                e.printStackTrace();
//			            }
//			        }
//			    }
//			}
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}

//}
