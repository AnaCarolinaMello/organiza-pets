setTimeout(()=>{
    let loader = document.querySelector('#divLoader');
    let content = document.querySelector('section');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');
    loader.style.display = 'none'
    content.style.display = 'flex'
    header.style.display = 'flex'
    aside.style.display = 'flex'
}, 1800);

const menu_icon = (document.querySelector('#vacina')).querySelector('.menu-icons')
menu_icon.style.background = '#74e8b7'
const database = JSON.parse(localStorage.getItem('database'))
getVacinas(database)

const perfil = document.querySelector("#perfil .menu-icons")
perfil.addEventListener('click', ()=>{
    window.location.assign(`../view/perfil.html`)
})
const rotina = document.querySelector("#rotina .menu-icons")
rotina.addEventListener('click', ()=>{
    window.location.assign(`../view/agendaSemanal.html`)
})
const calendario = document.querySelector("#calendario .menu-icons")
calendario.addEventListener('click', ()=>{
    window.location.assign(`../view/calendario.html`)
})
const comida = document.querySelector("#comida .menu-icons")
comida.addEventListener('click', ()=>{
    window.location.assign(`../view/comida.html`)
})

function getVacinas(db) {
  const divVacinas = document.querySelector("#vacinas");
  const pets = db.user[0].pets;
  pets.forEach((value) => {
    divVacinas.innerHTML += `<div class="tituloTabela">
            <div class="lateralEsquerdo">
                <div class="divFotoPet">
                    <img src="${value.path}" alt="${value.tipo}" class="fotoPet">
                </div>
                <h1>${value.nome}</h1>
            </div>
            <div>
                <img src="../public/img/adicionar.svg" alt="adicionar" class="adicionar" id="adicionar${value.id}">
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
        </div>`;
    const dataTabela = document.querySelector(`#dataTabela${value.id}`);
    const nomeTabela = document.querySelector(`#nomeTabela${value.id}`);
    const doseTabela = document.querySelector(`#doseTabela${value.id}`);
    const repetirTabela = document.querySelector(`#repetirTabela${value.id}`);
    value.vacinas.forEach((element) => {
      dataTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.data}</p>
            </div>
            <div class="borda"></div>`;
      nomeTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.nome}</p>
            </div>
            <div class="borda"></div>`;
      doseTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.dose}</p>
            </div>
            <div class="borda"></div>`;
      repetirTabela.innerHTML += `
            <div class="tamanhoElemento">
                <p>${element.repetir}</p>
            </div>
            <div class="borda"></div>`;
    });
    const p = document.querySelectorAll("p");
    quebraLinha(p);
  });
  addClicks(pets)
}

function quebraLinha(p) {
  if (window.innerWidth <= 1132) {
    p.forEach((value) => {
      const textoQuebrado = value.textContent.split("/");
      value.textContent = textoQuebrado.join("/\n");
    });
  }
}

function addClicks(pets){
    let adicionar
    pets.forEach((value)=>{
        adicionar = document.querySelector(`#adicionar${value.id}`)
        adicionar.addEventListener('click', ()=>{
            window.location.assign(`../view/cadastrovacina.html?petId=${value.id}`)
        })
    })
}

const mediaQueryList = window.matchMedia('(max-width: 1132px)');
mediaQueryList.addListener(function (mediaQueryList) {
    if (mediaQueryList.matches) {
        const p = document.querySelectorAll("p");
        quebraLinha(p)
    }
});
