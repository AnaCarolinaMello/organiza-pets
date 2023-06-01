setTimeout(()=>{
  let loader = document.querySelector('#divLoader');
  let content = document.querySelector('main');
  loader.style.display = 'none'
  content.style.display = 'flex'
}, 1800);

const cadastrarButton = document.getElementById("cadastrar");
let database =JSON.parse(localStorage.getItem("database"))
cadastrarButton.addEventListener("click", () => {
  //Obter os valores dos campos de entrada 
  const nome = document.getElementsByClassName('vacina');
  const dataVacinacao = document.getElementsByClassName('datavacinacao');
  const dose = document.getElementsByClassName('dose');
  const proximaDose = document.getElementsByClassName('proximadose');

  const url = new URL(window.location.href);
  const petId= url.searchParams.get('petId');
  
  if(!nome[0].value || !dose[0].value || !dataVacinacao[0].value){
    alert("Digite todos os dados obrigatórios")
    return
  }

  //Criar um objeto com os dados do formulário
  database.user[0].vacinaNewId = database.user[0].vacinaNewId + 1 
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
    id: database.user[0].vacinaNewId,
    nome: nome[0].value,
    data: dataVacinacao1,
    dose: dose[0].value,
    repetir: proximaDose1
  };
  const choosePetIndex = database.user[0].pets.findIndex(x => x.id == petId)
  console.log(choosePetIndex)
  if(choosePetIndex == -1){
    alert("Pet inexistente")
    return
  }
  database.user[0].pets[choosePetIndex].vacinas.push(formData)
  database =JSON.stringify(database)
  localStorage.removeItem("database")
  localStorage.setItem("database", database)
  window.location.assign("../view/vacinas.html")
})
