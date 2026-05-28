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
        ctx.fillStyle = "#9e9e9e";
        ctx.fillRect(this.posx - this.size, this.posy - this.size, this.size * 2, this.size * 2);
        this.draw_grid();
        for (var num of this.vars) {
            var value = variables[num];
            //console.log(value);
            //console.log(value);
            var pos = this.complex_to_pos(value);
            //console.log(pos);
            ctx.fillStyle = "#1f1f1f";
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "White";
            ctx.fillText(varnames[num], pos[0], pos[1] + 5);
        }
        for (var num of this.dragvars) {
            var value = variables[num];
            //console.log(value);
            var pos = this.complex_to_pos(value);
            //console.log(pos);
            ctx.fillStyle = "#1f1f1f";
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "White";
            ctx.fillText(varnames[num], pos[0], pos[1] + 5);
        }
        ctx.fillStyle = "Black"
        ctx.fillText(this.scale, this.posx + this.size + 7, this.posy + 4);
        ctx.fillText("-" + this.scale, this.posx - this.size - 7, this.posy + 4);
        ctx.fillText(this.scale + "i", this.posx, this.posy - this.size - 4);
        ctx.fillText("-" + this.scale + "i", this.posx, this.posy + this.size + 12);
        if (this.posy < 350) {
            this.draw_triangle_right();
        } else {
            this.draw_triangle_left();
        }
    }

    draw_triangle_right() {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(this.posx + this.size + 20, this.posy + 8);
        ctx.lineTo(this.posx + this.size + 28, this.posy);
        ctx.lineTo(this.posx + this.size + 20, this.posy - 8);
        ctx.lineTo(this.posx + this.size + 20, this.posy + 8);
        ctx.stroke();
        ctx.fill();
    }

    draw_triangle_left() {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(this.posx - this.size - 30, this.posy + 8);
        ctx.lineTo(this.posx - this.size - 22, this.posy);
        ctx.lineTo(this.posx - this.size - 30, this.posy - 8);
        ctx.lineTo(this.posx - this.size - 30, this.posy + 8);
        ctx.stroke();
        ctx.fill();
    }

    draw_grid() {
        var thickness = 1;
        ctx.fillStyle = "#4b4b4b";
        for (var i = 1; i < 10; i += 1) {
            var coord = i * (this.size / 5);
            if (i == 5) {
                thickness = 2;
            } else {
                thickness = 1;
            }
            ctx.fillRect(this.posx - this.size, (this.posy - this.size) + coord - thickness, this.size * 2, thickness * 2);
            ctx.fillRect((this.posx - this.size) + coord - thickness, this.posy - this.size, thickness * 2, this.size * 2);
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

function show_all() {
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (var b of boxes) {
        b.show();
    }
}

function rel_mouse_pos(evt) {
    var rect = canvas.getBoundingClientRect();
    console.log(rect.top);
    return [evt.clientX - rect.left, evt.clientY - rect.top];
}