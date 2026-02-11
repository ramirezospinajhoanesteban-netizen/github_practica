const button = document.createElement('button')
button.innerText = 'click me'
function handleclick(){
    alert('clicked')
}

button.addEventListener('click', function(){
    alert('clicked')
})
