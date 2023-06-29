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

const btnCadastrar = document.querySelector("#cadastro");

$("#entrar").click(() => {
  window.location.assign(`../view/login.html`);
});

//função para zerar as senhas
const zerarSenha = () => {
  $(".senha").val("");
  $(".confirmarSenha").val("");
};

btnCadastrar.addEventListener("click", () => {
  let username = $(".username").val();
  let email = $(".email").val();
  let senha = $(".senha").val();
  let confirmarSenha = $(".confirmarSenha").val();
  const alert = document.querySelector('#alert')
  const texto = document.querySelector('#alert h2')
  alert.style.transition = 'opacity 0s'
  const testEmailregex = /\S+@\S+\.\S+/

  let databaseFind = database.users;
  //senhas vazias
  if (!senha || !confirmarSenha || !username || !email) {
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
    return
  }
  //senhas preenchidas
  else {
    if(!testEmailregex.test(email)){
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "E-mail inválido"
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
    //senhas iguais
    if (senha === confirmarSenha) {
      //senha menor que 8 difitos
      if (senha.length < 8) {
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "A senha deve ter pelo menos 8 dígitos"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        zerarSenha();
      } else {
        //Nome de usuario em uso
        if (databaseFind.find((data) => data.nome === username)) {
          alert.style.backgroundColor = '#ff4747'
          texto.textContent = "Nome de usuario em uso"
          alert.style.display = 'flex'
          alert.style.opacity = '1'
          setTimeout(()=>{
              alert.style.transition = 'opacity 1.5s'
              alert.style.opacity = '0'
          }, 1500);
          setTimeout(()=>{
              alert.style.display = 'none'
          }, 3000);
          $(".username").val("");
        } else {
          //email em uso
          if (databaseFind.find((data) => data.email === email)) {
            alert.style.backgroundColor = '#ff4747'
            texto.textContent = "E-mail em uso"
            alert.style.display = 'flex'
            alert.style.opacity = '1'
            setTimeout(()=>{
                alert.style.transition = 'opacity 1.5s'
                alert.style.opacity = '0'
            }, 1500);
            setTimeout(()=>{
                alert.style.display = 'none'
            }, 3000);
            $(".email").val("");
          }
          //inserção no localstorage
          else {
            database.newId = 1 + database.newId;
            let dados = {
              id: database.newId,
              nome: username,
              email: email,
              senha: senha,
              newPetId: 0,
              pets: [],
            };
            let horas = {
              id: database.newId,
              hours: [0, 0, 0, 0, 0, 0, 0],
            }
            database.users.push(dados);
            database = JSON.stringify(database);
            localStorage.removeItem("database");
            localStorage.setItem("database", database);
            localStorage.setItem("userId", dados.id);
            if(!localStorage.getItem("hours")){
              localStorage.setItem("hours", JSON.stringify({
                usersHours: []
              }))
            }
            let dataHora = JSON.parse(localStorage.getItem("hours"))
            dataHora.usersHours.push(horas)
            localStorage.removeItem('hours')
            localStorage.setItem('hours', JSON.stringify(dataHora))
            window.location.assign(`../view/perfil.html`);
          }
        }
      }
    }
    //senhas diferentes
    else {
      alert("As senhas não coincidem");
      alert.style.backgroundColor = '#ff4747'
      texto.textContent = "As senhas não coincidem"
      alert.style.display = 'flex'
      alert.style.opacity = '1'
      setTimeout(()=>{
          alert.style.transition = 'opacity 1.5s'
          alert.style.opacity = '0'
      }, 1500);
      setTimeout(()=>{
          alert.style.display = 'none'
      }, 3000);
      zerarSenha();
    }
  }
});

const voltar = document.querySelector('#textVoltar')
voltar.addEventListener('click',()=>{
  location.assign('../index.html')
})
