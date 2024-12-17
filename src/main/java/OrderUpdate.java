// OrderUpdate.java: Servlet to handle updating the 'orders' table.

import java.io.IOException;
import java.sql.Timestamp;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



@WebServlet("/OrderUpdate")
public class OrderUpdate extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");

        String userId = request.getParameter("user_id");
        String productId = request.getParameter("product_id");
        String paymentMode = request.getParameter("payment_mode");
        String paymentStatus = request.getParameter("payment_status");
        int qty = Integer.parseInt(request.getParameter("qty"));
        int totalPrice = Integer.parseInt(request.getParameter("total_price"));

        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            conn = dbconnection.getConnection();
            if (conn == null) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Database connection failed.");
                return;
            }

            String productQuery = "SELECT del_duration FROM product WHERE product_id = ?";
            ps = conn.prepareStatement(productQuery);
            ps.setString(1, productId);
            rs = ps.executeQuery();

            int delDuration = 0;
            if (rs.next()) {
                delDuration = rs.getInt("del_duration");
            }
            rs.close();
            ps.close();

            LocalDateTime orderDate = LocalDateTime.now();
            LocalDateTime deliveryDate = orderDate.plus(delDuration, ChronoUnit.DAYS);

            String insertQuery = "INSERT INTO orders (user_id, product_id, qty, total_price, payment_mode, payment_status, order_date, del_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            ps = conn.prepareStatement(insertQuery);
            ps.setString(1, userId);
            ps.setString(2, productId);
            ps.setInt(3, qty);
            ps.setInt(4, totalPrice);
            ps.setString(5, paymentMode);
            ps.setString(6, paymentStatus);
            ps.setTimestamp(7, Timestamp.valueOf(orderDate));
            ps.setTimestamp(8, Timestamp.valueOf(deliveryDate));

            int result = ps.executeUpdate();
            if (result > 0) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"status\": \"success\", \"message\": \"Order updated successfully!\"}");
            } else {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to update order.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (ps != null) ps.close();
                if (conn != null) conn.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }

}
