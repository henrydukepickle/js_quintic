class NumBox {
    constructor(vars, dragvars, posx, posy, size, scale) {
        this.vars = vars;
        this.dragvars = dragvars;
        this.posx = posx;
        this.posy = posy;
        this.size = size;
        this.scale = scale;
        this.dragged = null;
    }

    pos_to_complex(p) {
        var x = p[0];
        var y = p[1];
        var re = this.scale * (x - this.posx) / this.size;
        var im = this.scale * (this.posy - y) / this.size;
        return new Complex(re, im);
    }

    complex_to_pos(c) {
        var x = this.posx + (c.re * this.size / this.scale);
        var y = this.posy - (c.im * this.size / this.scale);
        return this.clamp([x, y]);
    }

    clamp(p) {
        var x = 0;
        if (p[0] < (this.posx - this.size)) {
            x = this.posx - this.size;
        } else if (p[0] > (this.posx + this.size)) {
            x = this.posx + this.size;
        } else {
            x = p[0];
        }
        var y = 0;
        if (p[1] < (this.posy - this.size)) {
            y = this.posy - this.size;
        } else if (p[1] > (this.posy + this.size)) {
            y = this.posy + this.size;
        } else {
            y = p[1];
        }
        return [x, y];
    }

    show() {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.posx - this.size, this.posy - this.size, this.size * 2, this.size * 2);
        for (var num of this.vars) {
            var value = variables[num];
            //console.log(value);
            console.log(value);
            var pos = this.complex_to_pos(value);
            //console.log(pos);
            ctx.fillStyle = "#00FF00";
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], 10, 0, 2 * Math.PI);
            ctx.fill();
        }
        for (var num of this.dragvars) {
            var value = variables[num];
            //console.log(value);
            var pos = this.complex_to_pos(value);
            //console.log(pos);
            ctx.fillStyle = "#0000FF";
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], 10, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    drag(mpos) {
        if (this.dragged != null) {
            variables[this.dragged] = this.pos_to_complex(this.clamp(mpos));
            //console.log(variables[this.dragged]);
            update_vars();
        }
    }

    clicked(mpos) {
        for (var num of this.dragvars) {
            var value = variables[num];
            var pos = this.complex_to_pos(value);
            //console.log(pos);
            //console.log(mpos);
            if ((pos[0] - mpos[0]) * (pos[0] - mpos[0]) + (pos[1] - mpos[1]) * (pos[1] - mpos[1]) < 100) {
                this.dragged = num;
                this.drag(mpos);
            }
        }
    }

    release() {
        this.dragged = null;
    }
}

function update_vars() {
    variables[2] = new Complex(1, 0);
    variables[3] = variables[0].neg().sub(variables[1]);
    variables[4] = variables[0].mul(variables[1]);
    var ac4 = variables[2].mul(variables[4]).mulf(4);
    variables[5] = variables[3].mul(variables[3]).sub(ac4);
    variables[6] = variables[5].closest_nrt(2, prev_nrts[0]);
    prev_nrts[0] = variables[6];
    variables[7] = variables[3].neg().add(variables[6]).div(variables[2].mulf(2));

    show_all();
}

function show_all() {
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (var b of boxes) {
        b.show();
    }
}

var canvas = document.getElementById("MainCanvas");
var ctx = canvas.getContext("2d");
var a = new Complex(0.5, 1);
var variables = [a, a.neg()];
for (var i = 0; i < 6; i++) {
    variables.push(null);
}
var box1 = new NumBox([], [0, 1], 200, 200, 100, 1);
var box2 = new NumBox([2, 3, 4], [], 500, 200, 100, 2);
var box3 = new NumBox([5, 6], [], 200, 500, 100, 2);
var box4 = new NumBox([7], [], 500, 500, 100, 1);
var boxes = [box1, box2, box3, box4];
var prev_nrts = [new Complex(1, 0)];
update_vars();
show_all();
canvas.addEventListener("mousemove", function (event) {
    for (var b of boxes) {
        b.drag([event.clientX - 10, event.clientY - 10]);
    }
});
canvas.addEventListener("mousedown", function (event) {
    for (var b of boxes) {
        b.clicked([event.clientX - 10, event.clientY - 10]);
    }
});
canvas.addEventListener("mouseup", function (event) {
    for (var b of boxes) {
        b.release();
    }
});