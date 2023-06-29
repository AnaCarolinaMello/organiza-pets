setTimeout(() => {
  let loader = document.querySelector("#divLoader");
  let content = document.querySelector("section");
  let header = document.querySelector("header");
  let aside = document.querySelector("aside");
  loader.style.display = "none";
  content.style.display = "flex";
  header.style.display = "flex";
  aside.style.display = "flex";
}, 1800);

let database = JSON.parse(localStorage.getItem("database"))
if(!database){
  location.assign('../index.html')
}
const userId = localStorage.getItem('userId')
if(userId == null){
  location.assign('../index.html')
}
const userIndex = database.users.findIndex(x => x.id == parseInt(userId))
if(userIndex == -1){
  location.assign('../index.html')
}
populeteScreen(database);
getNotificacoes(database)

const menu_icon = document.querySelector("#pet .menu-icons");
menu_icon.style.background = "#74e8b7";

const perfil = document.querySelector("#perfil .menu-icons");
perfil.addEventListener("click", () => {
  window.location.assign(`../view/perfil.html`);
});
const rotina = document.querySelector("#rotina .menu-icons");
rotina.addEventListener("click", () => {
  window.location.assign(`../view/agendaSemanal.html`);
});
const vacina = document.querySelector("#vacina .menu-icons");
vacina.addEventListener("click", () => {
  window.location.assign(`../view/vacinas.html`);
});
const calendario = document.querySelector("#calendario .menu-icons");
calendario.addEventListener("click", () => {
  window.location.assign(`../view/calendario.html`);
});
const cadastrarPet = document.querySelector("#adicionar");
cadastrarPet.addEventListener("click", () => {
  window.location.assign(`../view/cadastrarAnimais1.html?screen=2`);
});

function populeteScreen(data) {
  const meusPets = document.querySelector("#meusPets");
  const pets = data.users[userIndex].pets.sort((a, b) => a.nome.localeCompare(b.nome));
  pets.forEach((value) => {
    let raça = value.raça;
    if (raça == undefined || raça == null) raça = "";
    meusPets.innerHTML += `<div class="cardPet" style="background: ${value.cor}" id="cardPet${value.id}">
        <img src="${value.path}">
        <h3>${value.nome}</h3>
        <input id="nomePet${value.id}" class="inputCardPet" value="${value.nome}">
        <input id = "idadePet${value.id}" class="inputCardPet" value="${value.idade}">
        <input id = "pesoPet${value.id}" class="inputCardPet" value="${value.peso}">
        <input id = "racaPet${value.id}" class="inputCardPet" value="${raça}">
        <input id = "cor${value.id}" type="color" class="pickcolor" value="${value.cor}">
        <button id="editar${value.id}">Salvar</button>
    </div>`;
  });
  addClicks(pets);
}

