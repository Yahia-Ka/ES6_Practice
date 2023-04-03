import avCarList from "./cars_data.js"

const mockApiUrl = "https://63f0dabaff1b45a1a442cf7e.mockapi.io/api/Cars"

// Getting dom elms needed to work with
const upcomingSec = document.querySelector(".notav-section")
const availableSec = document.querySelector(".available-section")
const singElemSec = document.querySelector(".single-elem")
const basedOnCategory = document.querySelectorAll(".ctgory-btn")
const rentBtns = document.querySelectorAll(".rent-btn")

//tried to get data from a mock api and display using fetch
const showFeatured = async () => {
  try {
    const res = await fetch(mockApiUrl)
    // return res.json()
    const data = await res.json()
    upcomingSec.innerHTML = data
      .map(
        (car) =>
          `<article class="cars-item">
              <img src="./Car_imges/unrevealed_car.png" alt="cars item" class="no-photo" />
              <div class="item-info">
                <header>
                  <h4>${car.title}</h4>
                  <h4 class="price"> $${car.price}/day</h4>
                </header>
                <p class="item-text">
                ${car.description}
                </p>
              </div>
            </article>`
      )
      .join("")
  } catch (err) {
    console.log(err)
  }
}
// same as above but now with local data
const showAvailable = () => {
  availableSec.innerHTML = avCarList
    .map(
      (car) => `<article id=${car.id} class="cars-item">
              <img src="${car.img}" alt="cars item" class="photo" />
              <div class="item-info">
                <header>
                  <h4>${car.title}</h4>
                  <h4 class="price">$${car.price}/day</h4>
                </header>
                <p class="item-text">
                ${car.desc}
                <div class="item-btns">
                <a href="#selectedItem"><button type="button"  class="rent-btn" id="${car.id}">Rent</button></a>
                </div>
                </p>
              </div>
              
            </article>`
    )
    .join(" ")
}
// dispalayed as soon as the e fires
window.addEventListener("DOMContentLoaded", showFeatured(), showAvailable())

// handling inputs on search input

const srchInput = document.querySelector(".srchinput")
srchInput.addEventListener("change", (e) => {
  let currVal = e.target.value
  // console.log(currVal)

  const isFound = new Set()

  for (let item of avCarList)
    if (
      Reflect.getOwnPropertyDescriptor(item, "title").value ===
      currVal.toLowerCase()
    )
      isFound.add(currVal)

  isFound.has(currVal)
    ? alert(`${currVal} deos exist`)
    : alert(`we dont have ${currVal} right now`)
})

// Tried to filter fetched data based on category  button clicks
basedOnCategory.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const fuel = e.currentTarget.innerHTML.trim()
    // console.log(fuel)
    fetch(mockApiUrl)
      .then((res) => res.json())
      .then(
        (data) =>
          (upcomingSec.innerHTML = data
            .filter((car) => car.category === fuel)
            .map(
              (item) =>
                `<article class="cars-item">
                  <img src="./Car_imges/unrevealed_car.png" alt="cars item" class="photo" />
                  <div class="item-info">
                    <header>
                      <h4>${item.title}</h4>
                      <h4 class="price"> $${item.price}/day</h4>
                    </header>
                    <p class="item-text">
                    ${item.description}
                    </p>
                  </div>
                </article>`
            )
            .join(""))
      )
      .catch((error) => console.log(error))
    if (fuel === "ō͡≡o") {
      // console.log("something went wrong!")
      showFeatured()
    }
  })
})

// getting form entries => posting to the api \\

const form = document.getElementById("feedback")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const clientInfo = new FormData(form)
  const _jsonFormat = JSON.stringify(Object.fromEntries(clientInfo))

  fetch("https://63f0dabaff1b45a1a442cf7e.mockapi.io/api/ClientsFeedback", {
    method: "POST",
    body: _jsonFormat,
    headers: { "content-type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
})

// const toggleItem = () => {
//   const disp = singElemSec.style.display
//   disp === "none" ? (disp = "block") : (disp = "none")
// }

// const endOfToggle = () => {
// }
let btns = document.querySelectorAll(".rent-btn")

for (let b of btns) {
  ;((b) => {
    b.addEventListener("click", function (e) {
      // console.log(typeof e.currentTarget.id)
      avCarList.forEach((obj) => {
        if (obj.id == e.currentTarget.id) {
          console.log("executed1")
          // singElemSec.tog
          singElemSec.innerHTML = avCarList
            .filter((item) => item.id == e.currentTarget.id) // double instead of triple = sign, get rid of types constraint
            .map(
              () => `<article id=${obj.id} class="selected-car" id="#selectedItem">
                    <h3> This should be on another page</h3>
                 <img src="${obj.img}" alt="cars item" class="photo" />
                 <div class="item-info">
                   <header>
                     <h4>${obj.title}</h4>
                     <h4 class="price"> ${obj.price} MAD/jour</h4>
                   </header>
                   <p class="item-text">
                     ${obj.desc}
                   </p>
                  
                 </div>
                 <h2>Specify car pick-up date </p>
                 <input type="date" id="date">
               </article>`
            )
        }
      })
    })
  })(b)
}

// presentational tweaks, scrolls on clicks....
const topFnc = () => (document.documentElement.scrollTop = 0)

let topBtn = document.getElementById("toTopBtn")
topBtn.addEventListener("click", (e) => {
  topFnc()
})
// 30px scrolls down, toTp btn appears
window.onscroll = () => scrollFnc()

const scrollFnc = () =>
  document.body.scrollTop > 30 || document.documentElement.scrollTop > 30
    ? (topBtn.style.display = "block")
    : (topBtn.style.display = "none")

// using Proxy
