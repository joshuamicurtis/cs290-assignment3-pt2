window.onload = function() {
  n = 0
  while (localStorage.key(n)) {
    var favURL = localStorage.key(n)
	var favDisc = localStorage.getItem(localStorage.key(n))
	
	var favorites = document.getElementById("favorites");
	var unfavorite = document.createElement("button");
	var dlf = document.createElement("dl");
	var dtf = document.createElement("dt");
    var a = document.createElement('a');
	
	a.setAttribute('href', localStorage.key(n));
	a.appendChild(document.createTextNode(favURL));
    dtf.innerText = favDisc;
	unfavorite.innerHTML = "-";
	
	dlf.appendChild(dtf);
    dlf.appendChild(a);
	dlf.appendChild(unfavorite);
    favorites.appendChild(dlf);
	unfavorite.onclick = function() {
	  localStorage.removeItem(favURL);
	  generate_list(favDisc, favURL);
	  dlf.parentNode.removeChild(dlf);
	};
	n++;
  }
}

function generate_list(gistDisc, gistURL) {
  // get the reference for the body
  var results = document.getElementById("results");
 
  // creates a <table> element and a <tbody> element
  var dl = document.createElement("dl");
  var dt = document.createElement("dt");
  var dd = document.createElement("dd");
  var a = document.createElement('a');
  a.setAttribute('href', gistURL);
  dt.innerText = gistDisc;
  a.appendChild(document.createTextNode(gistURL));
  dl.appendChild(dt);
  dl.appendChild(a);
  results.appendChild(dl);
  
  var fbutton = document.createElement("button");
  fbutton.innerHTML = "+";
  dl.appendChild(fbutton);
  
  fbutton.onclick = function (){
	var unfavorite = document.createElement("button");
	var favorites = document.getElementById("favorites");
	var dlf = document.createElement("dl");
    dlf.appendChild(dt);
    dlf.appendChild(a);
    favorites.appendChild(dlf);
	unfavorite.innerHTML = "-";
    dlf.appendChild(unfavorite);
	localStorage.setItem(gistURL, gistDisc );
	fbutton.parentNode.removeChild(fbutton);
	unfavorite.onclick = function() {
	  localStorage.removeItem(gistURL);
	  generate_list(gistDisc, gistURL, gistID);
	  dlf.parentNode.removeChild(dlf);
	};
	  
  };
}



var gistResponse = [];
function getGists() {
  var req = new XMLHttpRequest();
  if(!req) {
    throw 'Unable to create HttpRequest.';
  }
  
  var url = 'https://api.github.com/gists/public'
  var pageNum = document.getElementById("numerical_input").value;
    if (pageNum > 0) {
    url += '?page=';
    url += pageNum;
    }
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      console.log("if test inside getGists");
	  gistResponse = JSON.parse(this.responseText);
	  
	  var i;
	  for (i = 0; i < 30; i++) {
	    gistDisc = gistResponse[i].description;
		gistURL = gistResponse[i].url;
		gistID = gistResponse[i].id;
		
		var j;
        var favCheck = false;		
		for (j = 0; j < localStorage.length; j++) {
			console.log(localStorage.key(j));
		  if (gistURL === localStorage.key(j)) {
			  favCheck = true;
			  break;
		  }	  
		}
        if (favCheck === false)
          generate_list(gistDisc, gistURL);		
      }
	  
	  console.log(pageNum);
	  console.log(url);
	  console.log(i);
	  
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