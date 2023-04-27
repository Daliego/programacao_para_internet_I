async function createImage(text) {
    const image = document.createElement('img')
    image.style.width = '100%'
    image.src = `C:/Users/diego/Programação/ADS_2023.1/programacao_para_internet_I/exercicio_10/images/${text}.jpg`
    document.getElementById('imageLocalization').appendChild(image)
}

async function handleChange(event) {
    let imageName = event.target.value
    
    let imageLocalization = document.getElementById('imageLocalization')

    if (imageLocalization.firstChild != null) {
        imageLocalization.removeChild(imageLocalization.firstChild)

        await createImage(imageName)
    } else {
        await createImage(imageName)
    }

}

document.addEventListener('DOMContentLoaded', () => {
    let select = document.getElementById('imageName')
    select.addEventListener('change', handleChange)
})