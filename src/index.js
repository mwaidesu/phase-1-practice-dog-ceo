
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', function () {
  fetchImages()
  fetchBreeds()
})

const fetchImages = () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

  fetch(imgUrl)
    .then(response => response.json())
    .then(jsonObject => {
      jsonObject.message.forEach(image => appendImageToDOM(image))
    })
}

const appendImageToDOM = (image) => {
  let container = document.getElementById('dog-image-container');

  let newImage = document.createElement('img');

  newImage.src = image
  container.appendChild(newImage)
}

const fetchBreeds = () => {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';

  fetch(breedUrl)
    .then(response => response.json())
    .then(jsonObject => {
      //console.log(jsonObject)
      let breeds = Object.keys(jsonObject.message)
      updateBreedList(breeds)

      let breedDropdown = document.querySelector('#breed-dropdown')
      breedDropdown.addEventListener('change', function (e) {
        let filterValue = e.target.value

        let filteredBreeds = breeds.filter(breed => breed[0] === filterValue)

        updateBreedList(filteredBreeds)
      })
    })
}

//for each breed in the array append it to the DOM
const updateBreedList = (breeds) => {
  let ul = document.querySelector('#dog-breeds')
  ul.innerHTML = ''

  breeds.forEach(breed => appendBreedToDOM(breed))
}

//...creating the append fn
const appendBreedToDOM = (breed) => {
  let ul = document.querySelector('#dog-breeds')
  let li = document.createElement('li')

  li.innerText = breed
  ul.appendChild(li)

  //click event
  li.addEventListener('click', updateBreedColor)
}

const updateBreedColor = (event) => {
  event.target.style.color = 'green'
}

