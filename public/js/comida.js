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

const database = JSON.parse(localStorage.getItem('database'))

const menu_icon = document.querySelector('#comida .menu-icons')
menu_icon.style.background = '#74e8b7'

const perfil = document.querySelector("#perfil .menu-icons")
perfil.addEventListener('click', ()=>{
    window.location.assign(`../view/perfil.html`)
})
const rotina = document.querySelector("#rotina .menu-icons")
rotina.addEventListener('click', ()=>{
    window.location.assign(`../view/agendaSemanal.html`)
})
const vacina = document.querySelector("#vacina .menu-icons")
vacina.addEventListener('click', ()=>{
    window.location.assign(`../view/vacinas.html`)
})
const calendario = document.querySelector("#calendario .menu-icons")
calendario.addEventListener('click', ()=>{
    window.location.assign(`../view/calendario.html`)
})