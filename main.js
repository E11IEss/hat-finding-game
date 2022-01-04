const prompt = require('prompt-sync')({ sigint: true });

class Chara {
    constructor() {
        this.hat = '^';
        this.hole = 'O';
        this.fieldCharacter = '░';
        this.pathCharacter = '*';
    }
}

class Map {
    constructor(field) {
        this.field = field;
        this.y = 0;
        this.x = 0;
    }

    static generateField(h, w, p, symbol, emptyMap) {
        let character = [symbol.hole, symbol.fieldCharacter];
        emptyMap.field = [];
        let correctHoleNumber = 0;
        while (correctHoleNumber < h) {
            let randomArr = [];
            for (let i = 0; i < w; i++) {
                randomArr.push(character[Math.floor(Math.random() * character.length)]);
            }
            let numberOfHoles = randomArr.filter(ele => ele === symbol.hole);
            if (numberOfHoles.length / randomArr.length <= p) {
                emptyMap.field.push(randomArr);
                correctHoleNumber++;
            }
        }
        let pathY = Math.floor(Math.random() * h);
        let pathX = Math.floor(Math.random() * w);
        emptyMap.y = pathY;
        emptyMap.x = pathX;
        let hatY = Math.floor(Math.random() * h);
        let hatX = Math.floor(Math.random() * w);
        if (pathY === hatY && pathX === hatX) {
            hatY = Math.floor(Math.random() * h);
            hatX = Math.floor(Math.random() * w);
        }
        emptyMap.field[pathY][pathX] = symbol.pathCharacter;
        emptyMap.field[hatY][hatX] = symbol.hat;
        return emptyMap.field;
    }
}

class Game {
    constructor(map) {
        this.symbol = new Chara();
        this.coordinate = new Map();
        this.map = map;
    }

    play() {
        let status = true;
        while (status = true) {
            this.print();
            console.log(this.map.y, this.map.x)
            this.move();
            if (!this.inBound()) {
                status = false;
                console.log('out of border');
                break;
            } else if (this.hole()) {
                status = false;
                console.log('in the hole');
                break;
            } else if (this.hat()) {
                status = false;
                console.log('You win');
                break;
            }
            this.map.field[this.map.y][this.map.x] = this.symbol.pathCharacter;
        }
    }

    print() {
        for (let i = 0; i < this.map.field.length; i++) {
            console.log(this.map.field[i].join(''));
        }
    }

    move() {
        const answer = prompt('Which way? ')
        switch (answer) {
            case 'u':
                this.map.y--;
                break;
            case 'd':
                this.map.y++;
                break;
            case 'l':
                this.map.x--;
                break;
            case 'r':
                this.map.x++;
                break;
            default:
                console.log('Please enter');
                this.move();
                break;
        }
    }

    hole() {
        return this.map.field[this.map.y][this.map.x] === this.symbol.hole;
    }

    inBound() {
        return (
            this.map.y >= 0 &&
            this.map.x >= 0 &&
            this.map.y < this.map.field.length &&
            this.map.x < this.map.field[0].length
        );
    }

    hat() {
        return this.map.field[this.map.y][this.map.x] === this.symbol.hat;
    }
}

const newCharacter = new Chara();
const newMap = new Map();
Map.generateField(6, 8, 0.2, newCharacter, newMap);
// console.log(map1);
//console.log(newMap);
// console.log(Game.coordinate);
const newGame = new Game(newMap);
// console.log(newGame);
newGame.play();