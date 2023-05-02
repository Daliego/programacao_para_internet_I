const button = document.querySelector('button')
const input = document.querySelector('input')
const list = document.getElementById('list')


function handleEnter(event) {
    if (event.key == 'Enter') {
        let text = input.value

        if (text.trim() == '') {
            alert("Type something")
            return
        } 

        const insideInput = document.createElement('input')
        const checkBox = document.createElement('div')

        insideInput.type = 'checkbox'
        checkBox.innerHTML = text
        
        
        
        const del = document.createElement('button')
        button.innerHTML = 'Click to del'
        
        del.addEventListener('click', () => {
            list.removeChild(del.parentElement)
        }) 

        
        checkBox.appendChild(insideInput)
        checkBox.appendChild(del)
        list.appendChild(checkBox)

        insideInput.addEventListener('change', (event) => {
            if (event.target.checked) {
                list.removeChild(checkBox)
            } 
        })
    }
}

document.addEventListener('keydown', (event) => handleEnter(event))