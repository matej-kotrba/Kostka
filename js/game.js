const canvas = document.getElementById('canvas');
const c = canvas.getContext("2d")

var hody = [];

document.getElementById('game').addEventListener('click',
    function () {
        //hod();
        zapnoutAnimaci();
        console.log(hody);
    }
);

function suma(cisla) {
    var sum = 0;
    cisla.forEach(function (value, index) {
        sum += value;
    })
    return sum;
}

function maximum(cisla) {
    var max = 1;
    cisla.forEach(function (value, index) {
        if (value > max) max = value;
    })
    return max;
}

function minimum(cisla) {
    var min = 6;
    cisla.forEach(function (value, index) {
        if (value < min) min = value;
    })
    return min;
}

function average(sum, count) {
    return (sum / count).toFixed(2);
}

function hod(h) {
    hody.push(h);
    document.getElementById('cube').src = 'img/kostka' + h + '.png';
    document.getElementById('result').innerHTML = '<p>Hod: ' + h + '</p>';
    document.getElementById('result').innerHTML +=
        '<p>Počet hodů: ' + hody.length + '</p>';
    document.getElementById('result').innerHTML +=
        '<p>Součet hodů: ' + suma(hody) + '</p>';
    document.getElementById('result').innerHTML +=
        '<p>Průměr hodů: ' + average(suma(hody), hody.length) + '</p>';
    document.getElementById('result').innerHTML +=
        '<p>Nejvyšší hod: ' + maximum(hody) + '</p>';
    document.getElementById('result').innerHTML +=
        '<p>Nejmenší hod: ' + minimum(hody) + '</p>';
}

var prubeh = false;
var animaceKostka = null;
var hodnota = null;
var animaceStart = false

function zapnoutAnimaci() {
    if (animaceKostka == null) {
    animaceKostka = setInterval(function () {
        hodnota = Math.ceil(Math.random() * 6)
        document.getElementById('cube').src = 'img/kostka' + hodnota + '.png';
    }, 50);
    document.getElementById('game').innerHTML = 'Stop';
    animaceStart = true;
    }
    else if (animaceKostka != null) {
        clearInterval(animaceKostka);
        animaceKostka = null;
        hod(hodnota)
        document.getElementById('game').innerHTML = 'Zapnout';
    }
    else {
        
    }
}

var animaceStartImgs = []
var odsazeniY = 0
var odsazeniX = 0

setInterval(function() {
    c.fillStyle = "red"
    c.fillRect(0,0,canvas.width,canvas.height)
    if (animaceStart) {
        for (var l = 0; l < 6; l++) {
            
                if (l % 2 == 0 && l != 0) {
                    odsazeniY++;
                    odsazeniX = 0;
                }
                animaceStartImgs.push(new Obrazek(0 + 100 * odsazeniX, 0 + 100 * odsazeniY, l + 1, l * 50));
                odsazeniX++;
            
            
        }
        animaceStart = false;
        odsazeniX = 0;
        odsazeniY = 0;
    }
    for (var k in animaceStartImgs) {
        if(animaceStartImgs[k].pripraven) {
            animaceStartImgs[k].render()
        }

    }
},5)

class Obrazek {
    constructor(x,y,image, prodleva) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.image = new Image()
        this.image.src = "./img/kostka" + image + ".png"; 
        this.a = 1;
        this.zobrazeni = prodleva * 5;
        this.pripraven = false;
        setTimeout(() => {
            this.pripraven = true;
        },this.zobrazeni)
    }
    render() {
        
            c.drawImage(this.image,this.x,this.y,this.w,this.h);
            c.globalAlpha = 1;
        
        
    }
}