let url = "https://crossorigin.me/http://www.recipepuppy.com/api/?q="

document.querySelector("#searchBox").addEventListener("submit", search)

function search() {
  let value = document.querySelector("#searchBox").value
  url += value
  searchResults = document.querySelector(".search-result")
  searchResults.innerHTML = ""

  fetch(url).then(response => response.json()).then(data => {
    tagH5 = document.querySelector("h5")

    if (value != "") {
      tagH5.innerHTML = "Search results for '" + value + "'"
    } else {
      tagH5.innerHTML =
        "Search for a recipe above. Below is some inspiration for you to get started!"
    }

    for (let i = 0; i < data.results.length; i++) {
      let title = data.results[i].title
      let thumbnail = data.results[i].thumbnail
      let link = data.results[i].href
      let ingredients = data.results[i].ingredients

      let aTag = document.createElement("a")
      aTag.setAttribute("target", "_blank")
      aTag.setAttribute("href", link)

      let resultContainer = document.createElement("div")
      resultContainer.classList.add("result")
      let thumbnailContainer = document.createElement("img")
      let ingredientsContainer = document.createElement("p")

      if (thumbnail.length === 0) {
        thumbnail = "img/default.jpg"
      }

      thumbnailContainer.src = thumbnail
      thumbnailContainer.width = "107px"
      thumbnailContainer.alt = title

      aTag.innerHTML = `<span class="title">${title}</span>`
      aTag.innerHTML += `<br> <span class="ingredients">${ingredients}</span>`

      searchResults.appendChild(resultContainer)
      resultContainer.appendChild(thumbnailContainer)
      resultContainer.appendChild(aTag)
    }
  })
  url = "https://crossorigin.me/http://www.recipepuppy.com/api/?q="
}

function checkSubmit(e) {
  if (e && e.keyCode == 13) {
    search()
  }
}
