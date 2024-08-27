const url = 'https://api-ssl.bitly.com/v4/shorten'
const token = '60d17e875e2c85c25f91c4a993d426086a827cff'
const btn = document.querySelector('.shortener__button')
const linkValue = document.querySelector('#shortener-input')
const infoLink = []

btn.addEventListener('click', () => {
    shoortnerURL(linkValue.value)
    list.appendChild(newItemListEl)
})

async function shoortnerURL(urlEncurtada) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "long_url": `${urlEncurtada}`, "domain": "bit.ly" })
    }).then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error("Erro na Requisição")
        }
    }).then(data => {
        console.log(data)
        addInfoLink(data.long_url, data.link)
    }).catch(error => {
        console.log(error)
        alert('Ops... Acho que você informou um link inválido. Tente Novamente...')
    })
}

function addInfoLink (longLink, shortLink) {
    const newLink = {
        longLink: longLink,
        shortLink: shortLink
    }
    infoLink.unshift(newLink)
    console.log(infoLink)
    addItem(longLink, shortLink)
}

function addItem (longLink, shortLink) {
    const list = document.querySelector('.list__list')

    const itemList = document.createElement('li')
    itemList.className = 'list__list-item'
    
    const originalLink = document.createElement('p')
    originalLink.className = 'list__list-item-link'
    originalLink.textContent = longLink

    const newDiv = document.createElement('div')

    const newLink = document.createElement('a')
    newLink.className = 'list__list-item-linkShort'
    newLink.textContent = shortLink
    newLink.href = shortLink

    const buttonCopy = document.createElement('button')
    buttonCopy.className = 'list__list-item-button'
    buttonCopy.textContent = 'Copiar'

    buttonCopy.addEventListener ('click', () => {
        copyText(shortLink)
    })
    
    list.appendChild(itemList)
    itemList.appendChild(originalLink)
    itemList.appendChild(newDiv)
    newDiv.appendChild(newLink)
    newDiv.appendChild(buttonCopy)
}

async function copyText (text) {
   try {
    await navigator.clipboard.writeText(text);
   } catch (error) {
    console.log(`Erro ao copiar o texto`)
   } 
}