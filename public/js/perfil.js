setTimeout(()=>{
    let loader = document.querySelector('#divLoader');
    let content = document.querySelector('section');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');
    loader.style.display = 'none'
    content.style.display = 'flex'
    header.style.display = 'flex'
    aside.style.display = 'flex'
}, 1800);

const database = JSON.parse(localStorage.getItem('database'))
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
let usersHours = JSON.parse(localStorage.getItem('hours'))
const userIndexTimePerfil = usersHours.usersHours.findIndex((x) => x.id == parseInt(userId));
populeteScreen(database)
getNotificacoes(database)
let vetUse = usersHours.usersHours[userIndexTimePerfil].hours
let dom = vetUse.shift()
vetUse.push(dom)
const ctx = document.getElementById('myChart');
const plugin = {
    id: 'myChart',
    beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#ffffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};
new Chart(ctx, {
    type: 'line',
    data: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
        label: 'Atividade da semana',
        data: vetUse,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#000000',
    }]
    },
    options: {
    plugins: {
        legend: {
            display: true,
            labels: {
                color: '#000000',
                // font: {
                //     size: 15
                // }
            },
        }
    },
},
plugins: [plugin],
});

// Adiciona os eventos 
const vacina = document.querySelector("#vacina .menu-icons")
vacina.addEventListener('click', ()=>{
    window.location.assign(`../view/vacinas.html`)
})
const rotina = document.querySelector("#rotina .menu-icons")
rotina.addEventListener('click', ()=>{
    window.location.assign(`../view/agendaSemanal.html`)
})
const pet = document.querySelector("#pet .menu-icons")
pet.addEventListener('click', ()=>{
    window.location.assign(`../view/pet.html`)
})
const calendario = document.querySelector("#calendario .menu-icons")
calendario.addEventListener('click', ()=>{
    window.location.assign(`../view/calendario.html`)
})
const cadastrarPet = document.querySelector("#adicionar")
cadastrarPet.addEventListener('click', ()=>{
    window.location.assign(`../view/cadastrarAnimais1.html?screen=1`)
})
const cadastrarTarefa = document.querySelector("#novaTarefa")
cadastrarTarefa.addEventListener('click', ()=>{
    window.location.assign(`../view/cadastrarTarefa.html?screen=1`)
})
const trashButtons = document.getElementsByClassName("trash")
let selectParentId
let selectChildId
Array.from(trashButtons).forEach((trash)=>{
    trash.addEventListener('click', ()=>{
        const confirmacao = document.querySelector("#deleteCon")
        confirmacao.style.display = 'flex'
        selectParentId = trash.parentNode.id
        selectChildId = trash.id
    })
})
const closeButton = document.querySelector("#closeDelete")
closeButton.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#deleteCon")
    confirmacao.style.display = 'none'
})
const cancelar = document.querySelector("#cancelarDelete")
cancelar.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#deleteCon")
    confirmacao.style.display = 'none'
})
const deletar = document.querySelector("#deletar")
deletar.addEventListener('click', ()=>{
    let cardPet = document.getElementById(selectParentId);
    cardPet.classList.add('hidden');
    let trash = document.getElementById(selectChildId);
    trash.classList.add('hidden');
    const confirmacao = document.querySelector("#deleteCon")
    confirmacao.style.display = 'none'
    setTimeout(()=>{
        cardPet.parentNode.removeChild(cardPet);
    }, 500)
    selectParentId = selectParentId.replace("cardPet", '')
    const newDatabasePets = database.users[userIndex].pets.filter(x => x.id != parseInt(selectParentId))
    database.users[userIndex].pets = newDatabasePets
    localStorage.removeItem("database")
    localStorage.setItem("database", JSON.stringify(database))
})

const editar = document.querySelector('#edit')
editar.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#editCon")
    const nome = document.querySelector('#nomeUserEdit')
    const email = document.querySelector('#emailEdit')
    const senha = document.querySelector('#senhaEdit')
    const conSenha = document.querySelector('#conSenhaEdit')
    nome.value = database.users[userIndex].nome
    email.value = database.users[userIndex].email
    senha.value = database.users[userIndex].senha
    conSenha.value = database.users[userIndex].senha
    teste()
    confirmacao.style.display = 'flex'
})

