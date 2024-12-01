<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
Connection con=null;
try
{
	Class.forName("oracle.jdbc.OracleDriver");
	con=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "C##medicine", "123");
	if(con==null)
	{
		System.out.println("not Connected");
	}
	else
	{
		System.out.println("Connected");
	}
}
catch(Exception e){out.println(e);}
%>
</body>
</html>