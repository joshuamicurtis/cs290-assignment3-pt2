function generate_list(gistDisc, gistURL, gistID) {
  // get the reference for the body
  var results = document.getElementById("results");
 
  // creates a <table> element and a <tbody> element
  var dl = document.createElement("dl");
  var dt = document.createElement("dt");
  var dd = document.createElement("dd");
  dt.innerText = gistDisc;
  dd.innerText = gistURL;
  dl.appendChild(dt);
  dl.appendChild(dd);
  results.appendChild(dl);
  
  var fbutton = document.createElement("button");
  fbutton.innerHTML = "+";
  results.appendChild(fbutton);
  fbutton.onclick = function(){
	
	var toBeFavoredGist = findById(gistId);
	//here you add the gist to your favorite list in the localStorage and remove it 
	//from the gist list and add it to favorite list
  }
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
	  
	  var limit = 30 * pageNum
	  var i;
	  for (i = 0; i < limit; i++) {
	    gistDisc = gistResponse[i].description;
		gistURL = gistResponse[i].url;
		gistID = gistResponse[i].id;
	    generate_list(gistDisc, gistURL, gistID);
      }
	  
	  console.log(pageNum);
	  console.log(url);
	  console.log(i);
	  console.log(limit);
	  
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