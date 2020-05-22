/*
****** SETTINGS ******
*/

var chapters = [
  "01.chapter",
  "02.chapter",
  "03.chapter"
]


/*
****** MARKDOWN-IT CONFIGURATOIN ******
*/

var md = window.markdownit()
  .use(window.markdownitMark)
  .use(window.markdownitIns)
  .use(window.markdownitContainer, 'box', {

    validate: function(params) {
      //return params.trim().match(/^box\s+(.*)$/);
      return true;
    },

    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^box\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="inevidenza">';

      } else {
        // closing tag
        return '</div>\n';
      }
    }
  })


/*
****** FUNCTIONS ******
*/

var elabora = function() {
  let div = document.createElement('div');
  div.classList.add("container");
  document.querySelector("#content").appendChild(div);
  let elabora = function() {
    var html = md.render(this.responseText);
    div.innerHTML = html;
  }
  return elabora;
}

var popola = function() {

  chapters.forEach(function(el) {

    console.log("--- popola: " + el + " ---");
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", elabora());
    oReq.open("GET", "./chapters/" + el);
    oReq.send();

  })

}

popola();
