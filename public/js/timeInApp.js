
let databaseTime = JSON.parse(localStorage.getItem("hours"));
const userIdTime = localStorage.getItem("userId");
const userIndexTime = databaseTime.usersHours.findIndex((x) => x.id == parseInt(userIdTime));
if(!databaseTime && userIdTime){
    let horas = {
        id: userIdTime,
        hours: [0, 0, 0, 0, 0, 0, 0],
    }
    localStorage.setItem("hours", JSON.stringify({
        usersHours: []
    }))
    let dataHora = JSON.parse(localStorage.getItem("hours"))
    dataHora.usersHours.push(horas)
    localStorage.setItem('hours', JSON.stringify(dataHora))
    usersHours = JSON.parse(localStorage.getItem('hours'))
}else if(!userIdTime){
    location.assign('../index.html')
}

if (userIndexTime != -1 && userIdTime != null) {
    marckStratHour()
}

function marckStratHour(){
    const horaAtual = new Date();
    if(!localStorage.getItem('horaInicial') && localStorage.getItem('userId')){
        localStorage.setItem('horaInicial', horaAtual)
    }
    if(!databaseTime.usersHours[userIndexTime].hours && userIdTime){
        let horas = {
            id: userIdTime,
            hours: [0, 0, 0, 0, 0, 0, 0],
        }
        if(!localStorage.getItem("hours")){
            localStorage.setItem("hours", JSON.stringify({
              usersHours: []
            }))
        }
        let dataHora = JSON.parse(localStorage.getItem("hours"))
        dataHora.usersHours.push(horas)
        localStorage.removeItem('hours')
        localStorage.setItem('hours', JSON.stringify(dataHora))
        usersHours = JSON.parse(localStorage.getItem('hours'))
    }
    if(userIdTime){
        if(horaAtual.getDay() == 1 && !localStorage.getItem('updated')){
            databaseTime.usersHours[userIndexTime].hours = [0, databaseTime.users[userIndexTime].hours[1], 0, 0, 0, 0, 0]
            databaseTime = JSON.stringify(databaseTime);
            localStorage.removeItem('hours')
            localStorage.setItem('hours', JSON.stringify(databaseTime))
            localStorage.setItem('updated', true)
        }else if(horaAtual.getDay() != 1){
            localStorage.removeItem('updated')
        }
    }
}

window.addEventListener('beforeunload', ()=>{
    let horaFinal = new Date();
    if(!localStorage.getItem('horaInicial') || !userIdTime) return
    let horaInicial = new Date(localStorage.getItem('horaInicial'));
    if(horaFinal.getDay() != horaInicial.getDay()){
        let diaUm = 24 - (parseInt(horaInicial.getHours()) + parseInt(horaInicial.getMinutes()) / 60)
        let diaDois = parseInt(horaFinal.getHours()) + parseInt(horaFinal.getMinutes()) / 60
        databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()] = diaUm + databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()]
        databaseTime.usersHours[userIndexTime].hours[horaFinal.getDay()] = databaseTime.usersHours[userIndexTime].hours[horaFinal.getDay()] + diaDois
        localStorage.removeItem('hours')
        localStorage.setItem('hours', JSON.stringify(databaseTime))
    }else{
        let diferencaTempo = horaFinal - horaInicial;
        let horasPassadas = diferencaTempo / (1000 * 60 * 60);
        databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()] = databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()] + horasPassadas
        localStorage.removeItem('hours')
        localStorage.setItem('hours', JSON.stringify(databaseTime))
    }
    localStorage.removeItem('horaInicial')
});

function teste(){
    let horaFinal = new Date();
    if(!localStorage.getItem('horaInicial')) return
    let horaInicial = new Date(localStorage.getItem('horaInicial'));
    if(horaFinal.getDay() != horaInicial.getDay()){
        let diaUm = 24 - (parseInt(horaInicial.getHours()) + parseInt(horaInicial.getMinutes()) / 60)
        let diaDois = parseInt(horaFinal.getHours()) + parseInt(horaFinal.getMinutes()) / 60
        databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()] = diaUm + databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()]
        databaseTime.usersHours[userIndexTime].hours[horaFinal.getDay()] = databaseTime.usersHours[userIndexTime].hours[horaFinal.getDay()] + diaDois
        localStorage.removeItem('hours')
        localStorage.setItem('hours', JSON.stringify(databaseTime))
    }else{
        let diferencaTempo = horaFinal - horaInicial;
        let horasPassadas = diferencaTempo / (1000 * 60 * 60);
        databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()] = databaseTime.usersHours[userIndexTime].hours[horaInicial.getDay()] + horasPassadas
        localStorage.removeItem('hours')
        localStorage.setItem('hours', JSON.stringify(databaseTime))
    }
    localStorage.removeItem('horaInicial')
}