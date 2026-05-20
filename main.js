var canvas = document.getElementById("MainCanvas");
var ctx = canvas.getContext("2d");
var variables = [];
var varnames = [];
var prev_nrts = [];
var boxes = [];
var mode = 0;


set_quartic();

canvas.addEventListener("mousemove", function (event) {
    for (var b of boxes) {
        b.drag(rel_mouse_pos(event));
    }
});
canvas.addEventListener("mousedown", function (event) {
    for (var b of boxes) {
        b.clicked(rel_mouse_pos(event));
    }
});
canvas.addEventListener("mouseup", function (event) {
    for (var b of boxes) {
        b.release();
    }
});