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

import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/OrderTracker")
public class OrderTracker extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	response.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
    	response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");
        
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String userId = request.getParameter("user_id");
        System.out.println("user id (order tracker) : "+userId);

        if (userId == null || userId.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(new JSONObject().put("status", "error").put("message", "User not authenticated").toString());
            return;
        }

        String query = """
            SELECT o.ORDER_ID, o.ORDER_DATE, o.DEL_DATE, o.QTY, o.PAYMENT_MODE, o.PAYMENT_STATUS,
                   p.PNAME, p.DESCRIPTION, p.PRICE, p.IMG_URL,
                   u.UNAME, u.ADDRESS, u.CITY, u.COUNTRY, u.PINCODE, u.MOBILE_NO, u.EMAIL
            FROM orders o
            JOIN product p ON o.PRODUCT_ID = p.PRODUCT_ID
            JOIN users u ON o.USER_ID = u.USER_ID
            WHERE o.USER_ID = ?
        """;

        try (Connection con = dbconnection.getConnection();
             PreparedStatement pstmt = con.prepareStatement(query)) {

            pstmt.setString(1, userId);
            ResultSet rs = pstmt.executeQuery();

            JSONArray orders = new JSONArray();
            while (rs.next()) {
                JSONObject order = new JSONObject();
                order.put("order_id", rs.getString("ORDER_ID"));
                order.put("order_date", rs.getDate("ORDER_DATE").toString());
                order.put("delivery_date", rs.getDate("DEL_DATE").toString());
                order.put("quantity", rs.getInt("QTY"));
                order.put("payment_mode", rs.getString("PAYMENT_MODE"));
                order.put("payment_status", rs.getString("PAYMENT_STATUS"));

                JSONObject product = new JSONObject();
                product.put("product_name", rs.getString("PNAME"));
                product.put("description", rs.getString("DESCRIPTION"));
                product.put("price", rs.getDouble("PRICE"));
                product.put("image_url", rs.getString("IMG_URL"));

                JSONObject user = new JSONObject();
                user.put("name", rs.getString("UNAME"));
                user.put("address", rs.getString("ADDRESS"));
                user.put("city", rs.getString("CITY"));
                user.put("country", rs.getString("COUNTRY"));
                user.put("pincode", rs.getString("PINCODE"));
                user.put("mobile", rs.getString("MOBILE_NO"));
                user.put("email", rs.getString("EMAIL"));

                order.put("product", product);
                order.put("user", user);

                orders.put(order);
            }

            //response.getWriter().write(orders.toString());
            response.getWriter().write(new JSONObject().put("orders", orders).toString());


        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(new JSONObject().put("status", "error").put("message", e.getMessage()).toString());
        }
    }
}
