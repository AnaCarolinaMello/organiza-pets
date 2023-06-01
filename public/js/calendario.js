const menu_icon = document
  .querySelector("#calendario")
  .querySelector(".menu-icons");
menu_icon.style.background = "#74e8b7";

const database = JSON.parse(localStorage.getItem("database"));
getTarefasSemanais(database);

const perfil = document.querySelector("#perfil .menu-icons")
perfil.addEventListener('click', ()=>{
    window.location.assign(`../view/perfil.html`)
})
const rotina = document.querySelector("#rotina .menu-icons")
rotina.addEventListener('click', ()=>{
    window.location.assign(`../view/agendaSemanal.html`)
})
const vacina = document.querySelector("#vacina .menu-icons")
vacina.addEventListener('click', ()=>{
    window.location.assign(`../view/vacinas.html`)
})
const comida = document.querySelector("#comida .menu-icons")
comida.addEventListener('click', ()=>{
    window.location.assign(`../view/comida.html`)
})

function getTarefasSemanais(db) {
  let events = [];
  console.log(database);
  const pets = db.user[0].pets;
  console.log(pets);

  pets.forEach((value) => {
    value.tarefas.forEach((element) => {
      let data = element.inicio;
      const parteData = data.split("-")[0];
      const formatada = parteData.split("/");
      let ano = formatada[2];
      let mes = formatada[0];
      let dia = formatada[1];
      let dataFormatada = ano + "-" + mes + "-" + dia;
      let evento = {
        title: element.nome,
        start: dataFormatada,
      };
      events.push(evento);
    });
  });
  return events;
}
