// setInterval(() => {
// const NotificationN = new Notification("teste");
// }, 1000);

// let dataAtual = new Date();
// let dataIso = dataAtual.toISOString();
// console.log(dataIso);

// Notification.requestPermission((status) => {
//   console.log("Notification", status);
// });
// function displayNotification() {
//   if (Notification.permission === "granted") {
//     navigator.serviceWorker.getRegistration().then((reg) => {
//       reg.showNotification("teste");
//     });
//   }
// }
let database = JSON.parse(localStorage.getItem("database"))
getTarefasSemanais(database)
function getTarefasSemanais(db) {
  const pets = db.users[0].pets;
  pets.forEach((value) => {
    let tarefas = pets.flatMap((x)=>[...x.tarefas])
    tarefas= tarefas.map((value)=>{
        return {
            ...value,
            nomePet: pets.find((x)=> value.petId == x.id)?.nome
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
      today = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
      if (data == today) {
        $("#hoje").append(`
        <div class='notifications'>
            <img src="${value.path}" alt="${value.tipo}">
            <div class="tarefaNome">
              <p>${element.nome}</p>
            </div>
            <div class="status">
              <p>Hoje</p>
            </div>
        </div>
        `);
      }
      if(data > today){
        $("#todos").append(`
        <div class='notifications'>
            <img src="${value.path}" alt="${value.tipo}">
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
      const hojeDiv = document.querySelector("#hoje")
      const todos = document.querySelector("#todos")
      const notificacaoDiv = document.querySelector("#semNotificacoes")
      if(hojeDiv.childElementCount == 0){
        hojeDiv.style.display = 'none'
        notificacaoDiv.style.display = 'flex'
      }
      todos.style.display = "none"
    }); 
  });
}

const hoje = document.querySelector("#hojeNotificacao")
const todas = document.querySelector("#todas")
const underline = document.querySelector("#underlineActive")
const underlineOutside = document.querySelector("#underline")
let leftOffset = -1
let width = 100
underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'

hoje.addEventListener('click', (event)=>{
  todas.classList.remove('activeNotificacao')
    hoje.classList.add('activeNotificacao')
    let leftOffset = -10
    let width = 76
    if(underline.offsetWidth == 50) return
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
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
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    width += 10
    underline.style.width = width + 'px'
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
