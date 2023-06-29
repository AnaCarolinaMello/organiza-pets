setTimeout(() => {
  let loader = document.querySelector("#divLoader");
  let content = document.querySelector("section");
  let header = document.querySelector("header");
  let aside = document.querySelector("aside");
  loader.style.display = "none";
  content.style.display = "flex";
  header.style.display = "flex";
  aside.style.display = "flex";
}, 1050);

const vacina = document.querySelector("#vacina .menu-icons");
vacina.addEventListener("click", () => {
  window.location.assign(`../view/vacinas.html`);
});
const perfil = document.querySelector("#perfil .menu-icons");
perfil.addEventListener("click", () => {
  window.location.assign(`../view/perfil.html`);
});
const pet = document.querySelector("#pet .menu-icons");
pet.addEventListener("click", () => {
  window.location.assign(`../view/pet.html`);
});
const calendario = document.querySelector("#calendario .menu-icons");
calendario.addEventListener("click", () => {
  window.location.assign(`../view/calendario.html`);
});

const menu_icon = document
  .querySelector("#rotina")
  .querySelector(".menu-icons");
menu_icon.style.background = "#74e8b7";

function addClicks() {
  window.location.assign("../view/cadastrarTarefa.html?screen=2");
}
const database = JSON.parse(localStorage.getItem("database"));
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
// getTarefasSemanais(database);
getNotificacoes(database);

function getTarefasSemanais(db) {
  let events = [];
  const pets = db.users[userIndex].pets;

  pets.forEach((value) => {
    value.tarefas.forEach((element) => {
      let data = element.inicio;
      let dataFim;
      if (element.fim) {
        dataFim = element.fim;
      }
      let evento = {
        id: value.id,
        title: element.nome,
        start: data,
        end: dataFim,
        color: value.cor,
        description: element.descricao ? element.descricao : "-",
        tarefa: element.id,
      };
      events.push(evento);
    });
  });
  return events;
}

