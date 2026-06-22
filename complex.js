class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    mul(c) {
        return new Complex(this.re * c.re - c.im * this.im, this.im * c.re + c.im * this.re);
    }

    add(c) {
        return new Complex(this.re + c.re, this.im + c.im);
    }

    neg() {
        return new Complex(-this.re, -this.im);
    }

    sub(c) {
        return this.add(c.neg());
    }

    mulf(f) {
        return new Complex(this.re * f, this.im * f);
    }

    mag() {
        return Math.sqrt((this.re * this.re) + (this.im * this.im));
    }

    mag2() {
        return (this.re * this.re) + (this.im * this.im);
    }

    dist(c) {
        return this.sub(c).mag();
    }

    angle() {
        return Math.atan2(this.im, this.re);
    }

    inv() {
        let denom = this.mag2();
        return new Complex(this.re / denom, -this.im / denom);
    }

    div(c) {
        return this.mul(c.inv());
    }

    nrts(n) {
        var angle = this.angle() / n;
        var mag = this.mag();
        var newmag = Math.pow(mag, 1 / n);
        var ret = [];
        for (var i = 0; i < n; i++) {
            var new_angle = i * (2 * Math.PI / n) + angle;
            ret.push(new Complex(Math.cos(new_angle) * newmag, Math.sin(new_angle) * newmag));
        }
        return ret;
    }

    closest_nrt(n, c) {
        var closest = 10000;
        var closest_nrt = null;
        for (var nrt of this.nrts(n)) {
            if (c.dist(nrt) < closest) {
                closest = c.dist(nrt);
                closest_nrt = nrt;
            }
        }
        return closest_nrt;
    }

    closest_log(c) {
        if (this.mag() < 0.001) {
            return null;
        }
        var raw_log_re = Math.log(this.mag());
        var raw_log_im = Math.atan2(this.re, this.im);
        var raw_log_im_diff = c.im - raw_log_im;
        var closest_im_diff = closest_2pi_multiple(raw_log_im_diff);
        return new Complex(raw_log_re, raw_log_im + closest_im_diff);
    }

    bring_derivative() {
        return (this.mul(this).mul(this).mul(this).mulf(5).add(new Complex(1, 0)));
    }

    bring_newton_iteration(start) {
        var deriv = start.bring_derivative();
        if (deriv.mag() < 0.001) {
            console.log("Derivative too small!");
        }
        var func = start.mul(start).mul(start).mul(start).mul(start).add(start).add(this);
        if (func.mag() < 0.0001) {
            return null;
        }
        return start.sub(func.div(deriv));
    }

    bring_radical(start) {
        var curr = start;
        var next = this.bring_newton_iteration(curr);
        while (next != null) {
            curr = next;
            next = this.bring_newton_iteration(curr);
        }
        return curr;
    }

    nonpersistent_sqrt() {
        return this.nrts(2)[0];
    }
}

function closest_2pi_multiple(target) {
    return 2 * Math.PI * (Math.floor((target / (2 * Math.PI)) + 0.5));
}