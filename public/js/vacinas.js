
const active = (document.querySelector('#vacina')).querySelector('.active')
const menu_icon = (document.querySelector('#vacina')).querySelector('.menu-icons')
menu_icon.style.background = 'rgb(167, 167, 167)'
const url = 'https://api.github.com/repos/ICEI-PUC-Minas-PPLES-TI/plf-es-2023-1-ti1-0385200-08-organiza-pets/contents/codigo/models/database.json'
const request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.send();
request.onload = function() {
    var db = JSON.parse(request.response);
    getVacinas(db);
}

// fetch('http://127.0.0.1:5500/models/database.json')
//   .then(response => response.json())
//   .then(data => {
//     getVacinas(data)
// });

function getVacinas(db){
    const divVacinas = document.querySelector("#vacinas")
    const pets = db.user[0].pets
    pets.forEach(value => {
        divVacinas.innerHTML+= `<div class="tituloTabela">
            <div class="lateralEsquerdo">
                <div class="divFotoPet">
                    <img src="${value.path}" alt="${value.tipo}" class="fotoPet">
                </div>
                <h1>${value.nome}</h1>
            </div>
            <div>
                <img src="../public/img/adicionar.svg" alt="adicionar" class="adicionar">
            </div>
        </div>
        <div class="tabela" id="tabela${value.id}">
            <div class="dataTabela" id="dataTabela${value.id}">
                <div class="tamanhoElementoTitulo">
                    <h3>Data</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
            <div class="nomeTabela" id="nomeTabela${value.id}">
                <div class="tamanhoElementoTitulo">
                    <h3>Nome</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
            <div class="doseTabela" id="doseTabela${value.id}">
                <div class="tamanhoElementoTitulo">
                    <h3>Dose</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
            <div class="repetirTabela" id="repetirTabela${value.id}">
                <div class="tamanhoElementoTitulo" id="tamanhoRepetirTitulo">
                    <h3 id="first">Repetir</h3>
                    <h3 id="second">em</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
        </div>`
        const dataTabela = document.querySelector(`#dataTabela${value.id}`)
        const nomeTabela = document.querySelector(`#nomeTabela${value.id}`)
        const doseTabela = document.querySelector(`#doseTabela${value.id}`)
        const repetirTabela = document.querySelector(`#repetirTabela${value.id}`)
        value.vacinas.forEach((element) =>{
            dataTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.data}</p>
            </div>
            <div class="borda"></div>`
            nomeTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.nome}</p>
            </div>
            <div class="borda"></div>`
            doseTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.dose}</p>
            </div>
            <div class="borda"></div>`
            repetirTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.repetir}</p>
            </div>
            <div class="borda"></div>`
        })
        const p = document.querySelectorAll('p')
        quebraLinha(p)
    });
}

function quebraLinha(p){
    if (window.innerWidth <= 1132) {
        p.forEach((value)=>{
            const textoQuebrado = value.textContent .split('/');
            value.textContent  = textoQuebrado.join('/\n');
        })
    }
}

setInterval(()=>{
    if (window.innerWidth <= 760) {
        active.style.display = 'none'
    }else{
        active.style.display = 'flex'
    }
}, 10)
