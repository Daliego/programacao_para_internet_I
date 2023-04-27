async function createImage(text) {
    const image = document.createElement('img')
    image.style.width = '100%'
    image.src = `C:/Users/diego/Programação/ADS_2023.1/programacao_para_internet_I/exercicio_10/images/${text}.jpg`
    document.getElementById('imageLocalization').appendChild(image)
}

async function matchText(text) {
    switch (text) {
        case 'dogWithHat':
            await createImage(text)
            break;
        case 'pussInBoots':
            await createImage(text)
            break;
        case 'cuteAnimal':
            await createImage(text)
            break
        default:
            alert("The word doesn't match any of the shown words")
    }

}

function handleClick() {
    let imageName = document.getElementById('imageName').value
    let imageLocalization = document.getElementById('imageLocalization').firstChild

    if (imageName == '') {
        alert("You didn't type anything!!!")
    } else if (imageLocalization != null) {
        let element = document.getElementById('imageLocalization')

        element.removeChild(element.firstChild)

        matchText(imageName)
    } else {
        matchText(imageName)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('searchButton')
    button.addEventListener('click', handleClick)
})