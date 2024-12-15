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

/**
 * Servlet implementation class ProductServlet
 */

@WebServlet("/ProductServlet")
public class ProductServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        try (Connection con = dbconnection.getConnection();
             PreparedStatement pstmt = con.prepareStatement("SELECT * FROM product");
             ResultSet rs = pstmt.executeQuery()) {

            JSONArray products = new JSONArray();
            while (rs.next()) {
                JSONObject product = new JSONObject();
                product.put("id", rs.getString("PRODUCT_ID"));
                product.put("name", rs.getString("PNAME"));
                product.put("description", rs.getString("DESCRIPTION"));
                product.put("stock", rs.getInt("STOCK"));
                product.put("price", rs.getDouble("PRICE"));
                product.put("imageUrl", rs.getString("IMG_URL"));
                products.put(product);
            }

            response.getWriter().write(products.toString());

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(new JSONObject().put("status", "error").put("message", e.getMessage()).toString());
        }
    }

}