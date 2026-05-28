function update_vars_quadratic() {
    var x = variables[0];
    var y = variables[1];
    var a = new Complex(1, 0);
    var b = x.neg().sub(y);
    var c = x.mul(y);
    var ac4 = a.mul(c).mulf(4);
    var Delta = b.mul(b).sub(ac4);
    var delta = Delta.closest_nrt(2, prev_nrts[0]);
    prev_nrts[0] = delta;
    var r = b.neg().add(delta).div(a.mulf(2));
    //set variables array using the calculated values
    variables = [x, y, a, b, c, Delta, delta, r];

    show_all();
}

function update_vars_cubic() {
    var x = variables[0];
    var y = variables[1];
    var z = variables[2];
    var a = new Complex(1, 0);
    var b = x.neg().sub(y).sub(z);
    var xy = x.mul(y);
    var yz = y.mul(z);
    var xz = x.mul(z);
    var c = xy.add(yz).add(xz);
    var d = x.mul(y).mul(z).neg();
    var abcd18 = a.mul(b).mul(c).mul(d).mulf(18);
    var bbbd4 = b.mul(b).mul(b).mul(d).mulf(4);
    var bbcc = b.mul(b).mul(c).mul(c);
    var accc4 = a.mul(c).mul(c).mul(c).mulf(4);
    var aadd27 = a.mul(a).mul(d).mul(d).mulf(27);
    var Delta = abcd18.neg().add(bbbd4).sub(bbcc).add(accc4).add(aadd27);
    var delta = Delta.closest_nrt(2, prev_nrts[0]);
    prev_nrts[0] = delta;
    var bbb2 = b.mul(b).mul(b).mulf(2);
    var abc9 = a.mul(b).mul(c).mulf(9);
    var aad27 = a.mul(a).mul(d).mulf(27);
    var adelta3rt3 = a.mul(delta).mulf(Math.pow(3, 1.5));
    var Gamma = bbb2.sub(abc9).add(aad27).add(adelta3rt3);
    var gamma = (Gamma.mulf(0.5)).closest_nrt(3, prev_nrts[1]);
    prev_nrts[1] = gamma;
    var b2s3ac = (b.mul(b)).sub(a.mul(c).mulf(3));
    var r_num = b.add(gamma).add(b2s3ac.div(gamma));
    var r = r_num.div(a.mulf(-3));
    variables = [x, y, z, a, b, c, d, Delta, delta, Gamma, gamma, r];

    show_all();
}

function update_vars_quartic() {
    var x = variables[0];
    var y = variables[1];
    var z = variables[2];
    var w = variables[3];
    var a = new Complex(1, 0);
    var b = x.neg().sub(y).sub(z).sub(w);
    var xy = x.mul(y);
    var xz = x.mul(z);
    var xw = x.mul(w);
    var yz = y.mul(z);
    var yw = y.mul(w);
    var zw = z.mul(w);
    var c = xy.add(xz).add(xw).add(yz).add(yw).add(zw);
    var xyz = x.mul(y).mul(z);
    var xyw = x.mul(y).mul(w);
    var xzw = x.mul(z).mul(w);
    var yzw = y.mul(z).mul(w);
    var d = xyz.neg().sub(xyw).sub(xzw).sub(yzw);
    var e = x.mul(y).mul(z).mul(w);
    var cc = c.mul(c);
    var bd3 = b.mul(d).mulf(3);
    var ae12 = a.mul(e).mulf(12);
    var Delta0 = cc.sub(bd3).add(ae12);
    var ccc2 = c.mul(c).mul(c).mulf(2);
    var bcd9 = b.mul(c).mul(d).mulf(9);
    var bbe27 = b.mul(b).mul(e).mulf(27);
    var add27 = a.mul(d).mul(d).mulf(27);
    var ace72 = a.mul(c).mul(e).mulf(72);
    var Delta1 = ccc2.sub(bcd9).add(bbe27).add(add27).sub(ace72);
    var Delta0cubed4 = Delta0.mul(Delta0).mul(Delta0).mulf(4);
    var Delta1squared = Delta1.mul(Delta1);
    var Delta2 = Delta0cubed4.neg().add(Delta1squared).mulf(1 / 27);
    var ac8 = a.mul(c).mulf(8);
    var bb3 = b.mul(b).mulf(3);
    var aa8 = a.mul(a).mulf(8);
    var u_num = ac8.sub(bb3);
    var u = u_num.div(aa8);
    var bbb = b.mul(b).mul(b);
    var abc4 = a.mul(b).mul(c).mulf(4);
    var aad8 = a.mul(a).mul(d).mulf(8);
    var v_num = bbb.sub(abc4).add(aad8);
    var aaa8 = a.mul(a).mul(a).mulf(8);
    var v = v_num.div(aaa8);
    var delta2 = Delta2.closest_nrt(2, prev_nrts[0]);
    prev_nrts[0] = delta2;
    var delta2_3rt3 = delta2.mulf(Math.pow(3, 1.5));
    var Q = Delta1.add(delta2_3rt3).mulf(0.5);
    var q = Q.closest_nrt(3, prev_nrts[1]);
    prev_nrts[1] = q;
    var q_flipped_sum = Delta0.div(q).add(q);
    var S = u.mulf(-1 / 6).add(q_flipped_sum.div(a.mulf(12)));
    var s = S.closest_nrt(2, prev_nrts[2]);
    prev_nrts[2] = s;
    var Gamma = v.div(s).neg().sub(u.mulf(2)).sub(S.mulf(4));
    var gamma = Gamma.closest_nrt(2, prev_nrts[3]);
    prev_nrts[3] = gamma;
    var r = b.div(a.mulf(-4)).add(s).add(gamma.mulf(0.5));
    variables = [x, y, z, w, a, b, c, d, e, Delta0, Delta1, Delta2, u, v, delta2, Q, q, S, s, Gamma, gamma, r];

    show_all();
}