const closeButtonEdit = document.querySelector("#closeEdit")
closeButtonEdit.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#editCon")
    confirmacao.style.display = 'none'
})
const cancelarEdit = document.querySelector("#cancelarEdit")
cancelarEdit.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#editCon")
    confirmacao.style.display = 'none'
})

const salvar = document.querySelector("#salvar")
salvar.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#editCon")
    const nome = document.querySelector('#nomeUserEdit')
    const email = document.querySelector('#emailEdit')
    const senha = document.querySelector('#senhaEdit')
    const conSenha = document.querySelector('#conSenhaEdit')
    const alert = document.querySelector('#alert')
    const texto = document.querySelector('#alert h2')
    alert.style.transition = 'opacity 0s'
    const testEmailregex = /\S+@\S+\.\S+/
    if(!nome.value || !email.value || !senha.value || !conSenha.value){
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
        return
    }
    if(!testEmailregex.test(email.value)){
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "E-mail inválido"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        return
    }
    if(senha.value != conSenha.value){
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "Senhas incompatíveis"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        return
    }
    if(nome.value == database.users[userIndex].nome && 
        email.value == database.users[userIndex].email && 
        senha.value == database.users[userIndex].senha){
        alert.style.backgroundColor = '#ffc213'
        texto.textContent = "Nenhum dado alterado"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        confirmacao.style.display = 'none'
        return
    }
    if(database.users.find(x => x.nome == nome.value) && nome.value != database.users[userIndex].nome){
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "Nome de usuário já em uso"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        return
    }
    if(database.users.find(x => x.email == email.value) && email.value != database.users[userIndex].email){
        alert.style.backgroundColor = '#ff4747'
        texto.textContent = "E-mail já em uso"
        alert.style.display = 'flex'
        alert.style.opacity = '1'
        setTimeout(()=>{
            alert.style.transition = 'opacity 1.5s'
            alert.style.opacity = '0'
        }, 1500);
        setTimeout(()=>{
            alert.style.display = 'none'
        }, 3000);
        return
    }
    const updateUser = {
        ...database.users[userIndex],
        nome: nome.value,
        email: email.value,
        senha: senha.value,
    };
    database.users[userIndex] = updateUser
    localStorage.removeItem("database")
    localStorage.setItem("database", JSON.stringify(database))
    alert.style.backgroundColor = '#34cf71'
    texto.textContent = "Dados alterados com sucesso"
    alert.style.display = 'flex'
    alert.style.opacity = '1'
    const nomeperfilDiv = document.querySelector("#perfilDiv h3")
    nomeperfilDiv.textContent = updateUser.nome
    setTimeout(()=>{
        alert.style.transition = 'opacity 1.5s'
        alert.style.opacity = '0'
    }, 1500);
    setTimeout(()=>{
        alert.style.display = 'none'
    }, 3000);
    confirmacao.style.display = 'none'
})

const todos = document.querySelector("#todos")
const aFazer = document.querySelector("#aFazer")
const lembretes = document.querySelector("#lembretes")
const underline = document.querySelector("#underlineActive")
const underlineOutside = document.querySelector("#underline")
let leftOffset = -9
let width = 76
underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
underline.style.width = width + 'px'

