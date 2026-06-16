var canvas = document.getElementById("MainCanvas");
var ctx = canvas.getContext("2d");
ctx.textAlign = "center";
var variables = [];
var varnames = [];
var prev_nrts = [];
var boxes = [];
var equations = [];
var mode = 0;
var box_size = 125;
var scale = 1;
var dot_size = 15;
ctx.font = "bold 20px Arial";

set_quadratic();
update_scale();
show_all();

canvas.addEventListener("mousemove", function (event) {
    for (var b of boxes) {
        b.drag(rel_mouse_pos(event));
    }
    show_all();
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
addEventListener("resize", function (event) {
    update_scale();
})

function update_scale() {
    var width = window.innerWidth;
    //canvas.width = width * 1300 / 1391;
    //magic number -- this makes it line up with the scale that i designed it for
    scale = width / 1391;
    show_all();
}