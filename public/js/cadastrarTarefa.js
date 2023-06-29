setTimeout(() => {
  let loader = document.querySelector("#divLoader");
  let content = document.querySelector("#tarefa-entry");
  loader.style.display = "none";
  content.style.display = "flex";
}, 1800);

let database = JSON.parse(localStorage.getItem("database"));
if (!database) {
  location.assign("../index.html");
}
const userId = localStorage.getItem("userId");
if (userId == null) {
  location.assign("../index.html");
}
const userIndex = database.users.findIndex((x) => x.id == parseInt(userId));
if (userIndex == -1) {
  location.assign("../index.html");
}
let pets = database.users[userIndex].pets.sort((a, b) =>
  a.nome.localeCompare(b.nome)
);
let select = document.getElementById("pets");
let option;
pets.forEach((value) => {
  option = document.createElement("option");
  option.text = value.nome;
  option.value = value.id;
  select.appendChild(option);
});

const url = new URL(window.location.href);
let dataUrl = url.searchParams.get("data");
const dataUrlISO = new Date(dataUrl).toISOString();
// let formatada = dataUrlISO.slice(0, 16).toString();
let strDataInicio = document.querySelector(".inicio");
const horaAtual = new Date().getHours();
const minutosAtuais = new Date().getMinutes();

formatada = dataUrlISO.substring(0, 11) + horaAtual + ":" + minutosAtuais;
if (dataUrl) {
  console.log((strDataInicio.value = formatada));
}
function incluirTarefa() {
  let petId = select.value;
  let strNome = document.querySelector(".nome");
  let strDescricao = document.getElementById("input-size2");
  let strDataFim = document.querySelector(".fim");
  const screen = url.searchParams.get("screen");
  const alert = document.querySelector("#alert");
  const texto = document.querySelector("#alert h2");
  alert.style.transition = "opacity 0s";
  if (strNome != "" && strDataInicio != "" && petId != "") {
    // inicio = strDataInicio.value.split("-");
    // inicio2 = inicio[2].split("T");
    // inicio = `${inicio[1]}/${inicio2[0]}/${inicio[0]}-${inicio2[1]}`;
    fim = "";
    // if (strDataFim.value) {
    //   fim = strDataFim.value.split("-");
    //   fim2 = fim[2].split("T");
    //   fim = `${fim[1]}/${fim2[0]}/${fim[0]}-${fim2[1]}`;
    // }
    const choosePetIndex = database.users[userIndex].pets.findIndex(
      (x) => x.id == petId
    );
    if (choosePetIndex == -1) {
      alert.style.backgroundColor = "#ff4747";
      texto.textContent = "Pet inexistente";
      alert.style.display = "flex";
      alert.style.opacity = "1";
      setTimeout(() => {
        alert.style.transition = "opacity 1.5s";
        alert.style.opacity = "0";
      }, 1500);
      setTimeout(() => {
        alert.style.display = "none";
      }, 3000);
      return;
    }
    database.users[userIndex].pets[choosePetIndex].tarefaNewId =
      database.users[userIndex].pets[choosePetIndex].tarefaNewId + 1;
    let novoTarefa = {
      id: database.users[userIndex].pets[choosePetIndex].tarefaNewId,
      nome: strNome.value,
      descricao: strDescricao.value,
      inicio: strDataInicio.value,
      fim: strDataFim.value,
      petId: select.value,
    };
    database.users[userIndex].pets[choosePetIndex].tarefas.push(novoTarefa);
    database = JSON.stringify(database);
    localStorage.removeItem("database");
    localStorage.setItem("database", database);
    if (parseInt(screen) == 1) {
      window.location.assign("../view/perfil.html");
    } else if (parseInt(screen) == 2) {
      window.location.assign("../view/agendaSemanal.html");
    } else {
      window.location.assign("../view/calendario.html");
    }
  } else {
    alert.style.backgroundColor = "#ff4747";
    texto.textContent = "Favor preencher todos os dados";
    alert.style.display = "flex";
    alert.style.opacity = "1";
    setTimeout(() => {
      alert.style.transition = "opacity 1.5s";
      alert.style.opacity = "0";
    }, 1500);
    setTimeout(() => {
      alert.style.display = "none";
    }, 3000);
  }
}

const voltar = document.querySelector("#textVoltar");
voltar.addEventListener("click", () => {
  const url = new URL(window.location.href);
  const screen = url.searchParams.get("screen");
  if (parseInt(screen) == 1) {
    window.location.assign("../view/perfil.html");
  } else if (parseInt(screen) == 2) {
    window.location.assign("../view/agendaSemanal.html");
  } else {
    window.location.assign("../view/calendario.html");
  }
});

document
  .getElementById("cadastrar-button")
  .addEventListener("click", incluirTarefa);
