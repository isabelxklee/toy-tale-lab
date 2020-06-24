const toysURL = `http://localhost:3000/toys`
const toysContainer = document.getElementById('toy-collection')
const addToyForm = document.querySelector(".container")
let showToyForm = false

fetch(toysURL)
.then(r => r.json())
.then((toys) => {
  toys.forEach((toy) => {
    renderToyCard(toy)
  })
})

function renderToyCard(toy) {
  let toyCard = document.createElement("div")
  toyCard.classList.add("card")

  let name = document.createElement("h2")
  name.innerText = toy.name

  let image = document.createElement("img")
  image.classList.add("toy-avatar")
  image.src = toy.image

  let likes = document.createElement("p")
  likes.innerText = `${toy.likes} Likes`

  let likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.innerText = 'Like <3'

  toyCard.append(name, image, likes, likeButton)
  toysContainer.append(toyCard)
}

let addToyButton = document.getElementById("new-toy-btn")

addToyButton.addEventListener("click", () => {
  showToyForm = !showToyForm    

  if (showToyForm) {
    addToyForm.style.display = "block"
  } else {
    addToyForm.style.display = "none"
  }
})