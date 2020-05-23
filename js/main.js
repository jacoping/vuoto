/*
 ****** MARKDOWN-IT CONFIGURATOIN ******
 */

var md = window.markdownit()
  .use(window.markdownitMark)
  .use(window.markdownitIns)
  .use(window.markdownitContainer, 'box', {

    validate: function(params) {
      return params.trim().match(/^box$/);
      return true;
    },

    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^box$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="box">';

      } else {
        // closing tag
        return '</div>\n';
      }
    }
  })
  .use(window.markdownitContainer, 'big', {

    validate: function(params) {
      return params.trim().match(/^big$/);
      return true;
    },

    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^big$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="big">';

      } else {
        // closing tag
        return '</div>\n';
      }
    }
  })





/*
 ****** FUNCTIONS ******
 */

var popola = function(chapters) {

  chapters.forEach(function(el) {

    console.log("--- popola " + el.filename + " ---");
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function() {

      // creates DOM element in the right position
      let div = document.createElement('div');
      div.classList.add("chapter");
      document.querySelector("#content").appendChild(div);

      // returns function with closure on DOM element
      return function() {
        if (this.readyState == 4 && this.status == 200) {
          var html = md.render(this.responseText);
          div.innerHTML = html;
        }
      }
    }());

    oReq.open("GET", "/chapters/" + el.slug + ".md");
    oReq.send();

  })

}




/*
 ****** LOAD CHAPTERS AND STARTUP ******
 */


var chaptersReq = new XMLHttpRequest();
chaptersReq.addEventListener("load", function() {
  if (this.readyState == 4 && this.status == 200) {
    popola(JSON.parse(this.responseText));
  }
});
chaptersReq.open("GET", "/chapters/chapters.json");
chaptersReq.send();
