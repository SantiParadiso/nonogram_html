// FALTA EL BOTON DE "CLEAR"

// TAMBIEN VOY A GUARDAR EL PROGRESO DEL USUARIO EN EL LOCAL STORAGE,
// ASI PUEDE VOLVER A METERSE LAS VECES QUE QUIERA DESPUES DE TERMINAR SU DIBUJO.

// NECESITA UN ESPACIO DONDE PUEDA COPIAR EL LINK (CAPAZ CON UN BOTÓN) DESPUES
// DE APRETAR OTRO BOTON DE "DONE!"


class Nonon { 
    //esta clase guarda todos los datos para mandar a un json

    // ESTO ESTABA PENSADO PARA MANDAR POR API, PERO AHORA VOY A RECOLECTAR (POR AHORA) 3 DATOS
    // UN NUMERO BINARIO QUE CONTENGA TODOS LOS VALORES EN EL TABLERO, QUE VOY A PASAR A DECIMAL O HEXADECIMAL.
    // LOS OTROS DOS VALORES: ANCHO Y ALTO DEL TABLERO.

    constructor(title, height, width, sq_values, H_values, V_values) {
        this.title = title;
        this.height = height;
        this.width = width;
        this.sq_values = sq_values;
        this.H_values = H_values;
        this.V_values = V_values
    }
}

let a = document.getElementById("hor").value
let b = document.getElementById("vert").value
let solve = false;
let max;
let comp;
let solve_title;
let BASTA = false;
let editor_mode = "off";

function clearAll() { // función limpiar tabla
    document.getElementById("error").textContent = ""
    document.getElementById("nono").innerHTML = "";
}

function createSquares(valHor, valVert, id, val) { //funcion q arma la tabla
    let n=0; //n es el contador de cuadrados
    boardEventListener(id)
    for(j=0;j<valVert;j++){
        let row = document.createElement("div");
        row.className = val + 'nonogrow' + j;
        row.setAttribute("id", "row");
        document.getElementById(id).appendChild(row) //creo las filas, cada una con una clase distinta.
        for(i=0;i<valHor;i++){
            let square = document.createElement("div");
            square.className = 'square_off';
            square.setAttribute("id", val + "square" + n);
            document.querySelector("." + row.className).appendChild(square) //dentro de las filas, cada cuadrado tiene un id distinto
            squareEventListener(square.id)
            n+=1
        }
    }
}


// función click cambia de color al cuadrado

// REEMPLAZAR ONCLICK POR FUNCIÓN QUE CUANDO UNO MANTENGA EL MOUSE APRETADO SOBRE EL CANVAS
// PASE A SER MODO "EDICIÓN" Y DEPENDE DEL CUADRADO DONDE ESTÉ EL MOUSE DIBUJE O BORRE.

function editingMode(toggle, child) {
    if(toggle == 'draw')
    {
        console.log(toggle)
        editor_mode = toggle;
    } 
    else if(toggle == "erase")
    {
        console.log(toggle)
        editor_mode = toggle;
    }
    else if(toggle == "off")
    {
        console.log(toggle)
        editor_mode = toggle;
    }
}

function squareEventListener(child) {
        const element = document.querySelector("#" + child);
        element.addEventListener("mousedown", () => {
                if (element.className == 'square_on') 
                {
                    element.className = "square_off";
                    editingMode("erase", child)
                }
                else 
                {
                    element.className = "square_on";
                    editingMode("draw", child)
                }});

        element.addEventListener("mouseup", () => {
            editingMode("off")
        })

        element.addEventListener("mouseenter", () => {
            if(editor_mode == "draw"){
                element.className = "square_on";
            } else if (editor_mode == "erase"){
                element.className = "square_off";
            }
        })
    }

function boardEventListener(id)
{
    const element = document.querySelector("#" + id);
    element.addEventListener("mouseleave", () =>{
        if(editor_mode != "off")
        editingMode("off")
    })
}

function escuchadorSolve() 
{
    let check;
    let correct = true;
    for(let i=0; i<max; i++) {
        document.querySelector('#solve-square'+i).className === 'square_on'? check = 1 : check = 0;
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
    } else if(a < 5 || b < 5) {
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
        document.querySelector('#square'+i).className === 'square_on'? sq_values.push('1') : sq_values.push('0')
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