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
  showForm()
  addNewToy()
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

  likeButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
    .then(r => r.json())
    .then((updatedToy) => {
      toy.likes = updatedToy.likes
      likes.innerText = `${updatedToy.likes} Likes`
    })
  })
}

function showForm() {
  let addToyButton = document.getElementById("new-toy-btn")

  addToyButton.addEventListener("click", () => {
    showToyForm = !showToyForm    

    if (showToyForm) {
      addToyForm.style.display = "block"
    } else {
      addToyForm.style.display = "none"
    }
  })
}

function addNewToy() {
  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let nameInput = event.target.name.value 
    let imageInput = event.target.image.value

    fetch(toysURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameInput,
        image: imageInput,
        likes: 0
      })
    })
    .then(r => r.json())
    .then((newToy) => {
      renderToyCard(newToy)
      event.target.reset() 
    })
  })
}