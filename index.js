function clearAll() { // función limpiar tabla
    document.getElementById("error").textContent = ""
    document.getElementById("nono").innerHTML = "";
    document.getElementById("marcador-top").innerHTML = "";
    document.getElementById("marcador-left").innerHTML = "";
}
function createSquares(valHor, valVert) { //funcion q arma la tabla
    let n=0; //n es el contador de cuadrados
    for(j=0;j<valVert;j++){
        let row = document.createElement("div");
        row.className = 'nonogrow' + j;
        row.setAttribute("id", "row");
        document.getElementById("nono").appendChild(row) //creo las filas, cada una con una clase distinta.
        for(i=0;i<valHor;i++){
            let square = document.createElement("div");
            square.className = 'nonog';
            square.setAttribute("id", "square" + n);
            document.querySelector('.nonogrow' + j).appendChild(square) //dentro de las filas, cada cuadrado tiene un id distinto
            escuchadorEvento(square.id)
            n+=1
        }
    }
    createMarkers(valHor, valVert);
}
function createMarkers(x, y) {
    for(i=0;i<x;i++) {
        let marcadorTop = document.createElement("div");
        marcadorTop.className = 'marcTop'
        marcadorTop.setAttribute('id', "x_" + i);
        marcadorTop.innerHTML = "0";
        document.querySelector("#marcador-top").appendChild(marcadorTop)
    }
    for(j=0;j<y;j++) {
        let marcadorLeft = document.createElement("div");
        marcadorLeft.className = 'marcLeft'
        marcadorLeft.setAttribute('id', "y_" + j);
        marcadorLeft.innerHTML = "0";
        document.querySelector("#marcador-left").appendChild(marcadorLeft)

    }
}
// función click cambia de color al cuadrado
function escuchadorEvento(ninio) {
    const id = "#" + ninio
    const element = document.querySelector(id);
    let onoff = false;
    element.addEventListener("click", () => {
        if (!onoff) {
            element.className = 'nonOn'
            onoff = true;
            escuchadorMark(ninio)
        }
        else {
            element.className = 'nonog'
            onoff = false;
            escuchadorMark(ninio)
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

document.querySelector("#botonazo").onclick=function(){ //función de formulario y creacion de tabla
    var valHor = document.getElementById("hor").value
    var valVert = document.getElementById("vert").value
    if(valHor>40 || valVert>40) {
        document.getElementById("error").textContent = "This will not render more than 40 squares ヾ(〃^∇^)ﾉ"
    } else if(isNaN(valHor) || isNaN(valVert)) {
        document.getElementById("error").textContent = "Now try with a number (◕‿-)"
    } else if(valHor < 1 || valVert < 1) {
        document.getElementById("error").textContent = "Don't even try it ლ(╹ε╹ლ)"
    } else {
        clearAll();
        createSquares(valHor, valVert);
    }
};

window.onload = createSquares(a = document.getElementById("hor").value, b = document.getElementById("vert").value)
// esto permite que se arme el grid default en cuanto se abre la pag