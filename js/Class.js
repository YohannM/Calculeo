

function Operation(operateur, nombre) {
    this.operateur = operateur;
    this.nombre = nombre;
    this.operation = function(resultat) {
        return eval(resultat + ' ' + operateur + ' ' + nombre)
    }
}

function Shift(){
    this.operation = function(resultat) {
        return resultat.toString().substr(0, resultat.toString().length - 1) == '' ? 0 : 
                resultat.toString().substr(0, resultat.toString().length - 1);
    }
}

function AddDigit(nombre){
    this.nombre = nombre;
    this.operation = function(resultat) {
        return String(resultat) + String(nombre);
    }
}

function Store(){
    this.valeur = '';
    this.operation = function(resultat, gotToStore) {
        if(gotToStore) this.valeur = resultat;
        return gotToStore ? resultat : String(resultat) + String(this.valeur);
    }
}

function Mirror()
{
    this.operation = function(resultat) {
            var res = resultat.toString();
            var retour = "";
            for(var i = res.length - 1; i >= 0; i--)
                retour += res.substr(i,1);
            return resultat + retour;
    };
}

function ChangeSign()
{
    this.operation = function(resultat) {
        return -1 * resultat;
    };
}

function Summ()
{
    this.operation = function(resultat) {
        var res = resultat.toString();
        var somme = 0;
        for(var i = res.length - 1; i >= 0; i--)
            somme += res.substr(i,1) == '-' || res.substr(i,1) == '.' ? 0 : Number(res.substr(i,1));
        return somme;
    }
}

function Switch(nb1, nb2)
{
    this.nb1 = nb1.toString();
    this.nb2 = nb2.toString();
    this.operation = function(resultat) {
        return resultat.toString().split(this.nb1).join(this.nb2);
    }
}

function Revers()
{
    this.operation = function(resultat) {
        var res = resultat.toString();
        var retour = res.substr(0,1) == '-' ? '-' : '';
        for(var i = res.length - 1; i >= 0; i--)
            retour += res.substr(i,1) == '-' ? '' : res.substr(i,1);
        return retour;
    }
}


function Poww(puiss)
{
    this.puiss = puiss;
    this.operation = function(resultat) {
        return Math.pow(resultat, this.puiss);
    }
}

/*var seb = new Poww(2);
var test = seb.operation(3);
console.log(test);*/



