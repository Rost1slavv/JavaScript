// Завдання 1.2.3, Object

let car1 = new Object();
car1.color = "Gray";
car1.maxSpeed = 120;
car1.driver = new Object();
car1.driver.name = "Rostyslav Bashchuck";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;

// Завдання 1.2.4, Літерал

let car2 =
{
    color: "White",
    maxSpeed: 220,
    driver: 
    {
        name: "Rostyslav Bashchuck",
        category: "B",
        "personal limitations": null,
    },

    tuning: false,
    "number of accidents": 2,

    drive: function()
    {
        console.log("I can drive anytime");
    }
}

// Завдання 1.2.5, додавання метода drive до об'єкта car1

car1.drive = function()
{
    console.log("I am not driving at night");
}

// Завдання 1.2.6, додавання метода drive до об'єкта car2

car2.drive = function()
{
    console.log("I can drive anytime");
}

car1.drive();
car2.drive();

// Завдання 1.2.7, створення конструктора для класу Truck

function Truck(color, weight, avgSpeed, brand, model)
{
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

// Завдання 1.2.9, створення методу trip

    this.trip = function ()
    {
        if(this.driver == undefined){
            console.log("No driver assigned");
        }
        else
        {
            console.log(`Driver ${this.driver.name}`);
            if(this.driver.nightDriving == true)
            {
                console.log("drives at night");
            }
            else 
            {
                console.log("does not drive at night");
            }
            console.log(`and has ${this.driver.experience} years of experience`);
        }
    }
}

// Завдання 1.2.8, створення статичного методу AssignDriver

Truck.prototype.AssignDriver = function(name, nightDriving, experience)
{
    this.driver = 
    {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    }
}

// Завдання 1.2.10, створення 2 об'єктів класу Truck, та демонстрація роботи методу trip

let truck1 = new Truck("purple", 2000, 90, "MAN", "TGS");
truck1.AssignDriver("Dmytro", true, 1);
let truck2 = new Truck("pink", 11000, 90, "DAF", "XF");
truck2.AssignDriver("Rostyslav", false, 18);

truck1.trip();
truck2.trip();

// Завдання 1.2.12, створення класу Square

class Square 
{
    a = 0;

// Завдання 1.2.13, визначення конструктора класу Square 

    constructor(a)
    {
        this.a = a;
    }

// Завдання 1.2.14, визначення статичного методу help

    static help = function()
    {
        console.log("A square is a quadrilateral with all sides equal and all angles right.");
    }

// Завдання 1.2.15, визначення методів: length, square і info

    length()
    {
        return 4 * this.a;
    }

    square()
    {
        return this.a ** 2;
    }

    info(){
        console.log(this.a);
        console.log("Every angle is 90 degrees");
        console.log(this.length());
        console.log(this.square());
    }
}

// Завдання 1.2.16, створення класу Rectangle 

class Rectangle extends Square 
{
    b = 0;

// Завдання 1.2.17, перевизначення методів: constructor, help і так далі...

    constructor(a, b)
    {
        super(a);
        this.b = b;
    }

    static help = function()
    {
        console.log("A rectangle is a flat geometric figure, a quadrilateral with all angles right.");
    }

    length()
    {
        return 2 * (this.a + this.b);
    }

    square()
    {
        return this.a * this.b;
    }

    info()
    {
        console.log(this.a, this.b);
        console.log("Every angle is 90 degrees");
        console.log(this.length());
        console.log(this.square());
    }

// Завдання 1.2.22, визначення ґеттерів і сеттерів

    set a(value)
    {
        if(value > 0){
            this._a = value;
        }
        else
        {
            console.log("Wrong value!");
        }
    }

    get a()
    {
        return super.a;
    }

    set b(value)
    {
        if(value > 0){
            this._b = value;
        }
        else{
            console.log("Wrong value!");
        }
    }

    get b()
    {
        return this.b;
    }
}

// Завдання 1.2.18, створення класу Rhombus

