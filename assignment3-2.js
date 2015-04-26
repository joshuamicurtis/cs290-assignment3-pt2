/*global localStorage: false, window: false, document: false */
/*global XMLHttpRequest: false */

function generate_list(gistDisc, gistURL) {
  // get the reference for the body
  var results = document.getElementById("results");

  // creates a <table> element and a <tbody> element
  var dl = document.createElement("dl");
  var dt = document.createElement("dt");
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

  fbutton.onclick = function () {
    var unfavorite = document.createElement("button");
    var favorites = document.getElementById("favorites");
    var dlf = document.createElement("dl");
    dlf.appendChild(dt);
    dlf.appendChild(a);
    favorites.appendChild(dlf);
    unfavorite.innerHTML = "-";
    dlf.appendChild(unfavorite);
    localStorage.setItem(gistURL, gistDisc);
    fbutton.parentNode.removeChild(fbutton);
    unfavorite.onclick = function () {
      localStorage.removeItem(gistURL);
      generate_list(gistDisc, gistURL);
      dlf.parentNode.removeChild(dlf);
    };
  };
}

window.onload = function () {
  var n = 0,
    favURL,
    favDisc,
    favorites,
    unfavorite,
    dlf,
    dtf,
    a;
  while (localStorage.key(n)) {
    favURL = localStorage.key(n);
    favDisc = localStorage.getItem(localStorage.key(n));

    favorites = document.getElementById("favorites");
    unfavorite = document.createElement("button");
    dlf = document.createElement("dl");
    dtf = document.createElement("dt");
    a = document.createElement('a');

    a.setAttribute('href', localStorage.key(n));
    a.appendChild(document.createTextNode(favURL));
    dtf.innerText = favDisc;
    unfavorite.innerHTML = "-";

    dlf.appendChild(dtf);
    dlf.appendChild(a);
    dlf.appendChild(unfavorite);
    favorites.appendChild(dlf);
    unfavorite.onclick = function () {
      localStorage.removeItem(favURL);
      generate_list(favDisc, favURL);
      dlf.parentNode.removeChild(dlf);
    };
    n++;
  }
};

function getGists() {
  var req = new XMLHttpRequest();
  var gistResponse = [];
  if (!req) {
    throw 'Unable to create HttpRequest.';
  }

  var url = 'https://api.github.com/gists/public';
  var pageNum = document.getElementById("numerical_input").value;
  if (pageNum > 0) {
    url += '?page=';
    url += pageNum;
  }
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      gistResponse = JSON.parse(this.responseText);
      var i;
      var gistDisc;
      var gistURL;
      var j;
      var favCheck = false;
      for (i = 0; i < 30; i++) {
        gistDisc = gistResponse[i].description;
        gistURL = gistResponse[i].url;
        for (j = 0; j < localStorage.length; j++) {
          if (gistURL === localStorage.key(j)) {
            favCheck = true;
            break;
          }
        }
        if (favCheck === false) {
          generate_list(gistDisc, gistURL);
        }
      }
    }
  };
  req.open('GET', url);
  req.send();
}