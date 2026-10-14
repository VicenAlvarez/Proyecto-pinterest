import './style.css'
import { createHeader } from './components/header.js'
import { renderGallery } from './components/gallery.js'
import {
  getInitialPhotos,
  searchPhotos,
} from './services/unsplash.js'

const app = document.querySelector('#app')
const header = createHeader()

const main = document.createElement('main')
main.className = 'main'

main.innerHTML = `
  <h1 class="sr-only">Encuentra tu inspiración</h1>
  <p class="status" role="status"></p>
  <div class="gallery"></div>
`

app.replaceChildren(header, main)

const gallery = main.querySelector('.gallery')
const status = main.querySelector('.status')
const searchForm = header.querySelector('.search')
const searchInput = header.querySelector('#search-input')
const logo = header.querySelector('.logo')
const homeButton = header.querySelector('.nav-button--active')

let initialPhotos = null
let requestId = 0

async function loadPhotos(query = '') {
  const currentRequest = ++requestId

  status.textContent = 'Cargando imágenes…'
  gallery.setAttribute('aria-busy', 'true')

  try {
    let photos

    if (query) {
      photos = await searchPhotos(query)
    } else {
      if (initialPhotos === null) {
        initialPhotos = await getInitialPhotos()
      }

      photos = initialPhotos
    }

    // Una petición anterior no debe reemplazar resultados más recientes.
    if (currentRequest !== requestId) return

    renderGallery(gallery, photos)

    status.textContent = photos.length
      ? ''
      : `No se encontraron imágenes para «${query}».`
  } catch (error) {
    if (currentRequest !== requestId) return

    status.textContent = `${error.message}. Inténtalo de nuevo.`
  } finally {
    if (currentRequest === requestId) {
      gallery.setAttribute('aria-busy', 'false')
    }
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const query = searchInput.value.trim()

  if (!query) {
    searchInput.value = ''
    searchInput.focus()
    return
  }

  searchForm.reset()
  loadPhotos(query)
})

function returnHome() {
  searchForm.reset()
  loadPhotos()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

logo.addEventListener('click', returnHome)
homeButton.addEventListener('click', returnHome)

loadPhotos()