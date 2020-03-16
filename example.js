paper.install(window);
paper.setup('myCanvas')

var path = new Path();
path.strokeColor = 'black';

var initial = new Point(50, 50);
var final = new Point(100, 100);

console.log(initial)
console.log(final)

pathSet = [];

var dx = final.x - initial.x;
var dy = final.y - initial.y;

for(let i = initial.x; i <= final.x; i++){
    y = initial.y + dy * (i - initial.x) / dx;
    pathSet.push(new Point(i, y));
}

var seg = 0;

path.onFrame = function onFrame(event) {
    if(seg < pathSet.length){
        path.add(pathSet[seg]);
        seg += 1;
    }
}

console.log(path);