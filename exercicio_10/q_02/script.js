function handleClickSoma() {
    let firstNumber = document.getElementById('firstNumber').value
    let secondNumber = document.getElementById('secondNumber').value
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        alert("Você digitou algum caractere diferente de um algarismo.")
    } else if (firstNumber == '' || secondNumber == '') {
        alert("Você deixou de digitar algum número.")
    } else {
        const result = Number(firstNumber) + Number(secondNumber)
        document.getElementById('contentResult').innerHTML += ` ${result}`
    }
}

function handleClickSubtracao() {
    let firstNumber = document.getElementById('firstNumber').value
    let secondNumber = document.getElementById('secondNumber').value
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        alert("Você digitou algum caractere diferente de um algarismo.")
    } else if (firstNumber == '' || secondNumber == '') {
        alert("Você deixou de digitar algum número.")
    } else {
        const result = Number(firstNumber) - Number(secondNumber)
        document.getElementById('contentResult').innerHTML += ` ${result}`
    }
}



document.addEventListener('DOMContentLoaded', () => {
    let somar = document.getElementById('soma')
    somar.addEventListener('click', handleClickSoma)
    let subtrair = document.getElementById('subtracao')
    subtrair.addEventListener('click', handleClickSubtracao)
});