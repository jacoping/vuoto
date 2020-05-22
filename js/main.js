
      var md = window.markdownit()
      .use(window.markdownitMark)
      .use(window.markdownitIns)
      .use(window.markdownitContainer, 'box', {

            validate: function(params) {
              //return params.trim().match(/^box\s+(.*)$/);
              return true;
            },

            render: function (tokens, idx) {
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

      var capitoli = [
        "01.chapter",
        "02.chapter",
        "03.chapter"
      ]

      console.log(capitoli)

      var elabora = function() {
        var html = md.render(this.responseText);
        document.querySelector("#content").innerHTML = html;
      }

      var elabora2 = function () {
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

        console.log("--- popola ---");
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", elabora2());
        oReq.open("GET", "./chapters/01.chapter");
        oReq.send();

        console.log("--- popola ---");
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", elabora2());
        oReq.open("GET", "./chapters/02.chapter");
        oReq.send();

        console.log("--- popola ---");
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", elabora2());
        oReq.open("GET", "./chapters/03.chapter");
        oReq.send();

      }



      popola();
      
