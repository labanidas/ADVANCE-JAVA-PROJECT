import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public LoginServlet() {
        super();
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Setting up CORS headers for frontend integration
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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
            String userId = jsonData.optString("userId", null);
            String password = jsonData.optString("password", null);

            // Validate required fields
            if (userId == null || password == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write(new JSONObject().put("status", "error").put("message", "Missing required fields").toString());
                return;
            }

            // Database connection and insertion logic
            try (Connection con = dbconnection.getConnection();
            		PreparedStatement pstmt = con.prepareStatement("Select uname from users where user_id=? and password=?")) {

                // Setting query parameters
                pstmt.setString(1, userId);
                pstmt.setString(2, password);

                ResultSet rs = pstmt.executeQuery();

                // Sending response based on query execution result
                JSONObject jsonResponse = new JSONObject();
                if (rs.next()) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    jsonResponse.put("status", "success").put("message", "Login successful!");
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
//import java.io.*;
//import java.sql.*;
//
//import javax.servlet.RequestDispatcher;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * Servlet implementation class LoginServlet
// */
//@WebServlet("/LoginServlet")
//public class LoginServlet extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//       
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
//    public LoginServlet() {
//        super();
//        // TODO Auto-generated constructor stub
//    }
//
//	/**
//	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.setContentType("application/json");
//        response.getWriter().write("{\"message\": \"Hello from LoginServlet!\"}");
//		if (request.getParameter("user_id") != null) {
//		    String user_id = request.getParameter("user_id");
//		    String password = request.getParameter("password");
//		    Connection con=dbconnection.getConnection();
//		    PrintWriter out=response.getWriter();
//		    
//		    try {
//		        PreparedStatement pstmt = con.prepareStatement("Select uname from users where user_id=? and password=?");
//		        pstmt.setString(1, user_id);
//		        pstmt.setString(2, password);
//		        ResultSet rs = pstmt.executeQuery();
//		        //System.out.println(rs.getString(1));
//		        if(rs.next()){
//		        	RequestDispatcher rd=request.getRequestDispatcher("Product.jsp");
//		        	rd.forward(request,response);
//					//out.println("Welcome "+rs.getString(1));
//				}else{
//					out.println("Incvalid credentials");
//				}
//		    } catch (SQLException e) {
//		        out.println("<p>Error: " + e.getMessage() + "</p>");
//		        e.printStackTrace();
//		    } finally {
//		        if (con != null) {
//		            try {
//		                con.close();
//		            } catch (SQLException e) {
//		                e.printStackTrace();
//		            }
//		        }
//		    }
//		}
//	}
//
//}
