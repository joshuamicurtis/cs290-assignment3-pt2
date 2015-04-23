function generate_table(gistDisc) {
  // get the reference for the body
  var body = document.getElementById("results");
 
  // creates a <table> element and a <tbody> element
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
 
  // creating all cells
  for (var i = 0; i < 30; i++) {
    // creates a table row
    var row = document.createElement("tr");
 
    for (var j = 0; j < 1; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode(gistDisc);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
 
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}

function getGists() {
  var req = new XMLHttpRequest();
  if(!req) {
    throw 'Unable to create HttpRequest.';
  }
  var url = 'https://api.github.com/gists/public'
  req.onreadystatechange = function() {
    if(this.readystate === 4) {
	  var gistResponse = JSON.parse(this.responseText);
	  gistDisc = gistResponse.list[0].description;
	  generate_table(gistDisc);
	}	
  };
  req.open('GET', url);
  req.send();
}

function urlStringify(obj) {
  var str = [];
  for (var prop in obj) {
    var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
	str.push(s);
  }
  return str.join('&');
}