class Rhombus extends Square
 {
    alpha = 0;
    beta = 0;

// Завдання 1.2.19, перевизначення методів: constructor, help і так далі...

    constructor(a, alpha, beta)
    {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help = function()
    {
        console.log("A rhombus is a parallelogram with all sides equal. A rhombus whose sides form a right angle is called a square. The diagonals of a rhombus intersect at right angles. The diagonals of a rhombus are the bisectors of its angles.");
    }

    length()
    {
        return 4 * this.a;
    }

    square()
    {
        return this.a ** 2 * Math.sin((this.beta * (Math.PI / 180)));
    }

    info()
    {
        console.log(this.a);
        console.log(this.alpha, this.beta);
        console.log(this.length());
        console.log(this.square());
    }
}

// Завдання 1.2.20, створення класу Parallelogram шляхом успадкування від класу Rhombus
class Parallelogram extends Rhombus {
    b = 0;

// 1.2.21 перевизначення методів: constructor, help і так далі...

    constructor(a, b, alpha, beta)
    {
        super(a, alpha, beta);
        this.b = b;
    }

    static help = function()
    {
        console.log("A parallelogram is a quadrilateral whose opposite sides are parallel in pairs, i.e., lie on parallel lines.");
    }

    length()
    {
        return 2 * (this.a + this.b);
    }

    square()
    {
        return this.a * this.b * Math.sin(this.beta * (Math.PI / 180));
    }

    info()
    {
        console.log(this.a, this.b);
        console.log(this.alpha, this.beta);;
        console.log(this.length());
        console.log(this.square());
    }
}

// Завдання 1.2.23, виклик статичного методу help для кожного з класів фігур

console.log("___________________________________");
console.log("Information about geometric shapes:");
Square.help();
Rectangle.help();  
Rhombus.help();
Parallelogram.help();

// Завдання 1.2.24, створення по одному об'єкту класів геометричних фігур

sq = new Square(4);
sq.info();

re = new Rectangle(5, 10);
re.info();

rh = new Rhombus(6, 120, 60);
rh.info();

pl = new Parallelogram(6, 12, 110, 70);
pl.info();

// Завдання 1.2.25, створення функції Triangular

function Triangular(a=3 ,b=4, c=5)
{
    return {a, b, c};
}

// Завдання 1.2.26, виведення в консоль трьох об'єктів 

object1 = {a:0, b:0, c:0};
object2 = {a:0, b:0, c:0};
object3 = {a:0, b:0, c:0};

object1 = Triangular();
console.log(object1);
object2 = Triangular(3, 4, 5);
console.log(object2);
object3 = Triangular(11, 8, 16);
console.log(object3);

// Завдання 1.2.27, створення функції PiMultiplier

function PiMultiplier(x)
{
    function Pi(x1)
    {
        return x1 * x;
    }
   return Pi;
}

// Завдання 1.2.28, створення трьох функцій за допомогою функції PiMultiplier

let pi1 = PiMultiplier(Math.PI);
console.log(pi1(2));

let pi2 = PiMultiplier(Math.PI);
console.log(pi2(2/3));

let pi3 = PiMultiplier(Math.PI);
console.log(pi3(0.5));

// Завдання 1.2.29, створення функції Painter 

function Painter(color)
{
    let Output = function(Object)
    {
        if(Object.type == undefined)
        {
            console.log("No ‘type’ property occurred!")
        }
        else console.log(`Object type is ${Object.type} and color is ${color}`);
    }
    return Output;
}

// Завдання 1.2.30, створення функцій: PaintBlue, PaintRed та PaintYellow

let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");

// Завдання 1.2.31, демонстрація роботи функцій 

object1 = {maxSpeed: 280, type: "Sportcar", color : "magenta"}
object2 = {type: "Truck", ["avg speed"]: 90, ["load capacity"]: 2400}
object3 = {maxSpeed: 180, color: "purple", isCar: true}

PaintBlue(object1);
PaintRed(object2);
PaintYellow(object3);