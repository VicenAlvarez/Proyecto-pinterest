export function createHeader() {
  const header = document.createElement('header')
  header.className = 'header'

  header.innerHTML = `
    <button class="logo" type="button"></button>

    <nav class="navigation" aria-label="Navegación principal"></nav>

   <form class="search" role="search"></form>

    <div class="header-actions">
      <button
        class="icon-button desktop-action"
        type="button"
        aria-label="Notificaciones"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a2 2 0 0 1 2 2v.3A6 6 0 0 1 18 10v5l2 3H4l2-3v-5a6 6 0 0 1 4-5.7V4a2 2 0 0 1 2-2ZM9 20h6a3 3 0 0 1-6 0Z" />
        </svg>
      </button>

      <button
        class="icon-button desktop-action"
        type="button"
        aria-label="Mensajes"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.5 3 2 6.6 2 11c0 2.3 1.2 4.4 3.2 5.9L4 21l5-2.4c1 .3 2 .4 3 .4 5.5 0 10-3.6 10-8S17.5 3 12 3Z" />
          <circle cx="7" cy="11" r="1.2" fill="white" />
          <circle cx="12" cy="11" r="1.2" fill="white" />
          <circle cx="17" cy="11" r="1.2" fill="white" />
        </svg>
      </button>

      <button class="profile-button" type="button" aria-label="Perfil">
        D
      </button>
    </div>
  `
  const navigation = header.querySelector('.navigation')

  const homeButton = document.createElement('button')
  homeButton.className = 'nav-button nav-button--active'
  homeButton.type = 'button'
  homeButton.textContent = 'Inicio'

  const exploreButton = document.createElement('button')
  exploreButton.className = 'nav-button'
  exploreButton.type = 'button'
  exploreButton.textContent = 'Explorar'

  const createButton = document.createElement('button')
  createButton.className = 'nav-button'
  createButton.type = 'button'
  createButton.textContent = 'Crear'

  navigation.append(homeButton, exploreButton, createButton)

  const searchForm = header.querySelector('.search')

  const searchLabel = document.createElement('label')
  searchLabel.className = 'sr-only'
  searchLabel.htmlFor = 'search-input'
  searchLabel.textContent = 'Buscar imágenes'

  const searchIcon = document.createElement('span')
  searchIcon.className = 'search-icon'
  searchIcon.setAttribute('aria-hidden', 'true')
  searchIcon.textContent = '⌕'

  const searchInput = document.createElement('input')
  searchInput.id = 'search-input'
  searchInput.name = 'query'
  searchInput.type = 'search'
  searchInput.placeholder = 'Buscar'
  searchInput.required = true

  searchForm.append(searchLabel, searchIcon, searchInput)

  const logo = header.querySelector('.logo')
  logo.setAttribute('aria-label', 'Pinterest: volver al inicio')

  const logoImage = document.createElement('img')
  logoImage.src = '/favicon.svg'
  logoImage.alt = ''
  logoImage.width = 24
  logoImage.height = 24

  logo.append(logoImage)

  return header
}