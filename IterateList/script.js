const canvas = document.getElementById("box");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var miny = 20;
const minx = 20;
var fps = 25;
const ctx = canvas.getContext('2d');

document.getElementById("insert").onsubmit = function() {
    console.log("woo");
    var formval = document.getElementById("insertval").value;
    if (isInDesiredForm(formval) == false){
        alert("Not an Integer!");
        return false;
    }

    insertBox(document.getElementById("insertval").value);

    return false;
}
document.getElementById("findtar").onsubmit = function() {
    console.log("woo");
    var formval = document.getElementById("findtarget").value;
    if (isInDesiredForm(formval) == false){
        alert("Not an Integer!");
        return false;
    }
    findBox(document.getElementById("findtarget").value);
    return false;
}
document.getElementById("settarfps").onsubmit = function() {
    console.log("woo");
    var formval = document.getElementById("fpsform").value;
    if (isInDesiredForm(formval) == false){
        alert("Not an Integer!");
        return false;
    }
    fps = document.getElementById("fpsform").value;
    alert("speed changed to " + fps.value + " frames per second!")
    return false;
}
document.getElementById("fillList").onsubmit = function() {
    console.log("woo");
    var formval = document.getElementById("fillform").value;
    if (isInDesiredForm(formval) == false){
        alert("Not an Integer!");
        return false;
    }
    console.log(formval);
    fill(formval);

    return false;
}
window.addEventListener("resize", function(event) {
    location.reload();
})
function isInDesiredForm(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}
function Box(x, y, l, c, el){

    this.el = el;
    this.x = x;
    this.y = y;
    this.l = l;
    this.c = c;


    this.draw = function (){


        ctx.beginPath();
        ctx.strokeStyle = this.c;
        ctx.rect(this.x, this.y, this.l, this.l);
        var textx = this.x;
        textx +=(this.el.toString().length) == 1? 0: -15;
        textx +=(this.el.toString().length) == 3? -13: 0;
        ctx.font = (this.el.toString().length) > 3? 150 * 1/(this.el.toString().length) + 'px serif': 50 + 'px serif'
        if ((this.el.toString().length) > 3){
            textx += -12;

        }
        ctx.lineWidth = 3;
        ctx.fillText(this.el, textx + this.l * .40, this.y + this.l*.64);
        ctx.stroke();



    }
}

function insertBox(el){
    if (boxes.length == 0){
        boxes.push(new Box(minx, miny, 100, "black", el));
        boxes[boxes.length - 1].draw();
        return;
    }
    var prevBox = boxes[boxes.length - 1];
    if (prevBox.x + 200 > canvas.width){
        miny += 100;
        boxes.push(new Box(minx, miny, prevBox.l, prevBox.c, el));
        boxes[boxes.length - 1].draw();
        return;
    }
    boxes.push(new Box(prevBox.x + 100, prevBox.y, prevBox.l, prevBox.c, el));
    boxes[boxes.length - 1].draw();
    return;

}
var boxes = [];

function highlight(box){
    
    if (boxes.indexOf(box) == 0){
        box.c = "red";
        box.draw();
        return;
    }
    ctx.clearRect(box.x, box.y, box.l, box.l);

    prevBox = boxes[boxes.indexOf(box) - 1]
    prevBox.c = "black";
    prevBox.draw();
    box.c = "red";
    box.draw();
    

}
function findBox(target){
   
    var c = 0;
    function animate() {
        console.log(c);
        if(c == boxes.length - 1 && boxes[c].el != target ){
            highlight(boxes[c]);
            setTimeout(function(){
                alert("Target not in List!");
                location.reload();
            }, 100);
            return;
        }
        highlight(boxes[c]);
        if (boxes[c].el == target){
            boxes[c].c = "green";
            boxes[c].draw();
            boxes[c].c = "black";
            setTimeout(function(){
                alert("Found Target!");
                location.reload();
            }, 100);
            
            return;
        }
        c += 1;
        setTimeout(() => {
        requestAnimationFrame(animate);
        }, 1000 / fps);
    }
    animate();
}

function fill(stop){
    boxes = [];
    miny = 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var inc = 1;
    function animate() {
        console.log(inc);
        insertBox(inc);
        if (inc == stop){
            afteranimation();
            return;
        }
        inc += 1;
        setTimeout(() => {
        requestAnimationFrame(animate);
        }, 1000 / fps);
    }
    animate();
    
}

fill(10);

function afteranimation(){

   


}


