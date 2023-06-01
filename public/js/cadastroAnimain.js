let database = JSON.parse(localStorage.getItem("database"))

if((window.location.href).includes('/view/cadastrarAnimais1.html')){
    setTimeout(()=>{
        let loader = document.querySelector('#divLoader');
        let content = document.querySelector('main');
        loader.style.display = 'none'
        content.style.display = 'flex'
      }, 1800);
    const dog = document.querySelector("#dog")
    const cat = document.querySelector("#cat")
    const outro = document.querySelector("#outro")

    dog.addEventListener("click", ()=>{
        window.location.assign(`../view/cadastrarAnimais2.html?tipo=cachorro&path=../public/img/dog.svg`)
    })
    cat.addEventListener("click", ()=>{
        window.location.assign("../view/cadastrarAnimais2.html?tipo=gato&path=../public/img/cat.svg")
    })
    outro.addEventListener("click", ()=>{
        window.location.assign("../view/cadastrarAnimais2.html?tipo=outro&path=../public/img/paw.svg")
    })
}

if((window.location.href).includes('/view/cadastrarAnimais2.html')){
    const cadastrar = document.querySelector("#cadastrar")
    cadastrar.addEventListener("click", ()=>{
        const url = new URL(window.location.href);
        const tipo = url.searchParams.get('tipo');
        const path = url.searchParams.get('path');
        const nomAnimal = document.querySelector(".nomAnimal")
        const idadeAnimal = document.querySelector(".idadeAnimal")
        const pesoAnimal = document.querySelector(".pesoAnimal")
        const racaAnimal = document.querySelector(".racaAnimal")
        if(!tipo || !path){
            alert("Pet cadastrado incorretamente, tente novamente mais tarde")
            return
        }else if(!nomAnimal.value || !idadeAnimal.value || !pesoAnimal.value){
            alert("Digite todos os dados necessários")
            return
        }
        database.user[0].newPetId = 1 + database.user[0].newPetId
        cor = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')
        let dados = {
            id: database.user[0].newPetId,
            nome: nomAnimal.value,
            idade: idadeAnimal.value,
            peso: pesoAnimal.value,
            raca: racaAnimal.value,
            tipo: tipo,
            path: path,
            cor: cor,
            tarefaNewId: 0,
            tarefas: [],
            newVacinaId: 0,
            vacinas: []
        }
        database.user[0].pets.push(dados)
        database = JSON.stringify(database)
        localStorage.removeItem("database")
        localStorage.setItem("database", database)
        window.location.assign(`../view/perfil.html`)
    })
}

