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

var animaceKostka = null;
var hodnota = null;
var animaceStart = false;
var zapnuto = true;

function zapnoutAnimaci() {
    if (animaceKostka == null && zapnuto) {
        animaceStart = true;
        zapnuto = false;
        setTimeout(function() {
            animaceKostka = setInterval(function () {
            hodnota = Math.ceil(Math.random() * 6)
            document.getElementById('cube').src = 'img/kostka' + hodnota + '.png';}, 50);
        },2000) 
        document.getElementById('game').innerHTML = 'Stop';
    
    }
    else if (animaceKostka != null) {
        clearInterval(animaceKostka);
        animaceKostka = null;
        hod(hodnota)
        document.getElementById('game').innerHTML = 'Zapnout';
        animaceStartImgs = []; 
        zapnuto = true;
    }
    else {
        
    }
}

var animaceStartImgs = []
var odsazeni = {x:0,y:0}

setInterval(function() {
    c.fillStyle = "white"
    c.fillRect(0,0,canvas.width,canvas.height)
    if (animaceStart) {
        for (var l = 0; l < 6; l++) {
            
                if (l % 2 == 0 && l != 0) {
                    odsazeni.x++;
                    odsazeni.x = 0;
                }
                animaceStartImgs.push(new Obrazek(0 + 100 * odsazeni.x, 0 + 100 * odsazeni.y, l + 1, l * 50));
                odsazeni.x++;
            
            
        }
        animaceStart = false;
        odsazeni.x = 0;
        odsazeni.y = 0;
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
        this.w = 90;
        this.h = 90;
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
            c.globalAlpha = this.a;
            c.drawImage(this.image,this.x,this.y,this.w,this.h);
            c.globalAlpha = 1;
            if (this.a > 0) {
                this.a -= 0.02;
            }
            if (this.a <= 0) {
                this.a = 0;
            }
            
        
    }
}