todos.addEventListener('click', (event)=>{
    let leftOffset = -8
    let width = 76
    aFazer.classList.remove('activeTarefa')
    if(lembretes.classList[0] == 'activeTarefa'){
        leftOffset = -17
        width = 60
    }
    lembretes.classList.remove('activeTarefa')
    todos.classList.add('activeTarefa')
    const divTarefas = document.querySelector('#todasTarefas')
    const aFazerTarefas = document.querySelector("#aFazerTarefas")
    const lembretesTarefas = document.querySelector('#lembretesTarefas')
    const semTarefas = document.querySelector("#semTarefas")
    semTarefas.style.display = 'none'
    divTarefas.style.display = 'block'
    if(divTarefas.childElementCount == 0){
        divTarefas.style.display = 'none'
        semTarefas.style.display = 'flex'
    }
    aFazerTarefas.style.display = 'none'
    lembretesTarefas.style.display = 'none'
    if(underline.offsetWidth == 50) return
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
})
aFazer.addEventListener('click', (event)=>{
    todos.classList.remove('activeTarefa')
    lembretes.classList.remove('activeTarefa')
    aFazer.classList.add('activeTarefa')
    const divTarefas = document.querySelector('#todasTarefas')
    const aFazerTarefas = document.querySelector("#aFazerTarefas")
    const lembretesTarefas = document.querySelector('#lembretesTarefas')
    const semTarefas = document.querySelector("#semTarefas")
    semTarefas.style.display = 'none'
    aFazerTarefas.style.display = 'block'
    if(aFazerTarefas.childElementCount == 0){
        aFazerTarefas.style.display = 'none'
        semTarefas.style.display = 'flex'
    }
    divTarefas.style.display = 'none'
    lembretesTarefas.style.display = 'none'
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    let width = event.target.offsetWidth
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    width += 10
    underline.style.width = width + 'px'
})
lembretes.addEventListener('click', (event)=>{
    todos.classList.remove('activeTarefa')
    aFazer.classList.remove('activeTarefa')
    lembretes.classList.add('activeTarefa')
    const divTarefas = document.querySelector('#todasTarefas')
    const aFazerTarefas = document.querySelector("#aFazerTarefas")
    const lembretesTarefas = document.querySelector('#lembretesTarefas')
    const semTarefas = document.querySelector("#semTarefas")
    semTarefas.style.display = 'none'
    lembretesTarefas.style.display = 'block'
    if(lembretesTarefas.childElementCount == 0){
        lembretesTarefas.style.display = 'none'
        semTarefas.style.display = 'flex'
    }
    divTarefas.style.display = 'none'
    aFazerTarefas.style.display = 'none'
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    let width = event.target.offsetWidth
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    underline.style.width = event.target.offsetWidth + 'px'
})

