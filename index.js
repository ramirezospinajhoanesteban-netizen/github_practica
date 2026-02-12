const button = document.createElement('button')
button.innerText = 'Click me'

function handleClick() {
    alert('Clicked')
}

button.addEventListener('click', handleClick)

document.body.appendChild(button)
