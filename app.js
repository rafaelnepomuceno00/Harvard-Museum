var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
const apiKey = ''
const title2 = document.getElementById('title2')
const Container2 = document.getElementById('ctn2')
const Container = document.getElementById('cntr')
const DivTop = document.getElementById('div-top')
const btn = document.getElementById("btn")
const btn2 = document.getElementById("btn2")
const search = document.getElementById("search")
const search2 = document.getElementById("search2")
btn.addEventListener('click', getAllArts)
btn2.addEventListener('click', getAllArts)

search.onkeydown = pressEnter
search2.onkeydown = pressEnter

function getAllArts(){

    getArt('Prints')
    getArt('Drawings')
    getArt('Sculpture')
    getArt('Paintings')
    getArt('Photographs')
    getArt('Plaques')
}

function pressEnter(e) {

    if (e.code === 'Enter' || e.code === 'NumpadEnter')
        btn.click()
}


function getvalue() {
    const val = search.value.toString()
    const val2 = search2.value.toString()
    if (val == '' && val2 == '') {
        return false
    } else if (val != '') {
        return val
    }
    else {
        return val2
    }
}
function getArt(clfctn) {


    var queryString = $.param({
        apikey: apiKey,
        title: getvalue(),
        classification: clfctn
    });
    
    btn.style.display = 'block'
    search.style.display = 'block'
    btn2.style.display = 'none'
    search2.style.display = 'none'
    title2.style.display = 'none'
    Container2.innerHTML = ' '
    Container.style.top = '-10px'
    DivTop.style.height='0'

    $.getJSON(apiEndpointBaseURL + "?" + queryString, data => {
        
        const RowElement = document.createElement('div')
        RowElement.classList.add('row')
        Container2.appendChild(RowElement)
        
        const TitleElement = document.createElement('h5')
        TitleElement.id = 'category'
        TitleElement.innerHTML = data.records[0].classification
        RowElement.appendChild(TitleElement)
        
        data.records.forEach(paintInfo => {


            const ColumnElement = document.createElement('div')
            ColumnElement.classList.add('col-md-4')

            const cardElement = document.createElement('div')
            cardElement.classList.add('card')
            cardElement.classList.add('mb-4')
            cardElement.classList.add('text-white')
            cardElement.classList.add('bg-dark')
            ColumnElement.appendChild(cardElement)

            const imgCard = document.createElement('img')
            imgCard.classList.add('card-img-top')
            imgCard.src = paintInfo.primaryimageurl != null ? paintInfo.primaryimageurl : 'assets/no-image.png'
            imgCard.alt = 'No image Found'
            cardElement.appendChild(imgCard)

            const cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            cardElement.appendChild(cardBody)

            const cardTitle = document.createElement('h5')
            cardTitle.classList.add('card-title')
            cardTitle.innerHTML = 'Title: ' + paintInfo.alphasort
            cardBody.appendChild(cardTitle)

            const cardText = document.createElement('p')
            cardText.classList.add('card-text')
            cardText.innerHTML = paintInfo.title
            cardBody.appendChild(cardText)

            const cardText2 = document.createElement('p')
            cardText2.classList.add('card-text')
            cardText2.innerHTML = 'Dated: ' + paintInfo.century
            cardBody.appendChild(cardText2)

            const cardLink = document.createElement('a')
            cardLink.classList.add('btn')
            cardLink.classList.add('btn-outline-light')
            cardLink.classList.add('btn-sm')
            cardLink.target = '_blank'
            cardLink.href = paintInfo.url
            cardLink.innerHTML = 'More info'
            cardBody.appendChild(cardLink)

            RowElement.appendChild(ColumnElement)
            

        })
        const hr = document.createElement('hr')
        RowElement.appendChild(hr)

    })
}