function getNotificacoes(db) {
  const pets = db.users[userIndex].pets;
  let tarefas = pets.flatMap((x) => [...x.tarefas]);
  tarefas = tarefas.map((value) => {
    const pet = pets.find((x) => value.petId == x.id);
    return {
      ...value,
      nomePet: pet?.nome,
      tipo: pet?.tipo,
      path: pet?.path,
    };
  });
  tarefas.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
  tarefas.forEach((element) => {
    let data = new Date(element.inicio);
    let dataFim = "";
    if (element.fim) {
      dataFim = new Date(element.fim);
      dataFim = `- ${dataFim.getHours().toString().padStart(2, "0")}:${dataFim
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
    data = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
    let today = new Date();
    let oneWeek = new Date();
    oneWeek.setDate(today.getDate() + 7)
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
    if (data > today && data < oneWeek) {
      $("#todos").append(`
          <div class='notifications'>
              <img src="${element.path}" alt="${element.nomePet}">
              <div class="tarefaNome">
              <p>${element.nome}</p>
          </div>
          <div class="status">
              <p class="diaTarefas">${new Date(element.inicio)
                .getDate()
                .toString()
                .padStart(2, "0")} /${new Date(element.inicio)
        .getMonth()
        .toString()
        .padStart(2, "0")} /${new Date(element.inicio).getFullYear()}</p>
              <p class="horaTarefas">${new Date(element.inicio)
                .getHours()
                .toString()
                .padStart(2, "0")}:${new Date(element.inicio)
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${dataFim}</p>
          </div>
          </div>
          `);
    }
  });
  const hojeDiv = document.querySelector("#hoje");
  const todos = document.querySelector("#todos");
  const notificacaoDiv = document.querySelector("#semNotificacoes");
  if (hojeDiv.childElementCount == 0) {
    hojeDiv.style.display = "none";
    notificacaoDiv.style.display = "flex";
    if (todos.childElementCount == 0) {
      document.querySelector("#haveNotification").style.display = "none";
    }
  }
  todos.style.display = "none";
  addHover();
}

function addHover() {
  let notifications = document.querySelectorAll(".notifications");
  notifications.forEach((value) => {
    img = value.querySelector("img");
    let alt = img.getAttribute("alt");
    let popup = document.querySelector("#alertNoti");
    let h2 = document.querySelector("#alertNoti h2");
    h2.textContent = alt;
    popup.style.backgroundColor = "#282929";
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
    value.addEventListener("mouseout", () => {
      setTimeout(() => {
        popup.style.transition = "opacity 1.5s";
        popup.style.opacity = "0";
      }, 500);
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);
    });
  });
}

const notificacao = document.querySelector("#divNotificacao");
notificacao.addEventListener("click", () => {
  const popup = document.querySelector("#popup");
  if (popup.style.display == "none" || popup.style.display == "") {
    const popupPerfil = document.querySelector("#popupPerfil");
    popupPerfil.style.display = "none";
    popup.style.display = "flex";
  } else {
    popup.style.display = "none";
  }
});

const hoje = document.querySelector("#hojeNotificacao");
const todas = document.querySelector("#todas");
const underlineNoti = document.querySelector("#underlineActiveNoti");
const underlineOutsideNoti = document.querySelector("#underlineNoti");
leftOffset = -1;
width = 100;
underlineNoti.style.transform =
  "translateX(" + leftOffset + "px) scaleX(" + width / 100 + ")";

hoje.addEventListener("click", (event) => {
  todas.classList.remove("activeNotificacao");
  hoje.classList.add("activeNotificacao");
  let leftOffset = -10;
  let width = 76;
  if (underlineNoti.offsetWidth == 50) return;
  underlineNoti.style.transform =
    "translateX(" + leftOffset + "px) scaleX(" + width / 100 + ")";
  const hojeDiv = document.querySelector("#hoje");
  const todos = document.querySelector("#todos");
  const notificacaoDiv = document.querySelector("#semNotificacoes");
  todos.style.display = "none";
  notificacaoDiv.style.display = "none";
  if (hojeDiv.childElementCount == 0) {
    hojeDiv.style.display = "none";
    notificacaoDiv.style.display = "flex";
  } else {
    hojeDiv.style.display = "block";
  }
});
todas.addEventListener("click", (event) => {
  hoje.classList.remove("activeNotificacao");
  todas.classList.add("activeNotificacao");
  let leftOffset =
    event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft;
  let width = event.target.offsetWidth;
  underlineNoti.style.transform =
    "translateX(" + leftOffset + "px) scaleX(" + width / 100 + ")";
  width += 10;
  underlineNoti.style.width = width + "px";
  const hojeDiv = document.querySelector("#hoje");
  const todos = document.querySelector("#todos");
  const notificacaoDiv = document.querySelector("#semNotificacoes");
  hojeDiv.style.display = "none";
  notificacaoDiv.style.display = "none";
  if (todos.childElementCount == 0) {
    todos.style.display = "none";
    notificacaoDiv.style.display = "flex";
  } else {
    todos.style.display = "block";
  }
});

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

const logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("userId");
  location.assign("../index.html");
});

const perfilPopup = document.querySelector("#perfilPopup");
perfilPopup.addEventListener("click", () => {
  location.assign("./perfil.html");
});

function deletarTarefa(info) {
  let petIndex = database.users[userIndex].pets.findIndex(
    (item) => item.id == info.event.id
  );
  const newTarefa = database.users[userIndex].pets[petIndex].tarefas.filter(
    (item) => item.id != info.event.extendedProps.tarefa
  );
  database.users[userIndex].pets[petIndex].tarefas = newTarefa;
  localStorage.removeItem("database");
  localStorage.setItem("database", JSON.stringify(database));

  location.reload();

  const edit = document.querySelector(".confirmacao");
  const confirmacao = document.querySelector("#editCon");
  confirmacao.style.display = "none";
  edit.innerHTML = `
    <div class="bg-white w-52 p-4 flex flex-row gap-2 justify-content-between rounded">
      <button id="btnEditar" class="bg-blue-500 p-2 rounded">Editar</button>
      <button id="btnDeletar" class="bg-red-500 p-2 rounded">Deletar</button>
    </div>
  `;
}

const closeButtonEdit = document.querySelector("#closeEdit");
closeButtonEdit.addEventListener("click", () => {
  const confirmacao = document.querySelector("#editCon");
  confirmacao.style.display = "none";
  edit.innerHTML = `
      <div class="bg-white w-52 p-2 flex flex-col gap-2 justify-content-between rounded">
      <div class="relative gap-2">
        <h1 class="close" id="closeEdit">x</h1>
        <div class="confirmContent">
          <div id="divButtons" class="flex flex-row">
            <button id="btnEditar" class="bg-blue-500 p-2 rounded text-white">Editar</button>
            <button id="btnDeletar" class="bg-red-500 p-2 rounded text-white">Deletar</button>
          </div>
        </div>
      </div>`;
});

function editarTarefa(info) {
  let tituloInput = $("#nomeEdit").val();
  let inicioInput = $("#dataEdit").val();
  let fimInput = $("#fimEdit").val();
  let textAreaDescriptionInput = $("#textArea").val();
  if (!fimInput) {
    fimInput = "";
  }
  let petIndex = database.users[userIndex].pets.findIndex(
    (item) => item.id == info.event.id
  );
  const tarefasIndex = database.users[userIndex].pets[
    petIndex
  ].tarefas.findIndex(
    (item) => item.id === parseInt(info.event.extendedProps.tarefa)
  );
  const updateTarefa = {
    ...database.users[userIndex].pets[petIndex].tarefas[tarefasIndex],
    nome: tituloInput,
    descricao: textAreaDescriptionInput,
    inicio: inicioInput,
    fim: fimInput,
  };

  database.users[userIndex].pets[petIndex].tarefas[tarefasIndex] = updateTarefa;
  localStorage.removeItem("database");
  localStorage.setItem("database", JSON.stringify(database));

  location.reload(true);

  const edit = document.querySelector(".confirmacao");
  const confirmacao = document.querySelector("#editCon");
  confirmacao.style.display = "none";
  edit.innerHTML = `
  <div class="bg-white w-52 p-2 flex flex-col gap-2 justify-content-between rounded">
  <div class="relative gap-2">
    <h1 class="close" id="closeEdit">x</h1>
    <div class="confirmContent">
      <div id="divButtons" class="flex flex-row">
        <button id="btnEditar" class="bg-blue-500 p-2 rounded text-white">Editar</button>
        <button id="btnDeletar" class="bg-red-500 p-2 rounded text-white">Deletar</button>
      </div>
    </div>
  </div>
  `;
}

function popEditDelete(info) {
  const edit = document.querySelector(".confirmacao");
  edit.style = "display:flex";

  const confirmacao = document.querySelector(".confirmacao");
  const btnEditar = document.querySelector("#btnEditar");
  const btnDeletar = document.querySelector("#btnDeletar");

  let dataInicio = info.event.start;
  let formattedDate = `${dataInicio.getFullYear()}-${(dataInicio.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dataInicio
    .getDate()
    .toString()
    .padStart(2, "0")}T${dataInicio
    .getHours()
    .toString()
    .padStart(2, "0")}:${dataInicio.getMinutes().toString().padStart(2, "0")}`;

  let dataFim = "";
  let formattedDateFim;
  if (info.event.end) {
    dataFim = info.event.end;
    formattedDateFim = `${dataFim.getFullYear()}-${(dataFim.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dataFim
      .getDate()
      .toString()
      .padStart(2, "0")}T${dataFim
      .getHours()
      .toString()
      .padStart(2, "0")}:${dataFim.getMinutes().toString().padStart(2, "0")}`;
  }

  // botão de editar
  btnEditar.addEventListener("click", () => {
    edit.innerHTML = `
    <div id="confirmarEdit">
    <div class="confirmContent">
    <h1 class="close w-full flex justify-end" id="closeEdit">x</h1>
        <div id="divDadosEdit">
          <h3>Edite a tarefa</h3>
          <input id="nomeEdit" value="${info.event.title}">
          <input id="dataEdit" type="datetime-local" value="${formattedDate}">
          <input id="fimEdit" type="datetime-local" value="${formattedDateFim}">
          <textarea id="textArea" value="${info.event.extendedProps.description != '-'? info.event.extendedProps.description: ''}"></textarea>
        </div>
        <div class="botoes">
          <button class="cancelar text-white" id="cancelarEdit">Cancelar</button>
          <button id="salvar" class="text-white">Salvar</button>
        </div>
      </div>
    </div>`;
    let textEdit = document.querySelector("#textArea");
    textEdit.value = info.event.extendedProps.description != '-'? info.event.extendedProps.description: ''

    const salvarEdit = document.querySelector("#salvar");
    salvarEdit.addEventListener("click", () => {
      editarTarefa(info);
    });

    const closeButtonEdit = document.querySelector("#closeEdit");
    closeButtonEdit.addEventListener("click", () => {
      const confirmacao = document.querySelector("#editCon");
      confirmacao.style.display = "none";
      edit.innerHTML = `
      <div class="bg-white w-52 p-2 flex flex-col gap-2 justify-content-between rounded">
      <div class="relative gap-2">
        <h1 class="close" id="closeEdit">x</h1>
        <div class="confirmContent">
          <div id="divButtons" class="flex flex-row">
            <button id="btnEditar" class="bg-blue-500 p-2 rounded text-white">Editar</button>
            <button id="btnDeletar" class="bg-red-500 p-2 rounded text-white">Deletar</button>
          </div>
        </div>
      </div>`;
    });
    const cancelarEdit = document.querySelector("#cancelarEdit");
    cancelarEdit.addEventListener("click", () => {
      const confirmacao = document.querySelector("#editCon");
      confirmacao.style.display = "none";
      edit.innerHTML = `
      <div class="bg-white w-52 p-2 flex flex-col gap-2 justify-content-between rounded">
      <div class="relative gap-2">
        <h1 class="close" id="closeEdit">x</h1>
        <div class="confirmContent">
          <div id="divButtons" class="flex flex-row">
            <button id="btnEditar" class="bg-blue-500 p-2 rounded text-white">Editar</button>
            <button id="btnDeletar" class="bg-red-500 p-2 rounded text-white">Deletar</button>
          </div>
        </div>
      </div>
    `;
    });
  });

  // botão de deletar
  btnDeletar.addEventListener("click", () => {
    edit.innerHTML = `
    <div id="confirmarDelete">
            <h1 class="close" id="closeDelete">x</h1>
            <div class="confirmContent">
                <div id="tituloDelete">
                    <h2>Tem certeza que deseja deletar?</h2>
                </div>
                <div class="botoes">
                    <button class="cancelar text-white" id="cancelarDelete">Cancelar</button>
                    <button id="deletar" class="text-white">Deletar</button>
                </div>
            </div>
        </div>
        `;
    const deleteButton = document.querySelector("#deletar");
    deleteButton.addEventListener("click", () => {
      deletarTarefa(info);
    });
    const cancelarDelete = document.querySelector("#closeDelete");
    cancelarDelete.addEventListener("click", () => {
      const confirmacao = document.querySelector("#editCon");
      confirmacao.style.display = "none";
      edit.innerHTML = `
      <div class="bg-white w-52 p-2 flex flex-col gap-2 justify-content-between rounded">
      <div class="relative gap-2">
        <h1 class="close" id="closeEdit">x</h1>
        <div class="confirmContent">
          <div id="divButtons" class="flex flex-row">
            <button id="btnEditar" class="bg-blue-500 p-2 rounded text-white">Editar</button>
            <button id="btnDeletar" class="bg-red-500 p-2 rounded text-white">Deletar</button>
          </div>
        </div>
      </div>
    `;
    });
    const cancelar = document.querySelector("#cancelarDelete");
    cancelar.addEventListener("click", () => {
      confirmacao.style.display = "none";
      edit.innerHTML = `
      <div class="bg-white w-52 p-2 flex flex-col gap-2 justify-content-between rounded">
      <div class="relative gap-2">
        <h1 class="close" id="closeEdit">x</h1>
        <div class="confirmContent">
          <div id="divButtons" class="flex flex-row">
            <button id="btnEditar" class="bg-blue-500 p-2 rounded text-white">Editar</button>
            <button id="btnDeletar" class="bg-red-500 p-2 rounded text-white">Deletar</button>
          </div>
        </div>
      </div>
    `;
    });
  });
}

const events = getTarefasSemanais(database);
document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  let calendar = new FullCalendar.Calendar(calendarEl, {
    height: 545,
    locale: "pt-Br",
    initialView: "dayGrid",
    events,
    eventDisplay: "block",
    defaultTimedEventDuration: "00:00:00",
    forceEventDuration: true,
    views: {
      dayGrid: {
        dayCount: 3,
        titleFormat: { day: "2-digit", month: "2-digit" },
      },
      dayGridWeek: {
        titleFormat: { day: "2-digit", month: "2-digit" },
      },
    },
    headerToolbar: {
      end: "prev,next dayGrid,dayGridWeek",
    },
    dateClick: function (info) {
      window.location.assign(
        `../view/cadastrarTarefa.html?screen=3&data=${info.dateStr}`
      );
    },
    eventClick: function (info) {
      popEditDelete(info);
    },
    eventDidMount: function (info) {
      const eventElement = info.el;
      const popover = document.createElement("div");
      popover.className = "popover";
      popover.innerHTML = `
                  <div class="popover-header">${info.event.title}</div>
                  <div class="popover-body flex justify-center">${
                    info.event.extendedProps.description
                      ? info.event.extendedProps.description
                      : "-"
                  }</div>
                `;
      eventElement.addEventListener("mouseover", function () {
        document.body.appendChild(popover);
        const popperInstance = Popper.createPopper(eventElement, popover, {
          placement: "top",
        });
        eventElement.addEventListener("mouseout", function () {
          document.body.removeChild(popover);
          popperInstance.destroy();
        });
      });
    },
  });
  calendar.render();
});
