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
try
{
	Class.forName("oracle.jdbc.OracleDriver");
	Connection con=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "c##medicine", "123");
	if(con==null)
	{
%>
Connection not created
<%
	}
	else
	{
		Statement stmt=con.createStatement();
		ResultSet rs=stmt.executeQuery("SELECT * FROM USERS");
		ResultSetMetaData rsm=rs.getMetaData();
		int col=rsm.getColumnCount();%>
		<table border="9">
		<%for(int i=1;i<=col;i++)
		{%>
		<th><%=rsm.getColumnName(i) %></th>
	<%}
		while(rs.next())
		{%>
		<tr>
		<%for(int i=1;i<=col;i++) 
		{%>
		<td><%=rs.getString(i) %></td>
		
		<%}%>
		</tr>
		<%} %>
		
</table>
<%
	
	}
}
catch(Exception e){out.println(e);}
%>
</body>
</html>