class Space {

    Gworld = [];

    Wlength;
    Wwidth;
    Wheight;
    Wfield;

    constructor(length, width, height, field) {
        // length, width, height размеры пространства
        // field тип пространства // обычно 0

        this.Wlength = length;
        this.Wwidth = width;
        this.Wheight = height;
        this.Wfield = field;

        for (let x = 0; x < length; x++) {
            this.Gworld[x] = [];
            for (let y = 0; y < width; y++) {
                this.Gworld[x][y] = [];
                for (let z = 0; z < height; z++) {
                    this.Gworld[x][y][z] = field;
                }
            }
        }
    }
    // создает простанство для фигур

    belonging(circuit, x, y) {
        // контур фигуры заполнения
        // точка проверки

        let npol = circuit.length;
        let j = npol - 1;
        let c = 0;
        for (let i = 0; i < npol; i++) {
            if ((((circuit[i][1] <= y) && (y < circuit[j][1])) || ((circuit[j][1] <= y) && (y < circuit[i][1]))) &&
                (x > (circuit[j][0] - circuit[i][0]) * (y - circuit[i][1]) / (circuit[j][1] - circuit[i][1]) + circuit[i][0])) {
                c = !c
            }
            j = i;
        }
        return c;
    }
    // нахождение точек в контуре

    sandbox() {
        let world = [];
        for (let x = 0; x < this.Wlength; x++) {
            world[x] = [];
            for (let y = 0; y < this.Wwidth; y++) {
                world[x][y] = [];
                for (let z = 0; z < this.Wheight; z++) {
                    world[x][y][z] = this.Wfield;
                }
            }
        }
        return world;
    }
    // Создание локального мира

    extrusion(type, circuit, height, world) {
        // circuit создает 
        // height высота фигуры
        // world локальный мир

        for (let y = 0; y < this.Wwidth; y++) {
            for (let z = 0; z < this.Wheight; z++) {
                if (this.belonging(circuit, y, z)) {
                    for (let x = 0; x < height; x++) {
                        world[x][y][z] = type;
                    }
                }
            }
        }

        return world;
    }
    // Выдавливание фигуры в локальном мире

    turn(turn, world) {
        let localMorld = this.sandbox();

        for (let x = 0; x < this.Wlength; x++) {
            for (let y = 0; y < this.Wwidth; y++) {
                for (let z = 0; z < this.Wheight; z++) {
                    if (world[x][y][z] != 0) {
                        let A = [x, y, z];

                        A = this.Mx(A, turn[0]);
                        A = this.My(A, turn[1]);
                        A = this.Mz(A, turn[2]);

                        localMorld[Math.abs(Math.floor(A[0]))][Math.abs(Math.floor(A[1]))][Math.abs(Math.floor(A[2]))] = world[x][y][z];
                    }
                }
            }
        }

        return localMorld;
    }
    // Поворот фигуры в локальном мире

    displacement(displacement, world) {
        let localMorld = this.sandbox();

        for (let x = 0; x < this.Wlength; x++) {
            for (let y = 0; y < this.Wwidth; y++) {
                for (let z = 0; z < this.Wheight; z++) {
                    if (world[x][y][z] != 0) {
                        localMorld[x + displacement[0]][y + displacement[1]][z + displacement[2]] = world[x][y][z];
                    }
                }
            }
        }

        return localMorld;
    }
    // перемещение фигуры

    denseFigure(type, circuit, height, turn, displacement) {
        // type тип фигуры // 0 вычитание // 1 слияние // -1|1
        // circuit контур фигуры // [[x1, y1], [x2, y2], ... ,[xn, yn]]
        // height высота выдавливания // int => 0
        // turn поворот вокруг осей // [cos(x), cos(y), cos(z)]
        // displacement смещение по координатом // [x, y, z]

        let world
        world = this.sandbox();
        world = this.extrusion(type, circuit, height, world);
        world = this.turn(turn, world);
        world = this.displacement(displacement, world);
        this.Union(world);

    }
    // создание фигуры конечной