function update_vars_tenth_root() {
    var x = variables[0];
    var root = x.closest_nrt(10, prev_nrts[0]);
    prev_nrts[0] = root;
    variables = [x, root];
    show_all();
}

function update_vars_quadratic_basic() {
    var a = variables[0];
    var b = variables[1];
    var c = variables[2];
    var ac4 = a.mul(c).mulf(4);
    var Delta = b.mul(b).sub(ac4);
    var delta = Delta.closest_nrt(2, prev_nrts[0]);
    prev_nrts[0] = delta;
    var r = b.neg().add(delta).div(a.mulf(2));
    //set variables array using the calculated values
    variables = [a, b, c, Delta, delta, r];

    show_all();
}

function update_vars_cubic_basic() {
    var a = variables[0];
    var b = variables[1];
    var c = variables[2];
    var d = variables[3];
    var abcd18 = a.mul(b).mul(c).mul(d).mulf(18);
    var bbbd4 = b.mul(b).mul(b).mul(d).mulf(4);
    var bbcc = b.mul(b).mul(c).mul(c);
    var accc4 = a.mul(c).mul(c).mul(c).mulf(4);
    var aadd27 = a.mul(a).mul(d).mul(d).mulf(27);
    var Delta = abcd18.neg().add(bbbd4).sub(bbcc).add(accc4).add(aadd27);
    var delta = Delta.closest_nrt(2, prev_nrts[0]);
    prev_nrts[0] = delta;
    var bbb2 = b.mul(b).mul(b).mulf(2);
    var abc9 = a.mul(b).mul(c).mulf(9);
    var aad27 = a.mul(a).mul(d).mulf(27);
    var adelta3rt3 = a.mul(delta).mulf(Math.pow(3, 1.5));
    var Gamma = bbb2.sub(abc9).add(aad27).add(adelta3rt3);
    var gamma = (Gamma.mulf(0.5)).closest_nrt(3, prev_nrts[1]);
    prev_nrts[1] = gamma;
    var b2s3ac = (b.mul(b)).sub(a.mul(c).mulf(3));
    var r_num = b.add(gamma).add(b2s3ac.div(gamma));
    var r = r_num.div(a.mulf(-3));
    variables = [a, b, c, d, Delta, delta, Gamma, gamma, r];

    show_all();
}

function update_vars_quartic_basic() {
    var a = variables[0];
    var b = variables[1];
    var c = variables[2];
    var d = variables[3];
    var e = variables[4];
    var cc = c.mul(c);
    var bd3 = b.mul(d).mulf(3);
    var ae12 = a.mul(e).mulf(12);
    var Delta0 = cc.sub(bd3).add(ae12);
    var ccc2 = c.mul(c).mul(c).mulf(2);
    var bcd9 = b.mul(c).mul(d).mulf(9);
    var bbe27 = b.mul(b).mul(e).mulf(27);
    var add27 = a.mul(d).mul(d).mulf(27);
    var ace72 = a.mul(c).mul(e).mulf(72);
    var Delta1 = ccc2.sub(bcd9).add(bbe27).add(add27).sub(ace72);
    var Delta0cubed4 = Delta0.mul(Delta0).mul(Delta0).mulf(4);
    var Delta1squared = Delta1.mul(Delta1);
    var Delta2 = Delta0cubed4.neg().add(Delta1squared).mulf(1 / 27);
    var ac8 = a.mul(c).mulf(8);
    var bb3 = b.mul(b).mulf(3);
    var aa8 = a.mul(a).mulf(8);
    var u_num = ac8.sub(bb3);
    var u = u_num.div(aa8);
    var bbb = b.mul(b).mul(b);
    var abc4 = a.mul(b).mul(c).mulf(4);
    var aad8 = a.mul(a).mul(d).mulf(8);
    var v_num = bbb.sub(abc4).add(aad8);
    var aaa8 = a.mul(a).mul(a).mulf(8);
    var v = v_num.div(aaa8);
    var delta2 = Delta2.closest_nrt(2, prev_nrts[0]);
    prev_nrts[0] = delta2;
    var delta2_3rt3 = delta2.mulf(Math.pow(3, 1.5));
    var Q = Delta1.add(delta2_3rt3).mulf(0.5);
    var q = Q.closest_nrt(3, prev_nrts[1]);
    prev_nrts[1] = q;
    var q_flipped_sum = Delta0.div(q).add(q);
    var S = u.mulf(-1 / 6).add(q_flipped_sum.div(a.mulf(12)));
    var s = S.closest_nrt(2, prev_nrts[2]);
    prev_nrts[2] = s;
    var Gamma = v.div(s).neg().sub(u.mulf(2)).sub(S.mulf(4));
    var gamma = Gamma.closest_nrt(2, prev_nrts[3]);
    prev_nrts[3] = gamma;
    var r = b.div(a.mulf(-4)).add(s).add(gamma.mulf(0.5));
    variables = [a, b, c, d, e, Delta0, Delta1, Delta2, u, v, delta2, Q, q, S, s, Gamma, gamma, r];

    show_all();
}

function update_vars() {
    if (mode == 0) {
        update_vars_quadratic();
    } else if (mode == 1) {
        update_vars_cubic();
    } else if (mode == 2) {
        update_vars_quartic();
    } else if (mode == 3) {
        update_vars_tenth_root();
    } else if (mode == 4) {
        update_vars_quadratic_basic();
    } else if (mode == 5) {
        update_vars_cubic_basic();
    } else if (mode == 6) {
        update_vars_quartic_basic();
    }
}