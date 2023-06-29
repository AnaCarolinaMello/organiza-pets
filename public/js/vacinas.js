setTimeout(() => {
  let loader = document.querySelector("#divLoader");
  let content = document.querySelector("section");
  let header = document.querySelector("header");
  let aside = document.querySelector("aside");
  loader.style.display = "none";
  content.style.display = "flex";
  header.style.display = "flex";
  aside.style.display = "flex";
}, 1800);

const menu_icon = document
  .querySelector("#vacina")
  .querySelector(".menu-icons");
menu_icon.style.background = "#74e8b7";
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
getVacinas(database);
getNotificacoes(database);

const perfil = document.querySelector("#perfil .menu-icons");
perfil.addEventListener("click", () => {
  window.location.assign(`../view/perfil.html`);
});
const rotina = document.querySelector("#rotina .menu-icons");
rotina.addEventListener("click", () => {
  window.location.assign(`../view/agendaSemanal.html`);
});
const calendario = document.querySelector("#calendario .menu-icons");
calendario.addEventListener("click", () => {
  window.location.assign(`../view/calendario.html`);
});
const pet = document.querySelector("#pet .menu-icons");
pet.addEventListener("click", () => {
  window.location.assign(`../view/pet.html`);
});

function getVacinas(db) {
  const divVacinas = document.querySelector("#vacinas");
  const pets = db.users[userIndex].pets;
  pets.forEach((value) => {
    divVacinas.innerHTML += `<div class="tituloTabela">
            <div class="lateralEsquerdo">
                <div class="divFotoPet">
                    <img src="${value.path}" alt="${value.tipo}" class="fotoPet">
                </div>
                <h1>${value.nome}</h1>
            </div>
            <div>
                <img src="../public/img/adicionar.svg" alt="adicionar" class="adicionar" id="adicionar${value.id}">
            </div>
        </div>
        <div class="tabela" id="tabela${value.id}">
            <div class="dataTabela" id="dataTabela${value.id}">
                <div class="tamanhoElementoTitulo">
                    <h3>Data</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
            <div class="nomeTabela" id="nomeTabela${value.id}">
                <div class="tamanhoElementoTitulo">
                    <h3>Nome</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
            <div class="doseTabela" id="doseTabela${value.id}">
                <div class="tamanhoElementoTitulo">
                    <h3>Dose</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
            <div class="repetirTabela" id="repetirTabela${value.id}">
                <div class="tamanhoElementoTitulo" id="tamanhoRepetirTitulo">
                    <h3 id="first">Repetir</h3>
                    <h3 id="second">em</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
            <div class="acao" id="acao${value.id}">
                <div class="tamanhoElementoTitulo">
                    <h3>Ações</h3>
                </div>
                <div class="tituloBorda"></div>
            </div>
        </div>`;
    const dataTabela = document.querySelector(`#dataTabela${value.id}`);
    const nomeTabela = document.querySelector(`#nomeTabela${value.id}`);
    const doseTabela = document.querySelector(`#doseTabela${value.id}`);
    const repetirTabela = document.querySelector(`#repetirTabela${value.id}`);
    const acoes = document.querySelector(`#acao${value.id}`);
    value.vacinas.forEach((element) => {
      dataTabela.innerHTML += `
            <div class="tamanhoElemento" id="data${element.id}Pet${value.id}">
                <p>${element.data}</p>
            </div>
            <div class="borda borda${element.id}Pet${value.id}"></div>`;
      nomeTabela.innerHTML += `
            <div class="tamanhoElemento" id="nome${element.id}Pet${value.id}">
                <p>${element.nome}</p>
            </div>
            <div class="borda borda${element.id}Pet${value.id}"></div>`;
      doseTabela.innerHTML += `
            <div class="tamanhoElemento" id="dose${element.id}Pet${value.id}">
                <p>${element.dose}</p>
            </div>
            <div class="borda borda${element.id}Pet${value.id}"></div>`;
      repetirTabela.innerHTML += `
            <div class="tamanhoElemento" id="repetir${element.id}Pet${value.id}">
                <p>${element.repetir}</p>
            </div>
            <div class="borda borda${element.id}Pet${value.id}"></div>`;
      acoes.innerHTML += `
            <div class="tamanhoElemento divAcao" id="acao${element.id}Pet${value.id}">
                <img src="../public/img/edit.svg" alt="editar" id="editar${value.id}" class="edit">
                <img src="../public/img/trash.svg" alt="trash" id="trash${value.id}" class="trash">
            </div>
            <div class="borda borda${element.id}Pet${value.id}"></div>`;
    });
    const p = document.querySelectorAll("p");
    quebraLinha(p);
  });
  addClicks(pets);
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
    let dataCompare = data
    data = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    let today = new Date();
    let todayCompare = today
    let oneWeek = new Date();
    oneWeek.setDate(today.getDate() + 4)
    today = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
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
    if (dataCompare.getTime() > todayCompare.getTime() && dataCompare.getTime() < oneWeek.getTime()) {
      let month = new Date(element.inicio).getMonth() + 1
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
                  .padStart(2, "0")} /${month
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

function quebraLinha(p) {
  if (window.innerWidth <= 1132) {
    p.forEach((value) => {
      const textoQuebrado = value.textContent.split("/");
      value.textContent = textoQuebrado.join("/\n");
    });
  }
}

function addClicks(pets) {
  let adicionar;
  pets.forEach((value) => {
    adicionar = document.querySelector(`#adicionar${value.id}`);
    adicionar.addEventListener("click", () => {
      window.location.assign(`../view/cadastrarVacina.html?petId=${value.id}`);
    });
  });
}

const mediaQueryList = window.matchMedia("(max-width: 1132px)");
mediaQueryList.addListener(function (mediaQueryList) {
  if (mediaQueryList.matches) {
    const p = document.querySelectorAll("p");
    quebraLinha(p);
  }
});

const closeButton = document.querySelector("#closeDelete");
closeButton.addEventListener("click", () => {
  const confirmacao = document.querySelector("#deleteCon");
  confirmacao.style.display = "none";
});
const cancelar = document.querySelector("#cancelarDelete");
cancelar.addEventListener("click", () => {
  const confirmacao = document.querySelector("#deleteCon");
  confirmacao.style.display = "none";
});
const deletar = document.querySelector("#deletar");
deletar.addEventListener("click", () => {
  let petId = selectParentId.split("Pet");
  vacinaId = petId[0].split("acao");
  petId = petId[1];
  vacinaId = vacinaId[1];
  const choosePetIndex = database.users[userIndex].pets.findIndex(
    (x) => x.id == petId
  );
  const newVacina = database.users[userIndex].pets[
    choosePetIndex
  ].vacinas.filter((x) => x.id != parseInt(vacinaId));
  database.users[userIndex].pets[choosePetIndex].vacinas = newVacina;
  const data = document.querySelector(`#data${vacinaId}Pet${petId}`);
  const nome = document.querySelector(`#nome${vacinaId}Pet${petId}`);
  const dose = document.querySelector(`#dose${vacinaId}Pet${petId}`);
  const repetir = document.querySelector(`#repetir${vacinaId}Pet${petId}`);
  const acao = document.querySelector(`#acao${vacinaId}Pet${petId}`);
  const bordas = document.getElementsByClassName(`borda${vacinaId}Pet${petId}`);
  const confirmacao = document.querySelector("#deleteCon");
  confirmacao.style.display = "none";
  data.parentNode.removeChild(data);
  nome.parentNode.removeChild(nome);
  dose.parentNode.removeChild(dose);
  repetir.parentNode.removeChild(repetir);
  acao.parentNode.removeChild(acao);
  Array.from(bordas).forEach((borda) => {
    borda.parentNode.removeChild(borda);
  });
  localStorage.removeItem("database");
  localStorage.setItem("database", JSON.stringify(database));
  const alert = document.querySelector("#alert");
  const texto = document.querySelector("#alert h2");
  alert.style.transition = "opacity 0s";
  alert.style.backgroundColor = "#34cf71";
  texto.textContent = "Vacina deletada com sucesso";
  alert.style.display = "flex";
  alert.style.opacity = "1";
  setTimeout(() => {
    alert.style.transition = "opacity 1.5s";
    alert.style.opacity = "0";
  }, 1500);
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
});

const trashButtons = document.getElementsByClassName("trash");
let selectParentId;
let selectChildId;
Array.from(trashButtons).forEach((trash) => {
  trash.addEventListener("click", () => {
    const confirmacao = document.querySelector("#deleteCon");
    confirmacao.style.display = "flex";
    selectParentId = trash.parentNode.id;
    selectChildId = trash.id;
  });
});

const closeButtonEdit = document.querySelector("#closeEdit");
closeButtonEdit.addEventListener("click", () => {
  const confirmacao = document.querySelector("#editCon");
  confirmacao.style.display = "none";
});
const cancelarEdit = document.querySelector("#cancelarEdit");
cancelarEdit.addEventListener("click", () => {
  const confirmacao = document.querySelector("#editCon");
  confirmacao.style.display = "none";
});

const editar = document.querySelector("#salvar");
editar.addEventListener("click", () => {
  const confirmacao = document.querySelector("#editCon");
  const nome = document.querySelector("#nomeEdit");
  const data = document.querySelector("#dataEdit");
  const dose = document.querySelector("#doseEdit");
  const repetir = document.querySelector("#repetirEdit");
  const alert = document.querySelector("#alert");
  const texto = document.querySelector("#alert h2");
  alert.style.transition = "opacity 0s";
  let petId = selectParentId.split("Pet");
  vacinaId = petId[0].split("acao");
  petId = petId[1];
  vacinaId = vacinaId[1];
  const choosePetIndex = database.users[userIndex].pets.findIndex(
    (x) => x.id == petId
  );
  const chooseVacinaIndex = database.users[userIndex].pets[
    choosePetIndex
  ].vacinas.findIndex((x) => x.id == vacinaId);
  if (chooseVacinaIndex == -1 || choosePetIndex == -1) {
    alert.style.backgroundColor = "#ff4747";
    texto.textContent = "Ocorreu um erro, tente de novo mais tarde";
    alert.style.display = "flex";
    alert.style.opacity = "1";
    setTimeout(() => {
      alert.style.transition = "opacity 1.5s";
      alert.style.opacity = "0";
    }, 1500);
    setTimeout(() => {
      alert.style.display = "none";
    }, 3000);
    confirmacao.style.display = "none";
    return;
  }
  if (!nome.value || !data.value || !dose.value) {
    alert.style.backgroundColor = "#ff4747";
    texto.textContent = "Digite todos os dados necessários";
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
  let dataVacina = data.value.split("-");
  dataVacina = `${dataVacina[2]}/${dataVacina[1]}/${dataVacina[0]}`;
  let repetirVacina = "";
  if (repetir.value) {
    repetirVacina = repetir.value.split("-");
    repetirVacina = `${repetirVacina[2]}/${repetirVacina[1]}/${repetirVacina[0]}`;
  }
  if (
    nome.value ==
      database.users[userIndex].pets[choosePetIndex].vacinas[chooseVacinaIndex]
        .nome &&
    dataVacina ==
      database.users[userIndex].pets[choosePetIndex].vacinas[chooseVacinaIndex]
        .data &&
    dose.value ==
      database.users[userIndex].pets[choosePetIndex].vacinas[chooseVacinaIndex]
        .dose &&
    repetirVacina ==
      database.users[userIndex].pets[choosePetIndex].vacinas[chooseVacinaIndex]
        .repetir
  ) {
    alert.style.backgroundColor = "#ffc213";
    texto.textContent = "Nenhum dado alterado";
    alert.style.display = "flex";
    alert.style.opacity = "1";
    setTimeout(() => {
      alert.style.transition = "opacity 1.5s";
      alert.style.opacity = "0";
    }, 1500);
    setTimeout(() => {
      alert.style.display = "none";
    }, 3000);
    confirmacao.style.display = "none";
    return;
  }
  const updateVacina = {
    ...database.users[userIndex].pets[choosePetIndex].vacinas[
      chooseVacinaIndex
    ],
    nome: nome.value,
    data: dataVacina,
    dose: dose.value,
    repetir: repetirVacina,
  };
  database.users[userIndex].pets[choosePetIndex].vacinas[chooseVacinaIndex] =
    updateVacina;
  localStorage.removeItem("database");
  localStorage.setItem("database", JSON.stringify(database));
  alert.style.backgroundColor = "#34cf71";
  texto.textContent = "Dados alterados com sucesso";
  alert.style.display = "flex";
  alert.style.opacity = "1";
  const dataDivText = document.querySelector(`#data${vacinaId}Pet${petId} p`);
  const nomeDivText = document.querySelector(`#nome${vacinaId}Pet${petId} p`);
  const doseDivText = document.querySelector(`#dose${vacinaId}Pet${petId} p`);
  const repetirDivText = document.querySelector(
    `#repetir${vacinaId}Pet${petId} p`
  );
  dataDivText.textContent = updateVacina.data;
  nomeDivText.textContent = updateVacina.nome;
  doseDivText.textContent = updateVacina.dose;
  repetirDivText.textContent = updateVacina.repetir;
  setTimeout(() => {
    alert.style.transition = "opacity 1.5s";
    alert.style.opacity = "0";
  }, 1500);
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
  confirmacao.style.display = "none";
});

const editButtons = document.getElementsByClassName("edit");
Array.from(editButtons).forEach((edit) => {
  edit.addEventListener("click", () => {
    const confirmacao = document.querySelector("#editCon");
    confirmacao.style.display = "flex";
    selectParentId = edit.parentNode.id;
    selectChildId = edit.id;
    const nome = document.querySelector("#nomeEdit");
    const data = document.querySelector("#dataEdit");
    const dose = document.querySelector("#doseEdit");
    const repetir = document.querySelector("#repetirEdit");
    let petId = selectParentId.split("Pet");

    const alert = document.querySelector("#alert");
    const texto = document.querySelector("#alert h2");
    alert.style.transition = "opacity 0s";
    vacinaId = petId[0].split("acao");
    petId = petId[1];
    vacinaId = vacinaId[1];
    const choosePetIndex = database.users[userIndex].pets.findIndex(
      (x) => x.id == petId
    );
    const chooseVacinaIndex = database.users[userIndex].pets[
      choosePetIndex
    ].vacinas.findIndex((x) => x.id == vacinaId);
    if (chooseVacinaIndex == -1 || choosePetIndex == -1) {
      alert.style.backgroundColor = "#ff4747";
      texto.textContent = "Ocorreu um erro, tente de novo mais tarde";
      alert.style.display = "flex";
      alert.style.opacity = "1";
      setTimeout(() => {
        alert.style.transition = "opacity 1.5s";
        alert.style.opacity = "0";
      }, 1500);
      setTimeout(() => {
        alert.style.display = "none";
      }, 3000);
      confirmacao.style.display = "none";
      return;
    }
    const dataVacina =
      database.users[userIndex].pets[choosePetIndex].vacinas[
        chooseVacinaIndex
      ].data.split("/");
    if (
      database.users[userIndex].pets[choosePetIndex].vacinas[chooseVacinaIndex]
        .repetir
    ) {
      const repetirVacina =
        database.users[userIndex].pets[choosePetIndex].vacinas[
          chooseVacinaIndex
        ].repetir.split("/");
      repetir.value = `${repetirVacina[2]}-${repetirVacina[1]}-${repetirVacina[0]}`;
    }
    nome.value =
      database.users[userIndex].pets[choosePetIndex].vacinas[
        chooseVacinaIndex
      ].nome;
    data.value = `${dataVacina[2]}-${dataVacina[1]}-${dataVacina[0]}`;
    dose.value =
      database.users[userIndex].pets[choosePetIndex].vacinas[
        chooseVacinaIndex
      ].dose;
  });
});

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
const underline = document.querySelector("#underlineActiveNoti");
const underlineOutside = document.querySelector("#underlineNoti");
let leftOffset = -1;
let width = 100;
underline.style.transform =
  "translateX(" + leftOffset + "px) scaleX(" + width / 100 + ")";

hoje.addEventListener("click", (event) => {
  todas.classList.remove("activeNotificacao");
  hoje.classList.add("activeNotificacao");
  let leftOffset = -10;
  let width = 76;
  if (underline.offsetWidth == 50) return;
  underline.style.transform =
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
  underline.style.transform =
    "translateX(" + leftOffset + "px) scaleX(" + width / 100 + ")";
  width += 10;
  underline.style.width = width + "px";
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
