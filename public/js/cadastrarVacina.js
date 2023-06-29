setTimeout(()=>{
  let loader = document.querySelector('#divLoader');
  let content = document.querySelector('main');
  loader.style.display = 'none'
  content.style.display = 'flex'
}, 1800);

const cadastrarButton = document.getElementById("cadastrar")
let database =JSON.parse(localStorage.getItem("database"))
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

cadastrarButton.addEventListener("click", () => {
  //Obter os valores dos campos de entrada 
  const nome = document.getElementsByClassName('vacina');
  const dataVacinacao = document.getElementsByClassName('datavacinacao');
  const dose = document.getElementsByClassName('dose');
  const proximaDose = document.getElementsByClassName('proximadose');

  const url = new URL(window.location.href);
  const petId= url.searchParams.get('petId');
  
  const alert = document.querySelector('#alert')
  const texto = document.querySelector('#alert h2')
  alert.style.transition = 'opacity 0s'

  if(!nome[0].value || !dose[0].value || !dataVacinacao[0].value){
    alert.style.backgroundColor = '#ff4747'
    texto.textContent = "Digite todos os dados obrigatórios"
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

  //Criar um objeto com os dados do formulário
  const choosePetIndex = database.users[userIndex].pets.findIndex(x => x.id == petId)
  if(choosePetIndex == -1){
    alert.style.backgroundColor = '#ff4747'
    texto.textContent = "Pet inexistente"
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
  database.users[userIndex].pets[choosePetIndex].vacinaNewId = database.users[userIndex].pets[choosePetIndex].vacinaNewId + 1
  dataVacinacao1 = (dataVacinacao[0].value).split('-')
  dataVacinacao2 = dataVacinacao1[2].split('T')
  dataVacinacao1 = `${dataVacinacao2[0]}/${dataVacinacao1[1]}/${dataVacinacao1[0]}`

  if(proximaDose[0].value){
    proximaDose1 = (proximaDose[0].value).split('-')
    proximaDose2 = proximaDose1[2].split('T')
    proximaDose1 = `${proximaDose2[0]}/${proximaDose1[1]}/${proximaDose1[0]}`
  }else{
    proximaDose1 = ""
  }

  const formData = {
    id: database.users[userIndex].pets[choosePetIndex].vacinaNewId,
    nome: nome[0].value,
    data: dataVacinacao1,
    dose: dose[0].value,
    repetir: proximaDose1
  };
  database.users[userIndex].pets[choosePetIndex].vacinas.push(formData)
  database =JSON.stringify(database)
  localStorage.removeItem("database")
  localStorage.setItem("database", database)
  window.location.assign("../view/vacinas.html")
})

const voltar = document.querySelector('#textVoltar')
voltar.addEventListener('click',()=>{
  location.assign('./vacinas.html')
})
