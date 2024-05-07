const main = document.querySelector('main')
const root = document.querySelector(':root') // ":" busca no css
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll('.charKey').forEach(function (charKeyBtn) { //"." seleciona classes
    charKeyBtn.addEventListener('click', function () {
        const value = charKeyBtn.dataset.value //cria um value que recebe o valor dos data(dataset) presentes no charKeys
        input.value += value //acrescenta no input os valores

    })
})

document.getElementById('clear').addEventListener('click', function () {
    input.value = '' //após click, será limpado
    input.focus()//ele foca o cursor no input
})

document.getElementById('equal').addEventListener('click', calculate)


input.addEventListener('keydown', function (ev) {
    ev.preventDefault()
    if (allowedKeys.includes(ev.key)) { //ev.key a tecla pressionada
        input.value += ev.key //no espaço input, será acrescentada a tecla pressionada
        return
    }
    if (ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1) //posição inicial até a penultima posição
    }
    if (ev.key === 'Enter') {
        calculate()
    }
})

function calculate() {
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')

    const result = eval(input.value) // função perigosa pois permite o usuario acessar dados sensiveis (vulnerabilidades)
    
    resultInput.value = result
    resultInput.classList.remove('error')
}

document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
    const button = ev.currentTarget
    if (button.innerText === 'Copy') {
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)

    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})



document.getElementById('themeSwitcher').addEventListener('click', function () {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'

    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'

    }
})