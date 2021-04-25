const main = document.getElementById('main')
const addUserBtn = document.getElementById('add_user')
const doubleBtn = document.getElementById('double')
const showMillioners = document.getElementById('show_millioners')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate_wealth')

let data = [];


getRandomUser()


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    const user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000)
    }
    addData(newUser)
}

function addData(obj) {
    data.push(obj)
    updateDOM(data)
}

function updateDOM(total) {
    const el = document.createElement('div')
    el.classList.add('person')
    el.innerHTML += `<strong class="name">${data[data.length-1].name}</strong> <strong class="money">${data[data.length-1].money}</strong>`
    console.log(total)
    main.append(el)
}

function doubleMoney() {
    let dataMoneyes = document.querySelectorAll('.money')
    dataMoneyes = Array.from(dataMoneyes)
    dataMoneyes.map((user, i) => {
        data[i].money = parseInt(user.textContent * 2)
        return user.innerHTML = user.textContent * 2
    })
}

function showOnlyMillioners() {
    let person = document.querySelectorAll('.person')
    person = Array.from(person)
    data.forEach((user, i) => {
        if (data[i].money >= 1000000 && !person[i].classList.contains('hidden')) {
            person[i].classList.add('visible')
        } else {
            person[i].classList.add('hidden')
        }
    })
}

function showByRichest() {
    let person = document.querySelectorAll('.person')
    person = Array.from(person)
    const sortedArray = new Promise((resolve, reject) => {
        data.sort(function (a, b) {
            return a.money - b.money
        })
        resolve(data)
    })
    sortedArray.then(function (data) {
        person.forEach(function (item, i) {
            item.querySelector('.name').innerHTML = data[i].name
            item.querySelector('.money').innerHTML = data[i].money
        })
    })
}


function countTotal() {
    const totalValue = data.reduce(function (acc, sum,i) {
    return acc + data[i].money
    },0)
    const content = document.createElement('strong')
    content.classList.add('total')
    content.innerHTML = `Total sum is ` + totalValue
    main.append(content)
}

calculateWealthBtn.addEventListener('click', countTotal)
sortBtn.addEventListener('click', showByRichest)
showMillioners.addEventListener('click', showOnlyMillioners)
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)