function populeteScreen(data){
    const divPets = document.querySelector('#petsCard')
    const nomePerfil = document.querySelector('#perfilDiv h3')
    nomePerfil.textContent = data.users[userIndex].nome
    const pets = data.users[userIndex].pets.sort((a, b) => a.nome.localeCompare(b.nome))
    pets.forEach((value)=>{
        let cardPet = document.createElement("div")
        cardPet.classList.add('cardPet')
        cardPet.setAttribute('id', `cardPet${value.id}`)
        cardPet.style = ` background-color: ${value.cor}; background-image: url('${value.path}');`
        let nomePet = document.createElement('h3')
        nomePet.classList.add('nomePet')
        nomePet.textContent = value.nome
        let imagem = document.createElement('img')
        imagem.src = '../public/img/trash.svg'
        imagem.alt = 'excluir'
        imagem.classList.add('trash')
        imagem.id = `trash${value.id}`
        cardPet.appendChild(nomePet)
        cardPet.appendChild(imagem)
        divPets.append(cardPet)
    })
    let tarefas = pets.flatMap((x)=>[...x.tarefas])
    tarefas= tarefas.map((value)=>{
        return {
            ...value,
            nomePet: pets.find((x)=> value.petId == x.id)?.nome
        }
    })
    tarefas.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    const divTarefas = document.querySelector('#todasTarefas')
    tarefas.forEach((value)=>{
        const inicio = new Date(value.inicio)
        dataInicio = `${inicio.getDate()}/${inicio.getMonth()}/${inicio.getFullYear()}`
        let today = new Date()
        todayCompere = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`
        if(dataInicio < todayCompere) return
        let mes = inicio.toLocaleString('default', { month: 'short' })
        mes = mes.replace('.', '')
        mes = mes.charAt(0).toUpperCase() + mes.slice(1);
        const dia = inicio.getDate().toString().padStart(2, '0')
        let hora
        if(value.fim) { 
            const fim = new Date(value.fim)
            hora = `${inicio.getHours().toString().padStart(2, '0')}:${inicio.getMinutes().toString().padStart(2, '0')} - ${fim.getHours().toString().padStart(2, '0')}:${fim.getMinutes().toString().padStart(2, '0')}`
        }else{
            hora = `${inicio.getHours().toString().padStart(2, '0')}:${inicio.getMinutes().toString().padStart(2, '0')}`
        }
        const nomeTarefa = document.createElement('div')
        nomeTarefa.classList.add('nomeTarefa')
        const data = document.createElement('div')
        data.classList.add('data')
        const htmlDia = document.createElement('h5')
        htmlDia.textContent = dia
        const htmlMes = document.createElement('p')
        htmlMes.textContent = mes
        data.append(htmlDia, htmlMes)
        const descricao = document.createElement('div')
        if(!value.fim) descricao.classList.add('notFim')
        descricao.classList.add('descricao')
        const htmlNome = document.createElement('h5')
        htmlNome.textContent = value.nome
        const htmlPet = document.createElement('p')
        htmlPet.textContent = value.nomePet
        descricao.append(htmlNome, htmlPet)
        const divHora = document.createElement('div')
        divHora.classList.add('divHora')
        const htmlHora = document.createElement('p')
        htmlHora.textContent = hora
        divHora.append(htmlHora)
        nomeTarefa.append(data, descricao, divHora)
        divTarefas.append(nomeTarefa)
        if(inicio > today){
            const nomeTarefa = document.createElement('div')
            nomeTarefa.classList.add('nomeTarefa')
            const data = document.createElement('div')
            data.classList.add('data')
            const htmlDia = document.createElement('h5')
            htmlDia.textContent = dia
            const htmlMes = document.createElement('p')
            htmlMes.textContent = mes
            data.append(htmlDia, htmlMes)
            const descricao = document.createElement('div')
            if(!value.fim) descricao.classList.add('notFim')
            descricao.classList.add('descricao')
            const htmlNome = document.createElement('h5')
            htmlNome.textContent = value.nome
            const htmlPet = document.createElement('p')
            htmlPet.textContent = value.nomePet
            descricao.append(htmlNome, htmlPet)
            const divHora = document.createElement('div')
            divHora.classList.add('divHora')
            const htmlHora = document.createElement('p')
            htmlHora.textContent = hora
            divHora.append(htmlHora)
            nomeTarefa.append(data, descricao, divHora)
            const aFazerTarefas = document.querySelector("#aFazerTarefas")
            aFazerTarefas.append(nomeTarefa)
        }
        today.setDate(today.getDate() + 2)
        if(inicio >= today){
            const nomeTarefa = document.createElement('div')
            nomeTarefa.classList.add('nomeTarefa')
            const data = document.createElement('div')
            data.classList.add('data')
            const htmlDia = document.createElement('h5')
            htmlDia.textContent = dia
            const htmlMes = document.createElement('p')
            htmlMes.textContent = mes
            data.append(htmlDia, htmlMes)
            const descricao = document.createElement('div')
            if(!value.fim) descricao.classList.add('notFim')
            descricao.classList.add('descricao')
            const htmlNome = document.createElement('h5')
            htmlNome.textContent = value.nome
            const htmlPet = document.createElement('p')
            htmlPet.textContent = value.nomePet
            descricao.append(htmlNome, htmlPet)
            const divHora = document.createElement('div')
            divHora.classList.add('divHora')
            const htmlHora = document.createElement('p')
            htmlHora.textContent = hora
            divHora.append(htmlHora)
            nomeTarefa.append(data, descricao, divHora)
            const lembretesTarefas = document.querySelector("#lembretesTarefas")
            lembretesTarefas.append(nomeTarefa)
        }
    })
    const semTarefas = document.querySelector("#semTarefas")
    semTarefas.style.display = 'none'
    divTarefas.style.display = 'block'
    if(divTarefas.childElementCount == 0){
        divTarefas.style.display = 'none'
        semTarefas.style.display = 'flex'
    }
    const p = document.querySelectorAll("p");
    quebraLinha(p);
}

function quebraLinha(p) {
      p.forEach((value) => {
        const textoQuebrado = value.textContent.split("-");
        value.textContent = textoQuebrado.join("-\n");
      });
}

function getNotificacoes(db){
    const pets = db.users[userIndex].pets;
    let tarefas = pets.flatMap((x)=>[...x.tarefas])
    tarefas= tarefas.map((value)=>{
        const pet = pets.find((x)=> value.petId == x.id)
        return {
            ...value,
            nomePet: pet?.nome,
            tipo: pet?.tipo,
            path: pet?.path
        }
    })
    tarefas.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    tarefas.forEach((element) => {
        let data = new Date(element.inicio);
        let dataFim = ""
        if(element.fim){
            dataFim = new Date(element.fim);
            dataFim = `- ${dataFim.getHours().toString().padStart(2, '0')}:${dataFim.getMinutes().toString().padStart(2, '0')}`
        }
        data = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
        let today = new Date();
        let twoWeeks = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
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
        if (data > today && data < twoWeeks) {
            $("#todosNoti").append(`
            <div class='notifications'>
                <img src="${element.path}" alt="${element.nomePet}">
                <div class="tarefaNome">
                <p>${element.nome}</p>
            </div>
            <div class="status">
                <p class="diaTarefas">${new Date(element.inicio).getDate().toString().padStart(2, '0')} /${new Date(element.inicio).getMonth().toString().padStart(2, '0')} /${new Date(element.inicio).getFullYear()}</p>
                <p class="horaTarefas">${new Date(element.inicio).getHours().toString().padStart(2, '0')}:${new Date(element.inicio).getMinutes().toString().padStart(2, '0')} ${dataFim}</p>
            </div>
            </div>
            `);
        } 
    });
    const hojeDiv = document.querySelector("#hoje")
    const todosNoti = document.querySelector("#todosNoti")
    const notificacaoDiv = document.querySelector("#semNotificacoes")
    if(hojeDiv.childElementCount == 0){
        hojeDiv.style.display = 'none'
        notificacaoDiv.style.display = 'flex'
        if(todosNoti.childElementCount == 0){
            document.querySelector("#haveNotification").style.display = 'none'
        }
    }
    todosNoti.style.display = "none"
    addHover()
}

function addHover(){
  let notifications = document.querySelectorAll(".notifications")
  notifications.forEach((value) =>{
    img = value.querySelector('img')
    let alt = img.getAttribute('alt')
    let popup = document.querySelector('#alertNoti')
    let h2 = document.querySelector('#alertNoti h2')
    h2.textContent = alt
    popup.style.backgroundColor = "#282929"
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
    value.addEventListener('mouseout', ()=>{
      setTimeout(()=>{
        popup.style.transition = 'opacity 1.5s'
        popup.style.opacity = '0'
      }, 500);
      setTimeout(()=>{
        popup.style.display = 'none'
      }, 2000);
    })
  })
}

const notificacao = document.querySelector("#divNotificacao");
notificacao.addEventListener("click", () => {
  const popup = document.querySelector("#popup");
  if (popup.style.display == "none" || popup.style.display == "") {
    const popupPerfil = document.querySelector("#popupPerfil");
    popupPerfil.style.display = "none"
    popup.style.display = "flex";
  } else {
    popup.style.display = "none";
  }
});

const hoje = document.querySelector("#hojeNotificacao")
const todasNoti = document.querySelector("#todas")
const underlineNoti = document.querySelector("#underlineActiveNoti")
const underlineOutsideNoti = document.querySelector("#underlineNoti")
leftOffset = -1
width = 100
underlineNoti.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'

hoje.addEventListener('click', (event)=>{
    todasNoti.classList.remove('activeNotificacao')
    hoje.classList.add('activeNotificacao')
    let leftOffset = -10
    let width = 76
    if(underlineNoti.offsetWidth == 50) return
    underlineNoti.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    const hojeDiv = document.querySelector("#hoje")
    const todasNotiDiv = document.querySelector("#todosNoti")
    const notificacaoDiv = document.querySelector("#semNotificacoes")
    todasNotiDiv.style.display = "none"
    notificacaoDiv.style.display = 'none'
    if(hojeDiv.childElementCount == 0){
        hojeDiv.style.display = 'none'
        notificacaoDiv.style.display = 'flex'
    }else{
        hojeDiv.style.display = 'block'
    }
})
todasNoti.addEventListener('click', (event)=>{
    hoje.classList.remove('activeNotificacao')
    todasNoti.classList.add('activeNotificacao')
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    let width = event.target.offsetWidth
    underlineNoti.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    width += 10
    underlineNoti.style.width = width + 'px'
    const hojeDiv = document.querySelector("#hoje")
    const todasNotiDiv = document.querySelector("#todosNoti")
    const notificacaoDiv = document.querySelector("#semNotificacoes")
    hojeDiv.style.display = "none"
    notificacaoDiv.style.display = 'none'
    if(todasNotiDiv.childElementCount == 0){
        todasNotiDiv.style.display = 'none'
        notificacaoDiv.style.display = 'flex'
    }else{
        todasNotiDiv.style.display = 'block'
    }
})

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

const logout = document.querySelector('#logout')
logout.addEventListener('click',()=>{
    localStorage.removeItem('userId')
    location.assign('../index.html')
})