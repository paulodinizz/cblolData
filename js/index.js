

let secaoJogos = document.querySelector('.secaoJogos')

const lerJogos = () => {
    fetch('jogos.json')
    .then( resposta => resposta.json() )
    .then( dados => dados.forEach((jogo, indice, jogos) => {

        let card = document.createElement('div')
        secaoJogos.appendChild(card)

        let cards = document.querySelectorAll('.secaoJogos div')

        cards[indice].innerHTML = `
            <h3>Semana ${jogo.semana} | Rodada ${jogo.rodada}</h3>
            <h2>${jogo.dia} ${jogo.data}</h2>
            ${gerarJogos(jogo)}
        `
    }))
}

function gerarJogos(jogo) {
    let jogo1 = jogo.jogos[0].split(' ')
    let jogo2 = jogo.jogos[1].split(' ')
    let jogo3 = jogo.jogos[2].split(' ')
    let jogo4 = jogo.jogos[3].split(' ')
    let jogo5 = jogo.jogos[4].split(' ')

    return this.innerHTML = `
    <figure>
        <span>% de vitória</span>
        <img class='logoJogos' src='./images/logos/${jogo1[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo1[2].toLowerCase()}.png' />
        <span>% de vitória</span>
    </figure>

    <figure>
        <span>% de vitória</span>
        <img class='logoJogos' src='./images/logos/${jogo2[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo2[2].toLowerCase()}.png' />
        <span>% de vitória</span>
    </figure>
        
    <figure>
        <span>% de vitória</span>
        <img class='logoJogos' src='./images/logos/${jogo3[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo3[2].toLowerCase()}.png' />
        <span>% de vitória</span>
    </figure>

    <figure>
        <span>% de vitória</span>
        <img class='logoJogos' src='./images/logos/${jogo4[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo4[2].toLowerCase()}.png' />
        <span>% de vitória</span>
    </figure>

    <figure>
        <span>% de vitória</span>
        <img class='logoJogos' src='./images/logos/${jogo5[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo5[2].toLowerCase()}.png' />
        <span>% de vitória</span>
    </figure>
    `
}

lerJogos()

let secaoJogo = document.querySelector('.secaoJogo')
let filtro = []

const lerJogosDoDia = (data) => {
    console.log('LER JOGOS DO DIA')
    fetch('jogos.json')
    .then( resposta => resposta.json() )
    .then( dados => dados.map((jogo, indice, jogos) => {

        filtro = jogos.filter( jogo => (jogo.data == data) )

        let card = document.createElement('div')
        secaoJogo.appendChild(card)

        let cards = document.querySelector('.secaoJogo div')

        cards.innerHTML = `
            <h2>Jogos do dia</h2>
            <h3>Semana ${filtro[0].semana} | Rodada ${filtro[0].rodada}</h3>
            <h2>${filtro[0].dia} ${filtro[0].data}</h2>
            ${gerarJogos(filtro[0])}
        `
    }))
}

function pegarData() {
    // manipular input e botao
    document.querySelector('#botaoBuscar').addEventListener('click', () => {
        let inputData = document.querySelector('.inputData').value

        let dataSeparada = inputData.split('-')
        let [ ano, mes, dia ] = dataSeparada
        let dataFormatada = `${dia}/${mes}/${ano}`

        if(inputData != '') {
            lerJogosDoDia(dataFormatada)
        }
    })
}

pegarData()

let secaoCards = document.querySelector('.secaoCards')

const criarCards = (id) => {
    fetch('times.json')
    .then( resposta => resposta.json())
    .then( dados => {
        let nomeJogador = document.querySelectorAll('.nomeJogador')
        let fotoJogador = document.querySelectorAll('.fotoJogador')

        let nomeTime = dados[id].sigla.toLowerCase()
        let time = dados[id]
        console.log(time)
        document.querySelector('#nomeDoTime').innerHTML = time.nome_completo

        nomeJogador[0].innerHTML = `${time.escalacao.topo}`
        nomeJogador[1].innerHTML = `${time.escalacao.selva}`
        nomeJogador[2].innerHTML = `${time.escalacao.meio}`
        nomeJogador[3].innerHTML = `${time.escalacao.atirador}`
        nomeJogador[4].innerHTML = `${time.escalacao.suporte}`

        let urlFoto = `./images/jogadores/${nomeTime}/`
        let fundo = document.querySelectorAll('.fundo')
        time.jogadores.forEach((jogador, indice) => {
            fotoJogador[indice].src = `${urlFoto}${jogador}.png`
            fundo[indice].style.backgroundImage = `url('./images/escudos/${nomeTime}.png')`
        })

    })
}

criarCards(0)

document.querySelector('#botaoVer').addEventListener('click', (evento) => {
    evento.preventDefault()
    let timeEscolhido = document.querySelector('.selecionaTime').value
    criarCards(timeEscolhido)
    console.log('teste');
})
