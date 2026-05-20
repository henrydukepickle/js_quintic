function set_quadratic() {
    var a = new Complex(0.5, 1);
    variables = [a, a.neg()];
    for (var i = 0; i < 6; i++) {
        variables.push(null);
    }
    var box1 = new NumBox([], [0, 1], 200, 200, 100, 1);
    var box2 = new NumBox([2, 3, 4], [], 500, 200, 100, 2);
    var box3 = new NumBox([5, 6], [], 800, 200, 100, 2);
    var box4 = new NumBox([7], [], 1100, 200, 100, 1);
    boxes = [box1, box2, box3, box4];
    prev_nrts = [new Complex(1, 0)];
    varnames = ["x", "y", "a", "b", "c", "Δ", "ẟ", "r"];
    mode = 0;
    update_vars();
    show_all();
}

function set_cubic() {
    var a = new Complex(0.5, 1);
    variables = [a, a.neg(), new Complex(0, 1)];
    for (var i = 0; i < 9; i++) {
        variables.push(null);
    }

    prev_nrts = [new Complex(1, 0), new Complex(1, 0)];
    var box1 = new NumBox([], [0, 1, 2], 200, 200, 100, 1);
    var box2 = new NumBox([3, 4, 5, 6], [], 500, 200, 100, 2);
    var box3 = new NumBox([7, 8], [], 800, 200, 100, 5);
    var box4 = new NumBox([9, 10], [], 1100, 200, 100, 5);
    var box5 = new NumBox([11], [], 200, 500, 100, 1);
    boxes = [box1, box2, box3, box4, box5];

    varnames = ["x", "y", "z", "a", "b", "c", "d", "Δ", "ẟ", "Γ", "γ", "r"];

    mode = 1;
    update_vars();
    show_all();
}

function set_quartic() {
    variables = [new Complex(1, 0), new Complex(-1, 0), new Complex(0, 1), new Complex(0, -1)];
    for (var i = 0; i < 18; i++) {
        variables.push(null);
    }
    prev_nrts = [new Complex(1, 0), new Complex(1, 0), new Complex(1, 0), new Complex(1, 0)];
    var box1 = new NumBox([], [0, 1, 2, 3], 200, 200, 100, 1);
    var box2 = new NumBox([4, 5, 6, 7, 8], [], 500, 200, 100, 2);
    var box3 = new NumBox([9, 10, 11], [], 800, 200, 100, 5);
    var box4 = new NumBox([12, 13, 14], [], 1100, 200, 100, 5);
    var box5 = new NumBox([15, 16], [], 200, 500, 100, 1);
    var box6 = new NumBox([17, 18], [], 500, 500, 100, 1);
    var box7 = new NumBox([19, 20], [], 800, 500, 100, 1);
    var box8 = new NumBox([21], [], 1100, 500, 100, 1);
    boxes = [box1, box2, box3, box4, box5, box6, box7, box8];

    varnames = ["x", "y", "z", "w", "a", "b", "c", "d", "e", "Δ₀", "Δ₁", "Δ₂", "u", "v", "ẟ₂", "Q", "q", "S", "s", "Γ", "γ", "r"];
    mode = 2;
    update_vars();
    show_all();
}

function set_10th_root() {
    var a = new Complex(0.5, 1);
    variables = [a, a];
    var box1 = new NumBox([], [0], 200, 200, 100, 1);
    var box2 = new NumBox([1], [], 500, 200, 100, 1);
    boxes = [box1, box2];
    prev_nrts = [new Complex(1, 0)];
    varnames = ["Δ", "ẟ"];
    mode = 3;
    update_vars();
    show_all();
}