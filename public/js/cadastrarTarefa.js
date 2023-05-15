let database = JSON.parse(localStorage.getItem('database'));
let pets = database.user[0].pets;
let select = document.getElementById('pets');
let option;
console.log(database)
pets.forEach(value => {
  option = document.createElement('option');
  option.text = value.nome;
  option.value = value.id;
  select.appendChild(option);
});

function incluirTarefa() {
  let petId = select.value;
  let strNome = document.querySelector('.nome');
  let strDescricao = document.getElementById('input-size2');
  let strDataInicio = document.querySelector('.inicio');
  let strDataFim = document.querySelector('.fim');
  if(strNome != "" && strDescricao != "" && strDataInicio != "" && petId != ""){
    inicio = (strDataInicio.value).split('-');
    inicio2 = inicio[2].split('T');
    inicio = `${inicio[1]}/${inicio2[0]}/${inicio[0]-inicio2[1]}`;
    fim = null
    if(strDataFim.value){
      fim = (strDataFim.value).split('-');
      fim2 = fim[2].split('T');
      fim = `${fim[1]}/${fim2[0]}/${fim[0]-fim2[1]}`;
    }
    database.user[0].pets[petId-1].tarefaNewId = database.user[0].pets[petId-1].tarefaNewId + 1;
    let novoTarefa = {
      id: database.user[0].pets[petId-1].tarefaNewId,
      nome: strNome.value,
      descricao: strDescricao.value,
      inicio: inicio,
      fim: fim
    };
    database.user[0].pets[petId-1].tarefas.push(novoTarefa);
    database = JSON.stringify(database);
    localStorage.removeItem('database');
    localStorage.setItem('database', database);
    window.location.assign('../view/agendaSemanal.html');
  } else {
      alert("Favor preencher todos os dados.");
  }
}

document.getElementById("cadastrar-button").addEventListener("click", incluirTarefa);

