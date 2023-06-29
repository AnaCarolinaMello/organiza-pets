let database = JSON.parse(localStorage.getItem("database"));
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

if (window.location.href.includes("/view/cadastrarAnimais1.html")) {
  setTimeout(() => {
    let loader = document.querySelector("#divLoader");
    let content = document.querySelector("main");
    loader.style.display = "none";
    content.style.display = "flex";
  }, 1800);
  const dog = document.querySelector("#dog");
  const cat = document.querySelector("#cat");
  const outro = document.querySelector("#outro");
  const url = new URL(window.location.href);
  const screen = url.searchParams.get("screen");
  const voltar = document.querySelector('#textVoltar')

  dog.addEventListener("click", () => {
    window.location.assign(
      `../view/cadastrarAnimais2.html?tipo=cachorro&path=../public/img/dog.svg&screen=${screen}`
    );
  });
  cat.addEventListener("click", () => {
    window.location.assign(
      `../view/cadastrarAnimais2.html?tipo=gato&path=../public/img/cat.svg&screen=${screen}`
    );
  });
  outro.addEventListener("click", () => {
    window.location.assign(
      `../view/cadastrarAnimais2.html?tipo=outro&path=../public/img/paw.svg&screen=${screen}`
    );
  });
  voltar.addEventListener('click',()=>{
    if(parseInt(screen) == 1){
      window.location.assign("../view/perfil.html");
    }else if(parseInt(screen) == 2){
      window.location.assign("../view/pet.html");
    }
  })
}

if (window.location.href.includes("/view/cadastrarAnimais2.html")) {
  const cadastrar = document.querySelector("#cadastrar");
  const url = new URL(window.location.href);
  const screen = url.searchParams.get("screen");
  cadastrar.addEventListener("click", () => {
    const tipo = url.searchParams.get("tipo");
    const path = url.searchParams.get("path");
    const nomAnimal = document.querySelector(".nomAnimal");
    const idadeAnimal = document.querySelector(".idadeAnimal");
    const pesoAnimal = document.querySelector(".pesoAnimal");
    const racaAnimal = document.querySelector(".racaAnimal");
    const alert = document.querySelector('#alert')
    const texto = document.querySelector('#alert h2')
    alert.style.transition = 'opacity 0s'
    if (!tipo || !path) {
      alert.style.backgroundColor = '#ff4747'
      texto.textContent = "Pet cadastrado incorretamente, tente novamente mais tarde"
      alert.style.display = 'flex'
      alert.style.opacity = '1'
      setTimeout(()=>{
          alert.style.transition = 'opacity 1.5s'
          alert.style.opacity = '0'
      }, 1500);
      setTimeout(()=>{
          alert.style.display = 'none'
      }, 3000);
      return;
    } else if (!nomAnimal.value || !idadeAnimal.value || !pesoAnimal.value) {
      alert.style.backgroundColor = '#ff4747'
      texto.textContent = "Digite todos os dados necessários"
      alert.style.display = 'flex'
      alert.style.opacity = '1'
      setTimeout(()=>{
          alert.style.transition = 'opacity 1.5s'
          alert.style.opacity = '0'
      }, 1500);
      setTimeout(()=>{
          alert.style.display = 'none'
      }, 3000);
      return;
    }
    database.users[userIndex].newPetId = 1 + database.users[userIndex].newPetId;
    cor =
      "#" +
      Math.floor(Math.random() * 0x1000000)
        .toString(16)
        .padStart(6, "0");
    let dados = {
      id: database.users[userIndex].newPetId,
      nome: nomAnimal.value,
      idade: idadeAnimal.value,
      peso: pesoAnimal.value,
      raça: racaAnimal.value,
      tipo: tipo,
      path: path,
      cor: cor,
      tarefaNewId: 0,
      tarefas: [],
      vacinaNewId: 0,
      vacinas: [],
    };
    database.users[userIndex].pets.push(dados);
    database = JSON.stringify(database);
    localStorage.removeItem("database");
    localStorage.setItem("database", database);
    if(parseInt(screen) == 1){
      window.location.assign(`../view/perfil.html`);
    }else{
      window.location.assign(`../view/pet.html`);
    }
  });
  const voltar = document.querySelector('#textVoltar')
  voltar.addEventListener('click',()=>{
    location.assign(`./cadastrarAnimais1.html?screen=${screen}`)
  })
}
