setTimeout(()=>{
    let loader = document.querySelector('#divLoader');
    let content = document.querySelector('section');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');
    loader.style.display = 'none'
    content.style.display = 'flex'
    header.style.display = 'flex'
    aside.style.display = 'flex'
}, 1050);

const vacina = document.querySelector("#vacina .menu-icons")
vacina.addEventListener('click', ()=>{
    window.location.assign(`../view/vacinas.html`)
})
const perfil = document.querySelector("#perfil .menu-icons")
perfil.addEventListener('click', ()=>{
    window.location.assign(`../view/perfil.html`)
})
const comida = document.querySelector("#comida .menu-icons")
comida.addEventListener('click', ()=>{
    window.location.assign(`../view/comida.html`)
})
const calendario = document.querySelector("#calendario .menu-icons")
calendario.addEventListener('click', ()=>{
    window.location.assign(`../view/calendario.html`)
})

const menu_icon = document
  .querySelector("#rotina")
  .querySelector(".menu-icons");
menu_icon.style.background = "#74e8b7";

const database = JSON.parse(localStorage.getItem("database"));
getTarefasSemanais(database);

function addClicks() {
  window.location.assign("../view/cadastrarTarefa.html");
}

function getTarefasSemanais(db) {
  console.log(database);
  const pets = db.user[0].pets;
  let curr = new Date();
  let firstDay = new Date(
    curr.setDate(curr.getDate() - curr.getDay())
  ).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  let lastDay = new Date(
    curr.setDate(curr.getDate() - curr.getDay() + 6)
  ).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  pets.forEach((value) => {
    value.tarefas.sort((a, b) => {
      const horaInicioA = parseInt(a.inicio.split("-")[1]);
      const horaInicioB = parseInt(b.inicio.split("-")[1]);
      return horaInicioA - horaInicioB;
    });
    value.tarefas.forEach((element) => {
      let dia = new Date(element.inicio);
      let diaRelativo = dia.getDay();
      let horaInicio = element.inicio.split("-")[1];
      element.fim ? (horaFim = element.fim.split("-")[1]) : (horaFim = "");

      if (
        (element.inicio >= firstDay && element.inicio <= lastDay) ||
        (element.fim >= firstDay && element.fim <= lastDay) ||
        (element.fim === "" &&
          element.inicio >= firstDay &&
          element.inicio <= lastDay)
      ) {
        switch (diaRelativo) {
          case 0:
            let exibicaoDomingo = document.getElementById("day0");
            exibicaoDomingo.innerHTML += `
          <div class="tarefa" id="tarefa${value.nome}${element.id}">
            <h3>${element.nome}</h3>
            <h4>${value.nome}</h4>
            <p>${element.descricao}</p>
            <p>${horaInicio}-${horaFim ? horaFim : ""}</p>
          </div>
          `;
            break;
          case 1:
            let exibicaoSegunda = document.getElementById("day1");
            exibicaoSegunda.innerHTML += `
            <div class="tarefa" id="tarefa${value.nome}${element.id}">
              <h3>${element.nome}</h3>
              <h4>${value.nome}</h3>
              <p>${element.descricao}</p>
              <p>${horaInicio}-${horaFim ? horaFim : ""}</p>
            </div>
            `;
            break;
          case 2:
            let exibicaoTerca = document.getElementById("day2");
            exibicaoTerca.innerHTML += `
            <div class="tarefa" id="tarefa${value.nome}${element.id}">
              <h3>${element.nome}</h3>
              <h4>${value.nome}</h4>
              <p>${element.descricao}</p>
              <p>${horaInicio}-${horaFim ? horaFim : ""}</p>
            </div>
            `;
            break;
          case 3:
            let exibicaoQuarta = document.getElementById("day3");
            exibicaoQuarta.innerHTML += `
            <div class="tarefa" id="tarefa${value.nome}${element.id}">
              <h3>${element.nome}</h3>
              <h4>${value.nome}</h4>
              <p>${element.descricao}</p>
              <p>${horaInicio}-${horaFim ? horaFim : ""}</p>
            </div>
            `;
            break;
          case 4:
            let exibicaoQuinta = document.getElementById("day4");
            exibicaoQuinta.innerHTML += `
            <div class="tarefa" id="tarefa${value.nome}${element.id}">
              <h3>${element.nome}</h3>
              <h4>${value.nome}</h4>
              <p>${element.descricao}</p>
              <p>${horaInicio}-${horaFim ? horaFim : ""}</p>
            </div>
            `;
            break;
          case 5:
            let exibicaoSexta = document.getElementById("day5");
            exibicaoSexta.innerHTML += `
            <div class="tarefa" id="tarefa${value.nome}${element.id}">
              <h3>${element.nome}</h3>
              <h4>${value.nome}</h4>
              <p>${element.descricao}</p>
              <p>${horaInicio}-${horaFim ? horaFim : ""}</p>
            </div>
            `;
            break;
          case 6:
            let exibicaoSabado = document.getElementById("day6");
            exibicaoSabado.innerHTML += `
            <div class="tarefa" id="tarefa${value.nome}${element.id}">
              <h3>${element.nome}</h3>
              <h4>${value.nome}</h4>
              <p>${element.descricao}</p>
              <p>${horaInicio}-${horaFim ? horaFim : ""}</p>

            </div>
            `;
            break;
        }
        let tarefa = document.querySelector(
          `#tarefa${value.nome}${element.id}`
        );
        tarefa.style.backgroundColor = `${value.cor}`;
      }
    });
    let atualSemana = document.getElementById("atualSemana");
    atualSemana.innerHTML = `${new Date(firstDay).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} - ${new Date(lastDay).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
  });
}
