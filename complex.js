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
}