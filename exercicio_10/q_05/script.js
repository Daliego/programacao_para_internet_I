function handleChange() {
    const checkBoxes = document.getElementById('allCheckBoxes').children
    console.log(checkBoxes)
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].nodeName == 'INPUT') {
            if (checkBoxes[i].checked == true) {
                document.getElementById('result').innerHTML = 'Um checkBox foi marcado'
                return;
            }
        }
    }
    document.getElementById('result').innerHTML = 'Nenhum checkBox foi marcado'
}

document.addEventListener('DOMContentLoaded', () => {
    const checkBoxes = document.getElementById('allCheckBoxes')
    checkBoxes.addEventListener('change', handleChange)
})
