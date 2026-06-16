class NumBox {
    constructor(vars, dragvars, posx, posy, size, scale) {
        this.vars = vars;
        this.dragvars = dragvars;
        this.posx = posx;
        this.posy = posy;
        this.size = size;
        this.scale = scale;
        this.dragged = null;
        this.hovered = null;
    }
    //convert a (canvas) position to a complex number, unscaled
    pos_to_complex(p) {
        var x = p[0];
        var y = p[1];
        var re = this.scale * (x - this.posx) / this.size;
        var im = this.scale * (this.posy - y) / this.size;
        return new Complex(re, im);
    }
    //convert a complex number to a canvas position, unscaled
    complex_to_pos(c) {
        var x = this.posx + (c.re * this.size / this.scale);
        var y = this.posy - (c.im * this.size / this.scale);
        return this.clamp([x, y]);
    }
    //clamp a point to lie within the box
    //if it would lie outside the box on any axis, just put it on the border in that direction
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
        ctx.fillStyle = "#294958";
        ctx.fillRect(scale_x(this.posx - this.size), scale_y(this.posy - this.size), this.size * 2 * scale, this.size * 2 * scale);
        this.draw_grid();
        for (var num of this.vars) {
            var value = variables[num];
            //console.log(value);
            //console.log(value);
            var pos = this.complex_to_pos(value);
            //console.log(pos);
            ctx.fillStyle = "#ef2d56";
            ctx.beginPath();
            ctx.arc(scale_x(pos[0]), scale_y(pos[1]), dot_size * scale, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "Black";
            ctx.fillText(varnames[num], scale_x(pos[0]), scale_y(pos[1] + 5));
        }
        for (var num of this.dragvars) {
            var value = variables[num];
            //console.log(value);
            var pos = this.complex_to_pos(value);
            //console.log(pos);
            ctx.fillStyle = "#a6eb6e";
            if (this.hovered == num) {
                ctx.fillStyle = "#74bb3e";
            }
            ctx.beginPath();
            ctx.arc(scale_x(pos[0]), scale_y(pos[1]), scale * dot_size, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "Black";
            ctx.fillText(varnames[num], scale_x(pos[0]), scale_y(pos[1] + 5));
        }
        ctx.fillStyle = "White"
        ctx.font = "bold 14px Arial";
        ctx.fillText(this.scale, scale_x(this.posx + this.size + 7), scale_y(this.posy + 4));
        ctx.fillText("-" + this.scale, scale_x(this.posx - this.size - 7), scale_y(this.posy + 4));
        ctx.fillText(this.scale + "i", scale_x(this.posx), scale_y(this.posy - this.size - 4));
        ctx.fillText("-" + this.scale + "i", scale_x(this.posx), scale_y(this.posy + this.size + 12));
        ctx.font = "bold 20px Arial";
        if (this.posy < 350) {
            if (this.posx < 1000 || boxes.length > 4) {
                this.draw_triangle_right();
            }
        } else {
            this.draw_triangle_left();
        }
    }

    draw_equation() {
        if (this.hovered != null) {
            ctx.font = "bold 25px Arial";
            ctx.fillStyle = "White";
            var hover_pos = this.complex_to_pos(variables[this.hovered]);
            ctx.fillText(equations[this.hovered], scale_x(hover_pos[0]), scale_y(hover_pos[1] - (25 * scale)));
            ctx.font = "bold 20px Arial";
        }
    }

    draw_triangle_right() {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(scale_x(this.posx + this.size + 20), scale_y(this.posy + 8));
        ctx.lineTo(scale_x(this.posx + this.size + 28), scale_y(this.posy));
        ctx.lineTo(scale_x(this.posx + this.size + 20), scale_y(this.posy - 8));
        ctx.lineTo(scale_x(this.posx + this.size + 20), scale_y(this.posy + 8));
        ctx.stroke();
        ctx.fill();
    }

    draw_triangle_left() {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(scale_x(this.posx - this.size - 30), scale_y(this.posy + 8));
        ctx.lineTo(scale_x(this.posx - this.size - 22), scale_y(this.posy));
        ctx.lineTo(scale_x(this.posx - this.size - 30), scale_y(this.posy - 8));
        ctx.lineTo(scale_x(this.posx - this.size - 30), scale_y(this.posy + 8));
        ctx.stroke();
        ctx.fill();
    }

    draw_grid() {
        yle = "#000000";
        ctx.beginPath();
        ctx.moveTo(scale_x(this.posx - this.size - 30), scale_y(this.posy + 8));
        ctx.lineTo(scale_x(this.posx - this.size - 22), scale_y(this.posy));
        ctx.lineTo(scale_x(this.posx - this.size - 30), scale_y(this.posy - 8));
        ctx.lineTo(scale_x(this.posx - this.size - 30), scale_y(this.posy + 8));
        ctx.stroke();
        ctx.fill();
    }

    draw_grid() {
        var thickness = 1;
        ctx.fillStyle = "#16bac5";
        for (var i = 1; i < 10; i += 1) {
            var coord = i * (this.size / 5);
            if (i == 5) {
                thickness = 2;
            } else {
                thickness = 1;
            }
            ctx.fillRect(scale_x(this.posx - this.size), scale_y((this.posy - this.size) + coord - thickness), this.size * 2 * scale, thickness * 2 * scale);
            ctx.fillRect(scale_x((this.posx - this.size) + coord - thickness), scale_y(this.posy - this.size), thickness * 2 * scale, this.size * 2 * scale);
        }
    }

    drag(mpos) {
        if (this.dragged != null) {
            variables[this.dragged] = this.pos_to_complex(this.clamp(mpos));
            //console.log(variables[this.dragged]);
            update_vars();
        }
        if (this.hovered != null) {
            var pos = this.complex_to_pos(variables[this.hovered]);
            if ((pos[0] - mpos[0]) * (pos[0] - mpos[0]) + (pos[1] - mpos[1]) * (pos[1] - mpos[1]) > 100) {
                this.hovered = null;
            }
        }
        if (this.hovered == null) {
            for (var num of this.vars) {
                var value = variables[num];
                var pos = this.complex_to_pos(value);
                // console.log(pos);
                // console.log(mpos);
                if ((pos[0] - mpos[0]) * (pos[0] - mpos[0]) + (pos[1] - mpos[1]) * (pos[1] - mpos[1]) < 100) {
                    this.hovered = num;
                    break;
                }
            }
            for (var num of this.dragvars) {
                var value = variables[num];
                var pos = this.complex_to_pos(value);
                // console.log(pos);
                // console.log(mpos);
                if ((pos[0] - mpos[0]) * (pos[0] - mpos[0]) + (pos[1] - mpos[1]) * (pos[1] - mpos[1]) < 100) {
                    this.hovered = num;
                    break;
                }
            }
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
    ctx.fillStyle = "#193948";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (var b of boxes) {
        b.show();
    }
    for (var b of boxes) {
        b.draw_equation();
    }
}

function rel_mouse_pos(evt) {
    var rect = canvas.getBoundingClientRect();
    return reverse_scale_pos([evt.clientX - rect.left, evt.clientY - rect.top]);
}

function scale_x(pos) {
    return pos * scale;
}

function scale_y(pos) {
    return pos * scale;
}

function reverse_scale_pos(pos) {
    return [pos[0] / scale, pos[1] / scale];
}