let database = JSON.parse(localStorage.getItem("database"))

if((window.location.href).includes('/view/cadastrarAnimais1.html')){
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
    cadastrar.addEventListener("click", ()=>{
        const url = new URL(window.location.href);
        const tipo = url.searchParams.get('tipo');;
        const path = url.searchParams.get('path');
        const nomAnimal = document.querySelector(".nomAnimal")
        const idadeAnimal = document.querySelector(".idadeAnimal")
        const pesoAnimal = document.querySelector(".pesoAnimal")
        const racaAnimal = document.querySelector(".racaAnimal")
        const cadastrar = document.querySelector("#cadastrar")
        database.user[0].newPetId += 1
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
            newVacinaId: 1,
            vacinas: []
        }
        database.user[0].pets.push(dados)
        database = JSON.stringify(database)
        localStorage.removeItem("database")
        localStorage.setItem("database", database)
        window.location.assign(`../view/vacinas.html`)
    })
}

