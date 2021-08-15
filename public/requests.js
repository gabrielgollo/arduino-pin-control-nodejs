const turnLedOn = async () => {
    const response = await fetch('http://localhost:3300/pinport/13/on', {
        method: 'GET'
    })
    const elements = document.getElementsByClassName('led-red')
    for(element of elements){
        element.style.backgroundColor= '#F00';
    }
};

const turnLedOff = async () => {
    const response = await fetch('http://localhost:3300/pinport/13/off', {
        method: 'GET'
    })
    const elements = document.getElementsByClassName('led-red')
    for(element of elements){
        element.style.backgroundColor= "#A00"
    }
};

const toggleLed = async () => {
    const response = await fetch('http://localhost:3300/pinport/13/toggle', {
        method: 'GET'
    })
    const elements = document.getElementsByClassName('led-red')
    for(element of elements){
        const { pinState } = await response.json()
        if(pinState){
            element.style.backgroundColor= '#F00';
        }
        else {
            element.style.backgroundColor= "#A00"
        }
    }
};

const checkState = async () => {
    const response = await fetch('http://localhost:3300/pinport/13', {
        method: 'GET'
    })
    const elements = document.getElementsByClassName('led-red')
    for(element of elements){
        const { pinState } = await response.json()
        if(pinState){
            element.style.backgroundColor= '#F00';
        }
        else {
            element.style.backgroundColor= "#A00"
        }
    }
}

window.addEventListener('load', ()=>{
    checkState()
})