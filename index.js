class Nonon { //esta clase guarda todos los datos para mandar a un json
    constructor(title, height, width, sq_values, H_values, V_values) {
        this.title = title;
        this.route = 'nono-solve';
        this.height = height;
        this.width = width;
        this.sq_values = sq_values;
        this.H_values = H_values;
        this.V_values = V_values
    }
}

var a = document.getElementById("hor").value
var b = document.getElementById("vert").value
var solve = false;
var max;
var comp;
var solve_title;
var BASTA = false;

function clearAll() { // función limpiar tabla
    document.getElementById("error").textContent = ""
    document.getElementById("nono").innerHTML = "";
    document.getElementById("marcador-top").innerHTML = "";
    document.getElementById("marcador-left").innerHTML = "";
}
function createSquares(valHor, valVert, id, val) { //funcion q arma la tabla
    let n=0; //n es el contador de cuadrados
    for(j=0;j<valVert;j++){
        let row = document.createElement("div");
        row.className = val + 'nonogrow' + j;
        row.setAttribute("id", "row");
        document.getElementById(id).appendChild(row) //creo las filas, cada una con una clase distinta.
        for(i=0;i<valHor;i++){
            let square = document.createElement("div");
            square.className = 'nonog';
            square.setAttribute("id", val + "square" + n);
            document.querySelector("." + row.className).appendChild(square) //dentro de las filas, cada cuadrado tiene un id distinto
            escuchadorEvento(square.id)
            n+=1
        }
    }
    if (solve === false) createMarkers(valHor, valVert, val, []);
}

function createMarkers(x, y, val, obj) {
    for(i=0;i<x;i++) {
        let marcadorTop = document.createElement("div");
        marcadorTop.className = 'marcTop'
        marcadorTop.setAttribute('id', val + "x_" + i);
        if(solve === true) {
            marcadorTop.innerHTML = obj.H_values[i]
            document.querySelector("#mark-top-solve").appendChild(marcadorTop)
        } else {
        marcadorTop.innerHTML = "0";
        document.querySelector("#marcador-top").appendChild(marcadorTop)
        }
    }
    for(j=0;j<y;j++) {
        let marcadorLeft = document.createElement("div");
        marcadorLeft.className = 'marcLeft'
        marcadorLeft.setAttribute('id', val + "y_" + j);
        if(solve === true) {
            marcadorLeft.innerHTML = obj.V_values[j]
            document.querySelector("#mark-left-solve").appendChild(marcadorLeft)
        } else {
            marcadorLeft.innerHTML = "0";
            document.querySelector("#marcador-left").appendChild(marcadorLeft)    
        }
    }
}
// función click cambia de color al cuadrado
function escuchadorEvento(ninio) {
        const id = "#" + ninio
        const element = document.querySelector(id);
        let onoff = false;
        element.addEventListener("click", () => {
            if(BASTA === true) {}
            else {
                if (!onoff) {
                    element.className = 'nonOn'
                    onoff = true;
                    if(solve === true) {
                        escuchadorSolve(ninio)
                    } else {
                        escuchadorMark(ninio)
                    }
                }
                else {
                    element.className = 'nonog'
                    onoff = false;
                    if(solve === true) {
                        escuchadorSolve(ninio)
                    } else {
                        escuchadorMark(ninio)
                    }
                }
            }
        })
}

function escuchadorMark(idRaw) {
    const id = parseInt(idRaw.replace("square", ""))
    var x = parseInt(document.getElementById("hor").value)
    var y = parseInt(document.getElementById("vert").value)
    var max = x*y
    let hLoc = id
    let hVer = 0
    while(hLoc>=x) {
        hVer++
        hLoc-=x
    }
    const hElement = document.querySelector('#x_'+hLoc)
    const vElement = document.querySelector('#y_'+hVer)
    let n = 0;
    let accH = [];
    let itt;
    for(let q=hLoc;q<max;q+=x) {
        if(document.querySelector('#square'+q).className === 'nonOn') {
            n+=1
            itt = true;
        } else if (document.querySelector('#square'+q).className === 'nonog') {
            if(n>0) {
                accH.push(n); 
                n=0
                itt = false;
            }
        }
    }
    if(itt === true) accH.push(n);
    hElement.innerHTML = accH.join(' ');
    if(hElement.innerHTML === '') hElement.innerHTML = '0'
    let n2=0;
    let accV = []
    let vLoc = x*hVer
    let itt2;
    for(let q=vLoc;q<vLoc+x;q++) {
        if(document.querySelector('#square'+q).className === 'nonOn') {
            n2+=1
            itt2 = true;
        } else if (document.querySelector('#square'+q).className === 'nonog') {
            if(n2>0) {
                accV.push(n2); 
                n2=0
                itt2 = false;
            }
        }
    }
    if (itt2 === true) accV.push(n2);
    vElement.innerHTML = accV.join(',');
    if(vElement.innerHTML === '') vElement.innerHTML = '0'
}

function escuchadorSolve() {
    let check;
    let correct = true;
    for(let i=0; i<max; i++) {
        document.querySelector('#solve-square'+i).className === 'nonOn'? check = 1 : check = 0;
        if(check != comp[i]) {
            correct = false; 
            break;
        }
    }
    correct === true ? ganastes() : {}
}

document.querySelector("#botonazo").onclick=function(){ //función de formulario y creacion de tabla
    a = document.getElementById("hor").value
    b = document.getElementById("vert").value
    if(a>40 || b>40) {
        document.getElementById("error").textContent = "This will not render more than 40 squares ヾ(〃^∇^)ﾉ"
    } else if(isNaN(a) || isNaN(b)) {
        document.getElementById("error").textContent = "Now try with a number (◕‿-)"
    } else if(a < 1 || b < 1) {
        document.getElementById("error").textContent = "Don't even try it ლ(╹ε╹ლ)"
    } else {
        clearAll();
        createSquares(a, b, 'nono', '');
    }
};

document.querySelector("#inputN").onclick=function(){
    //title, height, width, sq_values, H_values, V_values
    let title = document.getElementById("titleN").value
    let width = a;
    let height = b;
    let sq_values = [];
    for(let i=0;i<(a*b);i++) {
        document.querySelector('#square'+i).className === 'nonOn'? sq_values.push('1') : sq_values.push('0')
    }  
    let H_values = [];
    for(let i=0; i<a;i++){
        H_values.push(document.querySelector('#x_'+i).textContent)
    }
    let V_values = [];
    for(let i=0; i<b;i++) {
        V_values.push(document.querySelector('#y_'+i).textContent)
    }
    let n = new Nonon(title, height, width, sq_values, H_values, V_values)
    createSolvable(n);
//   const elemento = document.querySelector('.hidden-container')
//    elemento.className = 'block-container'
}


window.onload = createSquares(a, b, 'nono', '')
// esto permite que se arme el grid default en cuanto se abre la pag

function createSolvable (nono) {
    const elemento = document.querySelector('.hidden-container')
    elemento.className = 'block-container'
    solve = true;
    max = parseInt(nono.width)* parseInt(nono.height);
    comp = nono.sq_values
    solve_title = nono.title
    createSquares(parseInt(nono.width), parseInt(nono.height), nono.route, 'solve-')
    createMarkers(parseInt(nono.width), parseInt(nono.height), 'solve-', nono)
}

function unbindClick() {
    for(let i = 0; i<max; i++) {
        let element = document.querySelector('#solve-square'+i)
        element.removeEventListener('onclick',);
    }
}

function ganastes() {
    BASTA = true;
    document.querySelector('.hidden-title').textContent = solve_title
    document.querySelector('.hidden-title').id = 'title-solve'
}