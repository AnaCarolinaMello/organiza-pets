let dados = {
    "newId": 2,
    "user":[
        {
            "id": 1,
            "nome": "userName",
            "newPetId": 2,
            "pets":[
                {
                    "id": 1,
                    "nome": "Bel",
                    "tipo": "Cão",
                    "path": "../public/img/dog.svg",
                    "idade": 1,
                    "peso": 25,
                    "raça": "Pastor Alemão",
                    "vacinaNewId": 4,
                    "vacinas": [
                        {
                            "id": 1,
                            "nome": "Raiva",
                            "data": "12/04/2022",
                            "dose": "1ª",
                            "repetir": "12/10/2022"
                        },
                        {
                            "id": 2,
                            "nome": "Raiva",
                            "data": "14/10/2022",
                            "dose": "2ª",
                            "repetir": "14/04/2023"
                        },
                        {
                            "id": 3,
                            "nome": "Raiva",
                            "data": "20/04/2023",
                            "dose": "3ª",
                            "repetir": "20/10/2023"
                        }
                    ],
                    "tarefaNewId": 6,
                    "cor": '#8568fc',
                    "tarefas": [
                    {
                        "id":1,
                        "nomeTarefa":"Passear",
                        "descricao":"Sair para passear com a Bel",
                        "inicio": "05/11/2023-15:00",
                        "fim":"05/11/2023-16:00"
                    },
                    {
                        "id":2,
                        "nomeTarefa":"Petshop",
                        "descricao":"Levar a Bel para tomar banho",
                        "inicio": "05/07/2023-09:00",
                        "fim":"05/07/2023-11:00"
                    },
                    {
                        "id":3,
                        "nomeTarefa":"Remédio",
                        "descricao":"Dar remédio para a Bel",
                        "inicio": "05/13/2023-14:00",
                        "fim":""
                    },
                    {
                        "id":4,
                        "nomeTarefa":"Marcar vet",
                        "descricao":"Marcar veterinário",
                        "inicio": "05/10/2023-19:00",
                        "fim":"05/10/2023-19:30"
                    },
                    {
                        "id":5,
                        "nomeTarefa":"Comida",
                        "descricao":"Colocar comida pra Bel",
                        "inicio": "05/12/2023-23:00",
                        "fim":""
                    },
                    {
                        "id":6,
                        "nomeTarefa":"Tapete",
                        "descricao":"Comprar tapete higienico",
                        "inicio": "05/16/2023-22:00",
                        "fim":"05/12/2023-22:30"
                    }
                ]
                },
                {
                    "id": 2,
                    "nome": "Galla",
                    "tipo": "Gato",
                    "path": "../public/img/cat.svg",
                    "idade": 2,
                    "peso": 6,
                    "raça": "Ciames",
                    "vacinaNewId": 7,
                    "vacinas": [
                        {
                            "id": 1,
                            "nome": "Raiva",
                            "data": "12/06/2021",
                            "dose": "1ª",
                            "repetir": "12/12/2021"
                        },
                        {
                            "id": 2,
                            "nome": "Tríplice Felina",
                            "data": "12/04/2021",
                            "dose": "1ª",
                            "repetir": ""
                        },
                        {
                            "id": 3,
                            "nome": "Raiva",
                            "data": "14/12/2021",
                            "dose": "2ª",
                            "repetir": "14/06/2022"
                        },
                        {
                            "id": 4,
                            "nome": "Quadravalente Felina",
                            "data": "12/06/2021",
                            "dose": "1ª",
                            "repetir": ""
                        },
                        {
                            "id": 5,
                            "nome": "Quintavalente Felina",
                            "data": "12/04/2022",
                            "dose": "1ª",
                            "repetir": ""
                        },
                        {
                            "id": 6,
                            "nome": "Raiva",
                            "data": "20/06/2022",
                            "dose": "3ª",
                            "repetir": ""
                        }
                    ],
                    "tarefaNewId": 5,
                    "cor": '#03b66bc5',
                    "tarefas": [{
                        "id":1,
                        "nomeTarefa":"Remédio",
                        "descricao":"Dar o remédio para a Galla",
                        "inicio": "05/08/2023-08:00",
                        "fim":""
                    },
                    {
                        "id":2,
                        "nomeTarefa":"Remédio",
                        "descricao":"Dar o remédio para a Gala",
                        "inicio": "05/08/2023-20:00",
                        "fim":""
                    },
                    {
                        "id":3,
                        "nomeTarefa":"Veterinário",
                        "descricao":"Levar a Galla para o veterinário",
                        "inicio": "05/09/2023-11:00",
                        "fim":"05/09/2023-12:00"
                    },
                    {
                        "id":4,
                        "nomeTarefa":"Comprar ração",
                        "descricao":"Comprar ração para a Galla",
                        "inicio": "05/10/2023-18:00",
                        "fim":""
                    },
                    {
                        "id":5,
                        "nomeTarefa":"Areia",
                        "descricao":"Comprar areia para a galla",
                        "inicio": "05/12/2023-09:00",
                        "fim":""
                    }
                ]
                }
            ]
        }
    ]
}                            

dados = JSON.stringify(dados)
if(!(localStorage.getItem('database'))){
    localStorage.setItem('database', dados);
}