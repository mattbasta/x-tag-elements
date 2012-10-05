(function() {
    var c_x = 0,
        c_y = 0;

    document.addEventListener("mousemove", function(e) {
        c_x = e.pageX;
        c_y = e.pageY;
    });

    var tags = [];

    xtag.register('x-mousetrails', {
        onInsert: function() {
            this.x = window.innerWidth / 2,
            this.y = window.innerHeight / 2;
            this.style.fontFamily = '"Comic Sans", "Comic Sans MS"';
            if(this.innerText.length > 0 && this.innerText == this.innerHTML) {
                this.innerHTML = this.innerText[0] + "<x-mousetrails>" + this.innerHTML.substr(1) + "</x-mousetrails>";
            }
            tags.push(this);
        }
    });

    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    var tick = function() {
        for(var i = 0; i < tags.length; i++) {
            var t = tags[i];
            if(t.parentNode.nodeName == "X-MOUSETRAILS") {
                t.x = (t.x + t.x + t.parentNode.x) / 3;
                t.y = (t.y + t.y + t.parentNode.y) / 3;
                t.style.left = (t.x - t.parentNode.x) + "px";
                t.style.top = (t.y - t.parentNode.y) + "px";
            } else {
                t.x = (t.x + c_x) / 2;
                t.y = (t.y + c_y) / 2;
                t.style.left = t.x + "px";
                t.style.top = t.y + "px";
            }
        }
        raf(tick);
    };
    raf(tick);

})();
