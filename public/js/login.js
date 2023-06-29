setTimeout(() => {
  let loader = document.querySelector("#divLoader");
  let content = document.querySelector("main");
  loader.style.display = "none";
  content.style.display = "flex";
}, 1800);

let database = JSON.parse(localStorage.getItem("database"));
if(!database){
  location.assign('../index.html')
}
const btnEntrar = $("#entrar");

$("#cadastro").click(() => {
  window.location.assign(`../view/cadastrar.html`);
});

const zerarCampos = () => {
  $(".username").val("");
  $(".senha").val("");
};

$(btnEntrar).click(() => {
  let databaseFind = database.users;
  let username = $(".username").val();
  let senha = $(".senha").val();
  const alert = document.querySelector('#alert')
  const texto = document.querySelector('#alert h2')
  const users = databaseFind.find((data) => data.nome === username)
  if (!username || !senha) {
      alert.style.backgroundColor = '#ff4747'
      texto.textContent = "Preencha todos os campos"
      alert.style.display = 'flex'
      alert.style.opacity = '1'
      setTimeout(()=>{
          alert.style.transition = 'opacity 1.5s'
          alert.style.opacity = '0'
      }, 1500);
      setTimeout(()=>{
          alert.style.display = 'none'
      }, 3000);
  } else {
    if (
      users &&
      users.senha == senha
    ) {
      window.location.assign(`../view/perfil.html`);
      localStorage.setItem("userId", users.id);
      let horas = {
        id: users.id,
        hours: [0, 0, 0, 0, 0, 0, 0],
      }
      if(!localStorage.getItem("hours")){
        localStorage.setItem("hours", JSON.stringify({
          usersHours: []
        }))
      }
      let dataHora = JSON.parse(localStorage.getItem("hours"))
      dataHora.usersHours.push(horas)
      localStorage.removeItem('hours')
      localStorage.setItem('hours', JSON.stringify(dataHora))
    } else {
      alert.style.backgroundColor = '#ff4747'
      texto.textContent = "Usuario ou senha inválidos"
      alert.style.display = 'flex'
      alert.style.opacity = '1'
      setTimeout(()=>{
          alert.style.transition = 'opacity 1.5s'
          alert.style.opacity = '0'
      }, 1500);
      setTimeout(()=>{
          alert.style.display = 'none'
      }, 3000);
      zerarCampos();
    }
  }
});

const voltar = document.querySelector('#textVoltar')
voltar.addEventListener('click',()=>{
  location.assign('../index.html')
})