function addClicks(pets) {
  pets.forEach((value) => {
    const editar = document.querySelector(`#editar${value.id}`);
    editar.addEventListener("click", () => {
      const nome = document.querySelector(`#nomePet${value.id}`);
      const idade = document.querySelector(`#idadePet${value.id}`);
      const peso = document.querySelector(`#pesoPet${value.id}`);
      const raca = document.querySelector(`#racaPet${value.id}`);
      const cor = document.querySelector(`#cor${value.id}`);
      const alert = document.querySelector('#alert')
      const texto = document.querySelector('#alert h2')
      let database = JSON.parse(localStorage.getItem("database"));
      alert.style.transition = 'opacity 0s'
      if (!nome.value || !idade.value || !peso.value) {
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "Digite todos os dados necessários"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        return
      }
      const choosePetIndex = database.users[userIndex].pets.findIndex(
        (x) => x.id == value.id
      );
      if (choosePetIndex == -1) {
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "Pet inválido"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        return;
      }
      if (
        nome.value == database.users[userIndex].pets[choosePetIndex].nome &&
        idade.value == database.users[userIndex].pets[choosePetIndex].idade &&
        peso.value == database.users[userIndex].pets[choosePetIndex].peso &&
        raca.value == database.users[userIndex].pets[choosePetIndex].raça &&
        cor.value == database.users[userIndex].pets[choosePetIndex].cor
      ) {
        alert.style.backgroundColor = '#ffc213'
        texto.textContent = "Nenhum dado alterado"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        return;
      }

      const dadosAtualizados = {
        ...database.users[userIndex].pets[choosePetIndex],
        nome: nome.value,
        idade: idade.value,
        peso: peso.value,
        raça: raca.value,
        cor: cor.value
      };
      database.users[userIndex].pets[choosePetIndex] = dadosAtualizados;

      database = JSON.stringify(database);
      localStorage.removeItem("database");
      localStorage.setItem("database", database);
      const cardPet = document.querySelector(`#cardPet${value.id}`)
      cardPet.style.background = dadosAtualizados.cor
      alert.style.backgroundColor = '#34cf71'
      texto.textContent = "Dados alterados com sucesso"
      alert.style.display = 'flex'
      alert.style.opacity = '1'
      setTimeout(()=>{
          alert.style.transition = 'opacity 1.5s'
          alert.style.opacity = '0'
      }, 1500);
      setTimeout(()=>{
          alert.style.display = 'none'
      }, 3000);
    });
  });
}

function getNotificacoes(db){
  const pets = db.users[userIndex].pets;
  let tarefas = pets.flatMap((x)=>[...x.tarefas])
  tarefas= tarefas.map((value)=>{
      const pet = pets.find((x)=> value.petId == x.id)
      return {
          ...value,
          nomePet: pet?.nome,
          tipo: pet?.tipo,
          path: pet?.path
      }
  })
  tarefas.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
  tarefas.forEach((element) => {
      let data = new Date(element.inicio);
      let dataFim = ""
      if(element.fim){
          dataFim = new Date(element.fim);
          dataFim = `- ${dataFim.getHours().toString().padStart(2, '0')}:${dataFim.getMinutes().toString().padStart(2, '0')}`
      }
      data = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
      let today = new Date();
      let twoWeeks = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
      today = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
      if (data == today) {
        $("#hoje").append(`
              <div class='notifications'>
                  <img src="${element.path}" alt="${element.nomePet}">
                  <div class="tarefaNome">
                  <p>${element.nome}</p>
                  </div>
                  <div class="status">
                  <p>Hoje</p>
                  </div>
              </div>
              `);
      }
      if (data > today && data < twoWeeks) {
          $("#todos").append(`
          <div class='notifications'>
              <img src="${element.path}" alt="${element.nomePet}">
              <div class="tarefaNome">
              <p>${element.nome}</p>
          </div>
          <div class="status">
              <p class="diaTarefas">${new Date(element.inicio).getDate().toString().padStart(2, '0')} /${new Date(element.inicio).getMonth().toString().padStart(2, '0')} /${new Date(element.inicio).getFullYear()}</p>
              <p class="horaTarefas">${new Date(element.inicio).getHours().toString().padStart(2, '0')}:${new Date(element.inicio).getMinutes().toString().padStart(2, '0')} ${dataFim}</p>
          </div>
          </div>
          `);
      } 
  });
  const hojeDiv = document.querySelector("#hoje")
  const todos = document.querySelector("#todos")
  const notificacaoDiv = document.querySelector("#semNotificacoes")
  if(hojeDiv.childElementCount == 0){
      hojeDiv.style.display = 'none'
      notificacaoDiv.style.display = 'flex'
      if(todos.childElementCount == 0){
        document.querySelector("#haveNotification").style.display = 'none'
      }
  }
  todos.style.display = "none"
  addHover()
}

