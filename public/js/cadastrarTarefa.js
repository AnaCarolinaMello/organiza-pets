setTimeout(()=>{
  let loader = document.querySelector('#divLoader');
  let content = document.querySelector('#tarefa-entry');
  loader.style.display = 'none'
  content.style.display = 'flex'
}, 1800);

let database = JSON.parse(localStorage.getItem("database"));
let pets = database.user[0].pets.sort((a, b) => a.nome.localeCompare(b.nome));
let select = document.getElementById("pets");
let option;
pets.forEach((value) => {
  option = document.createElement("option");
  option.text = value.nome;
  option.value = value.id;
  select.appendChild(option);
});

function incluirTarefa() {
  let petId = select.value;
  let strNome = document.querySelector(".nome");
  let strDescricao = document.getElementById("input-size2");
  let strDataInicio = document.querySelector(".inicio");
  let strDataFim = document.querySelector(".fim");
  if (
    strNome != "" &&
    strDataInicio != "" &&
    petId != ""
  ) {
    inicio = strDataInicio.value.split("-");
    inicio2 = inicio[2].split("T");
    inicio = `${inicio[1]}/${inicio2[0]}/${inicio[0]}-${inicio2[1]}`;
    fim = '';
    if (strDataFim.value) {
      fim = strDataFim.value.split("-");
      fim2 = fim[2].split("T");
      fim = `${fim[1]}/${fim2[0]}/${fim[0]}-${fim2[1]}`;
    }
    const choosePetIndex = database.user[0].pets.findIndex(x => x.id == petId)
    if(choosePetIndex == -1){
      alert("Pet inexistente")
      return
    }
    database.user[0].pets[choosePetIndex].tarefaNewId =
      database.user[0].pets[choosePetIndex].tarefaNewId + 1;
    let novoTarefa = {
      id: database.user[0].pets[choosePetIndex].tarefaNewId,
      nome: strNome.value,
      descricao: strDescricao.value,
      inicio: inicio,
      fim: fim,
      petId: select.value
    };
    console.log(novoTarefa)
    database.user[0].pets[choosePetIndex].tarefas.push(novoTarefa);
    database = JSON.stringify(database);
    localStorage.removeItem("database");
    localStorage.setItem("database", database);
    window.location.assign("../view/agendaSemanal.html");
  } else {
    alert("Favor preencher todos os dados.");
  }
}

document
  .getElementById("cadastrar-button")
  .addEventListener("click", incluirTarefa);
