// execute paperjs in canvas
paper.install(window);
paper.setup('myCanvas')

class Screen {
    constructor(width = window.innerWidth, height = window.innerHeight) {
        this.width = width;
        this.height = height;

        this.setCanvasArea = (width, height) => {
            var canvas = document.getElementById('myCanvas');
            canvas.width = this.width;
            canvas.height = this.height;
        }

        this.setCanvasArea(this.width, this.height);
    }
}

let sleep = (time, delta) => {
    for(let i = 0; i < time*delta; i++);
}

let seg = 0;

// creates general path
var path = new Path();
path.strokeColor = 'black';

function calculate_point(xa, ya, angle, distance) {
    let ca = distance * Math.cos(angle * (Math.PI/180));
    let co = distance * Math.sin(angle * (Math.PI/180));
    
    return [xa + ca, ya + co];
}

function calculate_distance(first_point, second_point) {
    return Math.sqrt(
        Math.pow(second_point.x - first_point.x) +
        Math.pow(second_point.y - first_point.y)
    )
}

class Turtle {
    constructor(x = window.innerWidth / 2, y = window.innerHeight / 2) {
        this.x = Math.round(x);
        this.y = Math.round(y);
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
        let seg = 0;
        path.onFrame = (event) => {
            if (seg < this.pathSet.length) path.add(this.pathSet[seg++]);
        };
    }

    left = (received_angle) => {
        this.angle = (this.angle - received_angle) % 360;
        if (this.angle < 0) this.angle += 360;
    }

    right = (received_angle) => {
        this.angle = (this.angle + received_angle) % 360;
        if (this.angle < 0) this.angle += 360;
    }

    forward(distance) {
        for (let i = 0; i < distance; i++){
            let last_point = calculate_point(this.x, this.y, this.angle, 1);
    
            this.pathSet.push(
                new Point(...last_point)
            );
            this.update_turtle(...last_point);
        }
    }

    backward = (distance) => {
        for (let i = 0; i < distance; i++) {
            let last_point = calculate_point(this.x, this.y, this.angle, -1);

            this.pathSet.push(
                new Point(...last_point)
            );
            this.update_turtle(...last_point);
        } 
    };
}

new Screen();
