import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Base64;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/PaymentHandler")
public class PaymentHandler extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public PaymentHandler() {
        super();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }


        String productId = request.getParameter("product_id"); // Get the product_id parameter from React

        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            conn = dbconnection.getConnection();

            if (conn == null) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Database connection failed.");
                return;
            }

            // Fetch all attributes of the product from the database
            String query = "SELECT * FROM product WHERE product_id = ?";
            ps = conn.prepareStatement(query);
            ps.setString(1, productId);
            rs = ps.executeQuery();

            if (rs.next()) {
                // Integrate with Razorpay API for payment creation
                String apiUrl = "https://api.razorpay.com/v1/orders";
                String apiKey = "rzp_test_hvkuFk2j7mbLvi"; 
                String apiSecret = "jwrY3vYBxPaMC1nWLp7jVu8R"; 

                // Basic Auth Header
                String auth = apiKey + ":" + apiSecret;
                String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
                String authHeader = "Basic " + encodedAuth;

                // Create URL connection
                URL url = new URL(apiUrl);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setDoOutput(true);
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setRequestProperty("Authorization", authHeader);

                // JSON Body for Razorpay Order
                int priceInPaisa = rs.getInt("price") * 100; 
                String jsonBody = "{"
                        + "\"amount\": " + priceInPaisa + ","
                        + "\"currency\": \"INR\","
                        + "\"receipt\": \"receipt#" + productId + "\""
                        + "}";

                // Write JSON body to the output stream
                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(jsonBody.getBytes());
                outputStream.flush();
                outputStream.close();

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder res = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        res.append(line);
                    }
                    reader.close();
                    
                    
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.getWriter().write(res.toString());
                } else {
                    response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to create Razorpay order.");
                }

                connection.disconnect();
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Product not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
        } finally {
            try {
                if (rs != null) rs.close();
                if (ps != null) ps.close();
                if (conn != null) conn.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}