setTimeout(() => {
    let loader = document.querySelector("#divLoader");
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let footer = document.querySelector("footer");
    loader.style.display = "none";
    header.style.display = "flex";
    main.style.display = "flex";
    footer.style.display = "flex";
}, 1800);
if(!localStorage.getItem('database')){
    const database = {
        newId: 0,
        users: []
    }
    localStorage.setItem('database', JSON.stringify(database))
}
const home = document.querySelector("#home")
const novidades = document.querySelector("#novidades")
const about = document.querySelector("#about")
const contato = document.querySelector("#contato")
const underline = document.querySelector("#underlineActive")
const underlineOutside = document.querySelector("#underline")
let leftOffset = 10
let width = 100
underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'

home.addEventListener('click', (event)=>{
    let width = event.target.offsetWidth
    if(novidades.classList[0] == 'activeTarefa'){
        novidades.classList.remove('activeTarefa')
        underline.style.transform = 'translateX(' + -30 + 'px) scaleX(' + (width / 150 ) + ')'
        return
    }else if(contato.classList[0] == 'activeTarefa'){
        contato.classList.remove('activeTarefa')
        underline.style.transform = 'translateX(' + -12 + 'px) scaleX(' + (width / 100 ) + ')'
        return
    }
    about.classList.remove('activeTarefa')
    home.classList.add('activeTarefa')
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    if(underline.offsetWidth == 50) return
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
})
novidades.addEventListener('click', (event)=>{
    home.classList.remove('activeTarefa')
    about.classList.remove('activeTarefa')
    novidades.classList.add('activeTarefa')
    contato.classList.remove('activeTarefa')
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    let width = event.target.offsetWidth
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    underline.style.width = width + 'px'
})
about.addEventListener('click', (event)=>{
    home.classList.remove('activeTarefa')
    novidades.classList.remove('activeTarefa')
    contato.classList.remove('activeTarefa')
    about.classList.add('activeTarefa')
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    let width = event.target.offsetWidth
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    underline.style.width = event.target.offsetWidth + 'px'
})
contato.addEventListener('click', (event)=>{
    home.classList.remove('activeTarefa')
    novidades.classList.remove('activeTarefa')
    about.classList.remove('activeTarefa')
    contato.classList.add('activeTarefa')
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    let width = event.target.offsetWidth
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    underline.style.width = event.target.offsetWidth + 'px'
})

const menuIcon = document.querySelector('.menu-icon')
const menuMini = document.querySelector('.menuMini')
const menuMiniOptions = document.querySelector('#menuMiniOptions')
const closeButton = document.querySelector('#close')
const body = document.querySelector('body')
menuMini.style.display = 'none'
menuIcon.addEventListener('click', ()=>{
    menuMini.style.display = 'flex'
    menuIcon.style.opacity = '0'
    body.style = 'overflow: hidden;'
    setTimeout(() => {
        menuMini.classList.add("showTrasition")
    }, 100);
})
closeButton.addEventListener('click', ()=>{
    if(window.innerWidth > 787) menuIcon.style.opacity = '0'
    else menuIcon.style.opacity = '1'
    menuMini.classList.remove("showTrasition")
    setTimeout(() => {
        body.style = 'overflow: scroll;'
        menuMini.style.display = 'none'
    }, 300);
})

const aboutMini = document.querySelector("#aboutMini")
aboutMini.addEventListener('click', ()=>{
    if(window.innerWidth > 787) menuIcon.style.opacity = '0'
    else menuIcon.style.opacity = '1'
    menuMini.classList.remove("showTrasition")
    setTimeout(() => {
        body.style = 'overflow: scroll;'
        menuMini.style.display = 'none'
    }, 500);
})

const homeMini = document.querySelector("#homeMini")
homeMini.addEventListener('click', ()=>{
    if(window.innerWidth > 787) menuIcon.style.opacity = '0'
    else menuIcon.style.opacity = '1'
    menuMini.classList.remove("showTrasition")
    setTimeout(() => {
        body.style = 'overflow: scroll;'
        menuMini.style.display = 'none'
    }, 500);
})

const contatoMini = document.querySelector("#contatoMini")
contatoMini.addEventListener('click', ()=>{
    if(window.innerWidth > 787) menuIcon.style.opacity = '0'
    else menuIcon.style.opacity = '1'
    menuMini.classList.remove("showTrasition")
    setTimeout(() => {
        body.style = 'overflow: scroll;'
        menuMini.style.display = 'none'
    }, 500);
})

const novidadesMini = document.querySelector("#novidadesMini")
novidadesMini.addEventListener('click', ()=>{
    if(window.innerWidth > 787) menuIcon.style.opacity = '0'
    else menuIcon.style.opacity = '1'
    menuMini.classList.remove("showTrasition")
    setTimeout(() => {
        body.style = 'overflow: scroll;'
        menuMini.style.display = 'none'
    }, 500);
})

const facebook = document.querySelector("#facebook")
facebook.addEventListener('click',()=>{
    window.open("https://facebook.com", "_blank")
})

const twitter = document.querySelector("#twitter")
twitter.addEventListener('click',()=>{
    window.open("https://twitter.com", "_blank")
})

const instagram = document.querySelector("#instagram")
instagram.addEventListener('click',()=>{
    window.open("https://instagram.com", "_blank")
})

const cadastrarHeader = document.querySelector("#cadastrarHeader")
cadastrarHeader.addEventListener('click',()=>{
    location.assign('./view/cadastrar.html')
})

const entrarHeader = document.querySelector("#entrarHeader")
entrarHeader.addEventListener('click',()=>{
    location.assign('./view/login.html')
})

const cadastrarMain = document.querySelector("#cadastrarMain")
cadastrarMain.addEventListener('click',()=>{
    location.assign('./view/cadastrar.html')
})

const entrarMain = document.querySelector("#entrarMain")
entrarMain.addEventListener('click',()=>{
    location.assign('./view/login.html')
})