function addHover(){
  let notifications = document.querySelectorAll(".notifications")
  notifications.forEach((value) =>{
    img = value.querySelector('img')
    let alt = img.getAttribute('alt')
    let popup = document.querySelector('#alertNoti')
    let h2 = document.querySelector('#alertNoti h2')
    h2.textContent = alt
    popup.style.backgroundColor = "#282929"
    popup.style.opacity = "1";
    popup.style.paddingBottom = "1%";
    value.addEventListener("mouseover", (event) => {
      popup.style.transition = "none";  
      img = event.target.querySelector("img");
      alt = img.getAttribute("alt");
      popup = document.querySelector("#alertNoti");
      h2 = document.querySelector("#alertNoti h2");
      h2.textContent = alt;
      popup.style.opacity = "1";
      popup.style.display = "flex";
    });
    value.addEventListener('mouseout', ()=>{
      setTimeout(()=>{
        popup.style.transition = 'opacity 1.5s'
        popup.style.opacity = '0'
      }, 500);
      setTimeout(()=>{
        popup.style.display = 'none'
      }, 2000);
    })
  })
}

const notificacao = document.querySelector("#divNotificacao");
notificacao.addEventListener("click", () => {
  const popup = document.querySelector("#popup");
  if (popup.style.display == "none" || popup.style.display == "") {
    const popupPerfil = document.querySelector("#popupPerfil");
    popupPerfil.style.display = "none"
    popup.style.display = "flex";
  } else {
    popup.style.display = "none";
  }
});

const hoje = document.querySelector("#hojeNotificacao")
const todas = document.querySelector("#todas")
const underlineNoti = document.querySelector("#underlineActiveNoti")
const underlineOutsideNoti = document.querySelector("#underlineNoti")
leftOffset = -1
width = 100
underlineNoti.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'

hoje.addEventListener('click', (event)=>{
todas.classList.remove('activeNotificacao')
  hoje.classList.add('activeNotificacao')
  let leftOffset = -10
  let width = 76
  if(underlineNoti.offsetWidth == 50) return
  underlineNoti.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
  const hojeDiv = document.querySelector("#hoje")
  const todos = document.querySelector("#todos")
  const notificacaoDiv = document.querySelector("#semNotificacoes")
  todos.style.display = "none"
  notificacaoDiv.style.display = 'none'
  if(hojeDiv.childElementCount == 0){
  hojeDiv.style.display = 'none'
  notificacaoDiv.style.display = 'flex'
  }else{
  hojeDiv.style.display = 'block'
  }
})
todas.addEventListener('click', (event)=>{
  hoje.classList.remove('activeNotificacao')
  todas.classList.add('activeNotificacao')
  let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
  let width = event.target.offsetWidth
  underlineNoti.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
  width += 10
  underlineNoti.style.width = width + 'px'
  const hojeDiv = document.querySelector("#hoje")
  const todos = document.querySelector("#todos")
  const notificacaoDiv = document.querySelector("#semNotificacoes")
  hojeDiv.style.display = "none"
  notificacaoDiv.style.display = 'none'
  if(todos.childElementCount == 0){
  todos.style.display = 'none'
  notificacaoDiv.style.display = 'flex'
  }else{
  todos.style.display = 'block'
  }
})

const perfilHeader = document.querySelector("#fotoPerfil");
perfilHeader.addEventListener("click", () => {
  const popupPerfil = document.querySelector("#popupPerfil");
  if (popupPerfil.style.display == "none" || popupPerfil.style.display == "") {
    const popup = document.querySelector("#popup");
    popupPerfil.style.display = "flex";
    popup.style.display = "none";
  } else {
    popupPerfil.style.display = "none";
  }
});

const logout = document.querySelector('#logout')
logout.addEventListener('click',()=>{
    localStorage.removeItem('userId')
    location.assign('../index.html')
})

const perfilPopup = document.querySelector('#perfilPopup')
perfilPopup.addEventListener('click',()=>{
    location.assign('./perfil.html')
})