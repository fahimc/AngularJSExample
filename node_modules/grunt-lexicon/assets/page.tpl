<!doctype html>
<html>
<head>
	<title><%= title %></title>
	<link rel='stylesheet' type='text/css' href='<%= cssFile %>' />
	<style type='text/css'>
	.hidden {
		display: none;
	}
	</style>
</head>
<body>
	<div class='container'>
		<%= content %>
	</div>
	<script type='text/javascript' src='<%= jsFile %>'></script>
</body>
</html>