    Union(world) {

        for (let x = 0; x < this.Wlength; x++) {
            for (let y = 0; y < this.Wwidth; y++) {
                for (let z = 0; z < this.Wheight; z++) {
                    this.Gworld[x][y][z] += world[x][y][z];
                    if (this.Gworld[x][y][z] < 0) {
                        this.Gworld[x][y][z] = 0;
                    }
                }
            }
        }
    }
    // внесение изменений в глобальный мир


    solidClay() {
        return this.Gworld;
    }
    // выод модели не прощедщий обжик


    Mx(A, angle) {
        let B = [];
        let q = angle * (Math.PI / 180);

        B[0] = A[0];
        B[1] = A[1] * Math.cos(q) + A[2] * Math.sin(q);
        B[2] = (-1) * A[1] * Math.sin(q) + A[2] * Math.cos(q);

        return B;
    }
    // умножение Mx

    My(A, angle) {
        let B = [];
        let q = angle * (Math.PI / 180);

        B[0] = A[0] * Math.cos(q) + A[2] * Math.sin(q);
        B[1] = A[1];
        B[2] = (-1) * A[0] * Math.sin(q) + A[2] * Math.cos(q);

        return B;
    }
    // умножение My

    Mz(A, angle) {
        let B = [];
        let q = angle * (Math.PI / 180);

        B[0] = A[0] * Math.cos(q) - A[1] * Math.sin(q);
        B[1] = A[0] * Math.sin(q) + A[1] * Math.cos(q);
        B[2] = A[2];

        return B;
    }
    // умножение Mz
    // матрица поворота
}

class clayFiring {

    sandbox(length, width, height, field) {

        let world = [];
        for (let x = 0; x < length; x++) {
            world[x] = [];
            for (let y = 0; y < width; y++) {
                world[x][y] = [];
                for (let z = 0; z < height; z++) {
                    world[x][y][z] = field;
                }
            }
        }
        return world;
    }
    // создает копию пустого мира

    leather(world) {

        let localMorld = this.sandbox(world.length, world[0].length, world[0][0].length, 0);

        for (let x = 0; x < world.length; x++) {
            for (let y = 0; y < world[0].length; y++) {
                for (let z = 0; z < world[0][0].length; z++) {
                    if (world[x][y][z] == 1) {

                        let flag = 0;

                        for (let length = (x - 1); length <= (x + 1); length++) {
                            for (let width = (y - 1); width <= (y + 1); width++) {
                                for (let height = (z - 1); height <= (z + 1); height++) {

                                    if (length < 0) {
                                        length = 0
                                    }
                                    if (width < 0) {
                                        width = 0
                                    }
                                    if (height < 0) {
                                        height = 0
                                    }

                                    if (world[length][width][height] == 0) {
                                        flag = 1;
                                    }
                                }
                            }
                        }

                        if (flag) {
                            localMorld[x][y][z] = 1;
                        }

                    }
                }
            }
        }
        return localMorld;
    }
    // обжиг глины

    fileCreation(text) {
        var type = 'data:application/octet-stream;base64, ';
        var base = btoa(text);
        var res = type + base;
        document.getElementById('test').href = res;
    }
    // сохранение файлов // надо доделать
}



// let bodily = new Space(10, 10, 10, 0); // создание мира с харакеристиками поля

// bodily.denseFigure(
//     1,                                  // тип // 1 сложение // -1 вычитание
//     [[2, 2], [5, 2], [5, 5], [2, 5]],   // контур фигуры
//     3,                                  // высота выдавливания
//     [0, 0, 0],                          // углы поворота
//     [1, 0, 0]                           // растояние
// );                                  // создание модели

// bodily.denseFigure(-1, [[2, 2], [5, 2], [5, 5], [2, 5]], 2, [0, 0, 0], [2, 2, 2]); // создание модели вычитания

// let f = bodily.solidClay();
// //console.log(f);

let Firing = new clayFiring();
// let g = Firing.leather(f);
// console.log(g);


//Firing.fileCreation("ff");