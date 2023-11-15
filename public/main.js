// const { list } = require("mongodb/lib/gridfs/grid_store");

var watched = document.getElementsByClassName("fa-eye-slash");
var dropped = document.getElementsByClassName("fa-eyedropper");
var rankTrash = document.getElementsByClassName("fa-trash");
var watching = document.getElementsByClassName("fa-eye")



Array.from(watched).forEach(function (element) {
  element.addEventListener('click', function () {
    const listItem = this.closest(".movie")
    console.log(listItem)
    const title = listItem.querySelector('.title').textContent.trim()
    console.log(title)
    const director = listItem.querySelector('.director').textContent.trim()
    const id = this.dataset.id
    fetch('movies/watched', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'id': id,
        'title': title,
        'director': director

      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)

        window.location.reload(true)
      })
  });
});


Array.from(dropped).forEach(function (element) {
  element.addEventListener('click', function () {
    const listItem = this.closest(".movie")
    console.log(listItem)
    const title = listItem.querySelector('.title').textContent.trim()
    console.log(title)
    const director = listItem.querySelector('.director').textContent.trim()
    const id = this.dataset.id
    fetch('movies/dropped', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'id': id,
        'title': title,
        'director': director

      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)

        window.location.reload(true)
      })
  });
});



Array.from(watching).forEach(function (element) {
  element.addEventListener('click', function () {
    const listItem = this.closest(".movie")
    console.log(listItem)
    const title = listItem.querySelector('.title').textContent.trim()
    console.log(title)
    const director = listItem.querySelector('.director').textContent.trim()
    const id = this.dataset.id
    fetch('movies/watching', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'id': id,
        'title': title,
        'director': director
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)

        window.location.reload(true)
      })
  });
});

Array.from(rankTrash).forEach(function (element) {
  element.addEventListener('click', function () {
    const listItem = this.closest(".movie")
    console.log(listItem)
    const title = listItem.querySelector('.title').textContent.trim()
    console.log(title)
    const director = listItem.querySelector('.director').textContent.trim()
    const id = this.dataset.id
    fetch('movies', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id,
        'title': title,
        'director': director
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
