function toUpperCase(text) {
    if (!isNaN(text)) {
        alert("A character wasn't typed")
        return 'Be smarter next timer'
    } else {
        let newText = ''
        for (let i = 0; i < text.length; i++) {
            newText += text[i].toUpperCase()
        }
    }
}

function matchOption(event, text) {
    let option = event.target.value
    if (option == 'maiusculo') {
        document.getElementById('result').innerHTML = text.toUpperCase()
    } else if (option == 'minusculo') {
        document.getElementById('result').innerHTML = text.toLowerCase()

    }
}

function optionReset(event) {
    let option = document.getElementById('selection')
    document.getElementById('selection').
    console.log(option)
}

function handleChange(event) {
    const text = document.getElementById('text').value
    if (text == '') {
        alert("Você não digitou texto nenhum")
        //optionReset(event)
    } else {
        matchOption(event, text)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const selectOption = document.getElementById('selection')
    selectOption.addEventListener('change', (event) => handleChange(event))
})
