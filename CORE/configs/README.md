<%= module %>
---
**Module description**
 

##### Available actions

<% if(config.options) { %>
###### Options

| Options | Default | Type | Description |
| ------ | ------ | ------ | ------ | <% if(_.isPlainObject(config.options)) { _.forEach(config.options, function(option, name) { %>
| <%- name %> |  <%- option %> | <%- typeof option %> | <% }); 
} 
%>

**Example:**

If you need to override options

**config.app.js**
```javascript
<%= example %>
```
<% } %>

##### Used common components
<% commonComponents.forEach(function(component) { %>- <%- component %>
<% }); %>

##### Module pages
<% pages.forEach(function(page) { %>- <%- page %> -
<% }); %>

##### *NOTE:* all pictures are from themes [Navy](https://gitlab.walletfactory.com/mobileapp/mwallet_v4/wikis/Core/themes/Navy)

###### Screens
<%= screens.join('\n') %>
