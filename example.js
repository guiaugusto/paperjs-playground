// executa o paperjs no canvas
paper.install(window);
paper.setup('myCanvas')

// cria o caminho geral
var path = new Path();
path.strokeColor = 'black';

function calculate_point(xa, ya, angle, distance) {
    let ca = distance * Math.cos(angle);
    let co = distance * Math.sin(angle);

    return [xa + ca, ya + co];
}

class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        
        // cria uma lista de comandos que armazenará cada
        // ponto criado por cada comando executado
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

    forward(distance) {
        let last_point = calculate_point(this.x, this.y, this.angle, distance);

        this.pathSet.push(
            new Point(...last_point)
        );
        this.update_turtle(...last_point);
    }
}