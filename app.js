// Find all of the objects that are paintings and have the word "rabbit" in the title
var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";

const RowElement = document.getElementById('row')
const btn = document.getElementById("btn")
const btn2 = document.getElementById("btn2")
const search = document.getElementById("search")
const search2 = document.getElementById("search2")
btn.addEventListener('click', getPaints)
btn2.addEventListener('click', getPaints)

search.onkeydown = pressEnter
search2.onkeydown = pressEnter2

function pressEnter(e) {

    if (e.code === 'Enter')
        btn.click()
}
function pressEnter2(e) {

    if (e.code === 'Enter' || e.code ==='NumpadEnter')
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
function getPaints() {


    var queryString = $.param({
        apikey: "",
        title: getvalue(),
        classification: "Paintings"
    });

RowElement.innerHTML = ' '
    $.getJSON(apiEndpointBaseURL + "?" + queryString, data => {
        console.log(data.records)
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
            imgCard.src = paintInfo.primaryimageurl
            imgCard.alt = 'No image Found'
            cardElement.appendChild(imgCard)

            const cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            cardElement.appendChild(cardBody)

            const cardTitle = document.createElement('h5')
            cardTitle.classList.add('card-title')
            cardTitle.innerHTML = paintInfo.alphasort
            cardBody.appendChild(cardTitle)

            const cardText = document.createElement('p')
            cardText.classList.add('card-text')
            cardText.innerHTML = paintInfo.title
            cardBody.appendChild(cardText)

            const cardLink = document.createElement('a')
            cardLink.classList.add('btn')
            cardLink.classList.add('btn-outline-light')
            cardLink.classList.add('btn-sm')
            cardLink.href = paintInfo.url
            cardLink.innerHTML = 'More info'
            cardBody.appendChild(cardLink)

            RowElement.appendChild(ColumnElement)

        })

    });
}

function createContainer(){
    ContainerElement.innerHTML = ''
    const RowElement = document.createElement('div')
    ContainerElement.classList.add("row")
    ContainerElement.appendChild(RowElement)
}
