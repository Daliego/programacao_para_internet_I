function main() {
    let link = document.getElementById("googleSite")
    let button = document.getElementsByClassName("button")
    console.log(link)   
}

function handleClick() {
    let oldText = document.getElementById("text").textContent
    let text = "You clicked on the link"

    console.log("Before Text: " + oldText)

    document.getElementById("text").textContent = text
    
    console.log("After Text: " + text)
}

function handleBackClick() {
    let text = "You haven't clicked on the link"

    document.getElementById("text").textContent = text
}

function changeColor() {
    document.getElementById("buttons1").style.backgroundColor = "white"
    document.getElementById("buttons2").style.backgroundColor = "green"

}