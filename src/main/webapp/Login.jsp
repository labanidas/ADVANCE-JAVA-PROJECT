<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="java.sql.*" %>
    <%@ include file="connection.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
</head>
<body>
<form action="Login.jsp" method="post"><br>
User ID : <input type="text" name="user_id"><br>
Password : <input type="password" name="password"><br>
<input type="submit">
</form>
<%
if (request.getParameter("user_id") != null) {
    String user_id = request.getParameter("user_id");
    String password = request.getParameter("password");
    
    try {
        PreparedStatement pstmt = con.prepareStatement("Select uname from users where user_id=? and password=?");
        pstmt.setString(1, user_id);
        pstmt.setString(2, password);
        ResultSet rs = pstmt.executeQuery();
        //System.out.println(rs.getString(1));
        if(rs.next()){
        	RequestDispatcher rd=request.getRequestDispatcher("Product.jsp");
        	rd.forward(request,response);
			//out.println("Welcome "+rs.getString(1));
		}else{
			out.println("Incvalid credentials");
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