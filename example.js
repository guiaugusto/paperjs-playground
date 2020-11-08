// execute paperjs in canvas
paper.install(window);
paper.setup('myCanvas')

// creates general path
var path = new Path();
path.strokeColor = 'black';

// follows canvas orientation
// x - and y +  |  x + and y +
// _____________|_____________
//              | 
// x - and y -  |  x + and y -
function get_orientation(angle) {
    if (angle >= 0 && angle < 90) return [1, 1];
    else if (angle >= 90 && angle < 180) return [-1, 1];
    else if (angle >= 180 && angle < 270) return [-1, -1];
    else return [1, -1];
}

function calculate_point(xa, ya, angle, distance) {
    let ca = distance * Math.cos(angle * (Math.PI/180));
    let co = distance * Math.sin(angle * (Math.PI/180));

    let direction = get_orientation(angle);

    return [xa + ca * direction[0], ya + co * direction[1]];
}

class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        
        // creates a command list that will store each
        // created point by each executed command
        this.pathSet = [];
        this.pathSet.push(new Point(x, y));
    }

    update_turtle(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        path.removeSegments();

        this.pathSet.forEach(element => {
            path.add(element)
        });
    }

    right(received_angle) {
        this.angle = (360 - this.angle - received_angle) % 360;
    }

    left(received_angle) {
        this.angle = (this.angle + received_angle) % 360;
    }

    forward(distance) {
        let last_point = calculate_point(this.x, this.y, this.angle, distance);

        this.pathSet.push(
            new Point(...last_point)
        );
        this.update_turtle(...last_point);
    }
}