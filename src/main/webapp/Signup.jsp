<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="java.sql.*" %>
    <%@ include file="connection.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Sign up</title>
</head>
<body>
<form action="Signup.jsp" method="post"><br>
Enter your name : <input type="text" name="uname"><br>
Enter your address : <input type="text" name="address"><br>
Enter your pincode : <input type="text" name="pincode"><br>
Enter your city : <input type="text" name="city"><br>
Enter your country : <input type="text" name="country"><br>
Enter your mobile no. : <input type="text" name="mobile_no"><br>
Enter your e-mail : <input type="text" name="email"><br>
User ID : <input type="text" name="user_id"><br>
Password : <input type="password" name="password"><br>
<input type="submit">
</form>

<%
if (request.getParameter("uname") != null) {
    //Connection con = null;
    String uname = request.getParameter("uname");
    String address = request.getParameter("address");
    String pincode = request.getParameter("pincode");
    String city = request.getParameter("city");
    String country = request.getParameter("country");
    String email = request.getParameter("email");
    String user_id = request.getParameter("user_id");
    String password = request.getParameter("password");
    String mobile_no = request.getParameter("mobile_no");

    try {
        //out.println("<p>Connection successful!</p>");
        String query = "INSERT INTO users (user_id, password, uname, address, pincode, city, country, mobile_no, email) "
                     + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement pstmt = con.prepareStatement(query);
        pstmt.setString(1, user_id);
        pstmt.setString(2, password);
        pstmt.setString(3, uname);
        pstmt.setString(4, address);
        pstmt.setString(5, pincode);
        pstmt.setString(6, city);
        pstmt.setString(7, country);
        pstmt.setString(8, mobile_no);
        pstmt.setString(9, email);

        int rows = pstmt.executeUpdate();
        if (rows > 0) {
            out.println("<p>Sign-up successful!</p>");
        } else {
            out.println("<p>Error in sign-up!</p>");
        }
    } catch (SQLException e) {
        out.println("<p>Error: " + e.getMessage() + "</p>");
        e.printStackTrace();
    } finally {
        if (con != null) {
            try {
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
%>
</body>
</html>
