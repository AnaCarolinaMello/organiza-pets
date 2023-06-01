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
populeteScreen(database)
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
        data: [12, 19, 3, 5, 2, 3, 1],
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
const comida = document.querySelector("#comida .menu-icons")
comida.addEventListener('click', ()=>{
    window.location.assign(`../view/comida.html`)
})
const calendario = document.querySelector("#calendario .menu-icons")
calendario.addEventListener('click', ()=>{
    window.location.assign(`../view/calendario.html`)
})
const cadastrarPet = document.querySelector("#adicionar")
cadastrarPet.addEventListener('click', ()=>{
    window.location.assign(`../view/cadastrarAnimais1.html`)
})
const cadastrarTarefa = document.querySelector("#novaTarefa")
cadastrarTarefa.addEventListener('click', ()=>{
    window.location.assign(`../view/cadastrarTarefa.html`)
})
const trashButtons = document.getElementsByClassName("trash")
let selectParentId
let selectChildId
Array.from(trashButtons).forEach((trash)=>{
    trash.addEventListener('click', ()=>{
        const confirmacao = document.querySelector("#confirmacao")
        confirmacao.style.display = 'flex'
        selectParentId = trash.parentNode.id
        selectChildId = trash.id
    })
})
const closeButton = document.querySelector("#close")
closeButton.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#confirmacao")
    confirmacao.style.display = 'none'
})
const cancelar = document.querySelector("#cancelar")
cancelar.addEventListener('click', ()=>{
    const confirmacao = document.querySelector("#confirmacao")
    confirmacao.style.display = 'none'
})
const deletar = document.querySelector("#deletar")
deletar.addEventListener('click', ()=>{
    let cardPet = document.getElementById(selectParentId);
    cardPet.classList.add('hidden');
    let trash = document.getElementById(selectChildId);
    trash.classList.add('hidden');
    const confirmacao = document.querySelector("#confirmacao")
    confirmacao.style.display = 'none'
    setTimeout(()=>{
        cardPet.parentNode.removeChild(cardPet);
    }, 500)
    selectParentId = selectParentId.replace("cardPet", '')
    const newDatabasePets = database.user[0].pets.filter(x => x.id != parseInt(selectParentId))
    database.user[0].pets = newDatabasePets
    localStorage.removeItem("database")
    localStorage.setItem("database", JSON.stringify(database))
})

const todos = document.querySelector("#todos")
const aFazer = document.querySelector("#aFazer")
const lembretes = document.querySelector("#lembretes")
const underline = document.querySelector("#underlineActive")
const underlineOutside = document.querySelector("#underline")
let leftOffset = -1
let width = 100
underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'

todos.addEventListener('click', (event)=>{
    aFazer.classList.remove('activeTarefa')
    lembretes.classList.remove('activeTarefa')
    todos.classList.add('activeTarefa')
    let leftOffset = -8
    let width = 76
    if(underline.offsetWidth == 50) return
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
})
aFazer.addEventListener('click', (event)=>{
    todos.classList.remove('activeTarefa')
    lembretes.classList.remove('activeTarefa')
    aFazer.classList.add('activeTarefa')
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
    let leftOffset = event.target.offsetLeft - event.currentTarget.parentNode.offsetLeft
    let width = event.target.offsetWidth
    underline.style.transform = 'translateX(' + leftOffset + 'px) scaleX(' + (width / 100) + ')'
    underline.style.width = event.target.offsetWidth + 'px'
})

function populeteScreen(data){
    const divPets = document.querySelector('#petsCard')
    const nomePerfil = document.querySelector('#perfilDiv h3')
    nomePerfil.textContent = data.user[0].nome
    const pets = data.user[0].pets.sort((a, b) => a.nome.localeCompare(b.nome))
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
    const divTarefas = document.querySelector('#listaTarefas')
    tarefas.forEach((value)=>{
        // let data = new Date(value.inicio)
        // data = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`
        // let today = new Date()
        // today = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`
        // if(data == today) console.log(value.inicio)
        const inicio = new Date(value.inicio)
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
    })
    const p = document.querySelectorAll("p");
    quebraLinha(p);
}

function quebraLinha(p) {
      p.forEach((value) => {
        const textoQuebrado = value.textContent.split("-");
        value.textContent = textoQuebrado.join("-\n");
      });
}
