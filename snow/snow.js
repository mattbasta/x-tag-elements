(function() {
    var tags = [];

    var tick_count = 0;
    xtag.register('x-snow', {
        onInsert: function() {
            var text = this.innerHTML;
            if(!this.innerText) text = "*";
            this.innerHTML = "";
            for(var i = 0; i < 30; i++) {
                var flake = document.createElement("span");
                flake.x = window.innerWidth * Math.random(),
                flake.y = 0;
                flake.speed = Math.random() + 0.5;
                flake.wiggliness = Math.random() * 450 + 100;
                flake.wiggle_width = Math.random() * 150 + 50;
                flake.innerHTML = text;
                this.appendChild(flake);
                tags.push(flake);
            }
        }
    });

    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    var tick = function() {
        tick_count++;
        for(var i = 0; i < tags.length; i++) {
            var t = tags[i];
            //t.x = (t.x + c_x) / 2;
            t.y += t.speed;
            if(t.y > window.innerHeight) {
                t.x = window.innerWidth * Math.random();
                t.y = 0;
                t.speed = Math.random() + 0.5;
            }
            t.style.left = (t.x + Math.sin(tick_count / t.wiggliness) * t.wiggle_width) + "px";
            t.style.top = t.y + "px";
        }
        raf(tick);
    };
    raf(tick);

})();