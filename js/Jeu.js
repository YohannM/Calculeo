var resultat;
var objectif;
var nbCoup;
var nbCoupRestant;
var resultatInit;
var tableau = [];
var mirror = false;
var shift = false;
var sum = false;
var changeSigne = false;
var instances;
var Reverse = false;
var Puiss = false;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    instances = M.Modal.init(elems, null);
  });

function init()
{
    resultat = getRandomInt(25);
    resultatInit = resultat;
    document.getElementById('resultat').innerHTML = resultat;
    var nbButton = getRandomInt(6) + 3;
    for (var i = 1; i <= nbButton; i++)
    {
        initButton(document.getElementById('button' + i));
    }
    var button;
    for (var j = i; j < 9; j++)
    {
        console.log(j);
        button = document.getElementById('button' + j);
        button.style.backgroundColor = "#000000";
        button.innerHTML = "";
        button.onclick = function(){};
    }
    nbCoup = nbButton + getRandomInt(4);
    nbCoupRestant = nbCoup;
    generateObjectif(nbCoup, nbButton);
}

function generateObjectif(nbCoup, nbButton)
{
    var nbValidate = 0;
    var nbBad = 0;
    var lastObjectif;
    var push;
    var ArrayValidate = [];
    objectif = resultat;
    for(var i = 0; i < nbCoup; i++)
    {
        push = false;
        lastObjectif = objectif;
        if ((nbButton - ArrayValidate.length) == (nbCoup - i))
        {
            buttonId = getFalse(ArrayValidate, nbButton);
            objectif = tableau[buttonId].operation(objectif);
            ArrayValidate.push(buttonId);
            push = true;
        }
        else
        {
            buttonId = getButtonId(nbButton);
            objectif = tableau[buttonId].operation(objectif);
            if (ArrayValidate.indexOf(buttonId) == -1)
            {
                ArrayValidate.push(buttonId);
                push = true;
            }
        }
        if (!estValide(objectif))
        {
            if (nbBad == 3)
            {
                console.log('Reset : ' + objectif);
                init();
                return false;
            }
            objectif = lastObjectif;
            i--;
            if (push)
            {
                ArrayValidate.pop();
            }
            nbBad++;
        }
        else
        {
            console.log(buttonId);
            nbBad = 0;
        }
    }
    if(objectif == resultat || objectif.toString().length > 6 || objectif == 0)
    {
        console.log('Reset : ' + objectif);
        init();
    }
    else
    {
        document.getElementById('Objectif').innerHTML += objectif;
        document.getElementById('nbCoup').innerHTML += nbCoup;
    }
    
}
function estGood(resultat)
{
    if (resultat.toString().indexOf('.') != resultat.toString().lastIndexOf('.'))
    {
        return false;
    }
    if (resultat.toString().indexOf('-') != resultat.toString().lastIndexOf('-'))
    {
        return false;
    }
    return true;
}

function getButtonId(nbButton)
{
    return 'button' + (getRandomInt(nbButton) + 1);
}

function getFalse(array, nbButton)
{
    var listFalse = [];
    for (var i = 1; i <= nbButton; i++)
    {
        if (array.indexOf('button' + i) == -1)
        {
            listFalse.push('button' + i);
        }
    }
    return listFalse[getRandomInt(listFalse.length)];
}

function affichage(resultat)
{
    if (resultat == objectif)
    {
        document.getElementById('resultat').innerHTML = 'Gagné';
        instances[0].open();
    }
    else if (nbCoupRestant == 0)
    {
        document.getElementById('resultat').innerHTML = 'Perdu';
    }
    else
    {
        if(!estValide(resultat))
        {
            document.getElementById('resultat').innerHTML = "ERROR";
        }
        else
        {
            document.getElementById('resultat').innerHTML = resultat;
        }
    }
    
}

function estValide(nombre)
{
    return nombre == Number(nombre) && (nombre.toString().split('.')[1] || []).length < 3; 
}

function initButton(button)
{
    switch(getRandomInt(7))
    {
        case 0:
            if (mirror)
            {
                initButton(button);
                break;
            }
            else
            {
                tableau[button.id] = new Mirror();
                button.innerHTML = '<p class="flow-text">MIRROR</p>';
                // purple
                button.style.backgroundColor = "#9c27b0;";
                mirror = true;
                break;
            }
        case 1:
            number = getRandomInt(25) + 1;
            operateur = getRandomOperateur(number);
            tableau[button.id] = new Operation(operateur, number);
            button.innerHTML = '<p class="flow-text">' + operateur + number + '</p>';
            // blue-grey
            button.style.backgroundColor = "#607d8b";
            break;
        case 2:
            if (shift)
            {
                initButton(button);
            }
            else
            {
                tableau[button.id] = new Shift();
                button.innerHTML = '<p class="flow-text">SHIFT</p>';
                // teal
                button.style.backgroundColor = "#009688";
                shift = true;
            }
            break;
        case 3:
            if (sum)
            {
                initButton(button);
            }
            else
            {
                tableau[button.id] = new Summ();
                button.innerHTML = '<p class="flow-text">SUM</p>';
                //yellow darken-2
                button.style.backgroundColor = "#fbc02d";
                sum = true;
            }
            break;
        case 4:
            if (changeSigne)
            {
                initButton(button);
            }
            else
            {
                tableau[button.id] = new ChangeSign();
                button.innerHTML = '<p class="flow-text">+/-</p>';
                // pink
                button.style.backgroundColor = "#e91e63";
                changeSigne = true;
            }
            break;
        case 5:
            if (Reverse)
            {
                initButton(button);
            }
            else
            {
                tableau[button.id] = new Revers();
                button.innerHTML = '<p class="flow-text">REVERSE</p>';
                // indigo
                button.style.backgroundColor = "#3f51b5";
                Reverse = true;
            }
            break;
        case 6:
            if (Puiss)
            {
                initButton(button);
            }
            else
            {
                var puiss = getRandomInt(2) + 2;
                tableau[button.id] = new Poww(puiss);
                button.innerHTML = '<p class="flow-text">^' + puiss + '</p>';
                // cyan
                button.style.backgroundColor = "#00bcd4";
                Puiss = true;
            }
            
            break;
         
    }
    button.onclick = function() {
        if (nbCoupRestant != 0)
        {
            resultat = tableau[button.id].operation(resultat);
            nbCoupRestant--;
            document.getElementById('nbCoup').innerHTML = 'Nombre de coup : ' + nbCoupRestant;
            affichage(resultat);
        }
    };
}

function getRandomOperateur(number)
{
    switch(getRandomInt(5))
    {
        case 0:
            return "+";
        case 1: 
            return "-";
        case 2:
            if (number == 1)
            {
                return getRandomOperateur(number);
            }
            return "/";
        case 3:
            return "*";
        case 4:
            if(number == 1)
                {
                    return getRandomOperateur(number);
                }
            return '%';
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getNbFalse(array)
{
    nbFalse = 0;
    array.forEach(function(element)
    {
        if (!element)
        {
            nbFalse++;
        }
    });
    return nbFalse;
}
document.getElementById('reset').onclick = function() {
    resultat = resultatInit;
    nbCoupRestant = nbCoup;
    affichage(resultatInit);
    document.getElementById('nbCoup').innerHTML = 'Nombre de coup : ' + nbCoup;
};

document.getElementById('newGame').onclick = function()
{
    document.location.reload();
}
init();