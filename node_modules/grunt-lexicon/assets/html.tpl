<h1><%= title %></h1>

<p><strong>Source: <%= file %></strong></p>

<p><a href="<%= indexFile %>">Back to Index</a></p>

<%
body.forEach(function(node, i) {
	var comment = node['comment'];
	var isPrivate = false;

	if (!node['function']) {
		return;
	}

	var tags = comment['tags'].reduce(function(a,c){
		if (c['tag'] === 'param') {
			a['params'].push(c);
		} else if (/return[s]?/.test(c['tag'])) {
			a['returns'].push(c);
		} else {
			a['others'].push(c);
			if ((/private/i).test(c['tag']) || c['tag'] === 'access' && (/private/i).test(c['value'])){
				isPrivate = true;
			}
		}
		return a;
	}, {params:[], returns:[], others:[]});
%>
<h3><%= node['function'] ? node['function'] : node['sig'] %><% if (isPrivate) { %> <small>Private</small><% } %></h3>
<div><%= marked.parse(comment['text']) %></div>

<% ['others', 'params', 'returns'].forEach(function(group) { %>
<% if (group === 'params') { %>
<h5>Params</h5>
<% } %>
<ul>
<% tags[group].forEach(function(tag) { %>
<li><%= tag['tag'] %> <% if (tag['type']) { %>{<em><%= tag['type'] %></em>} <% } %><% if (tag['optional']) { %>[<% } %><% if (group == 'params') { %><strong><% } %><%= tag['value'] %><% if (group == 'params') { %></strong><% } %><% if (tag['optional']) { %>]<% } %> <%= tag['description'] %></li>
<% }); %>
</ul>
<% }); %>

<a class="toggle" href="#" data-target="source-<%= i %>">Show source</a>

<div id='source-<%= i %>' data-state="close" class='hidden'>
<pre class="pre-scrollable"><%= node['source'] %></pre>
</div>
<% }); %>