function addReferral(url) {
  const link = new URL(url)
  link.searchParams.set('utm_source', 'proyecto_pinterest')
  link.searchParams.set('utm_medium', 'referral')
  return link.href
}

export function createPhotoCard(photo) {
  const card = document.createElement('article')
  card.className = 'photo-card'

  const photoLink = document.createElement('a')
  photoLink.className = 'photo-card__image-link'
  photoLink.href = addReferral(photo.links.html)
  photoLink.target = '_blank'
  photoLink.rel = 'noopener noreferrer'

  const image = document.createElement('img')
  image.className = 'photo-card__image'
  image.src = photo.urls.small
  image.alt = photo.alt_description || photo.description || 'Fotografía de Unsplash'
  image.width = photo.width
  image.height = photo.height
  image.loading = 'lazy'

  const visit = document.createElement('span')
  visit.className = 'photo-card__visit'
  visit.textContent = 'Visitar'

   const photoCount = document.createElement('span')
  photoCount.className = 'photo-card__badge photo-card__badge--photos'
  photoCount.title = 'Total de fotos del autor'

  const cameraIcon = document.createElement('span')
  cameraIcon.setAttribute('aria-hidden', 'true')
  cameraIcon.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path
        fill="currentColor"
        d="M8 5l2-3h4l2 3h4a2 2 0 0 1 2 2v13H2V7a2 2 0 0 1 2-2Z"
      />
      <circle cx="12" cy="12" r="4" fill="none"
        stroke="white" stroke-width="2" />
    </svg>
  `

  const totalPhotos = document.createElement('span')
  totalPhotos.textContent = photo.user.total_photos

  photoCount.append(cameraIcon, totalPhotos)

  const likesBadge = document.createElement('span')
  likesBadge.className = 'photo-card__badge photo-card__badge--likes'
  likesBadge.title = 'Me gusta de la foto'

  const heartIcon = document.createElement('span')
  heartIcon.className = 'photo-card__heart'
  heartIcon.setAttribute('aria-hidden', 'true')
  heartIcon.textContent = '♥'

  const totalLikes = document.createElement('span')
  totalLikes.textContent = photo.likes

  likesBadge.append(heartIcon, totalLikes)

  photoLink.append(image, visit, photoCount, likesBadge)

  const authorLink = document.createElement('a')
  authorLink.className = 'photo-card__author'
  authorLink.href = addReferral(photo.user.links.html)
  authorLink.target = '_blank'
  authorLink.rel = 'noopener noreferrer'

  const avatar = document.createElement('img')
  avatar.className = 'photo-card__avatar'
  avatar.src = photo.user.profile_image.medium
  avatar.alt = ''
  avatar.width = 48
  avatar.height = 48
  avatar.loading = 'lazy'

  const name = document.createElement('span')
  name.textContent = photo.user.name

  authorLink.append(avatar, name)

  const date = document.createElement('time')
  date.className = 'photo-card__date'
  date.dateTime = photo.created_at
  date.textContent = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'UTC',
  }).format(new Date(photo.created_at))

    const dateContainer = document.createElement('div')
  dateContainer.className = 'photo-card__date-container'

  const dateIcon = document.createElement('span')
  dateIcon.setAttribute('aria-hidden', 'true')

  dateIcon.innerHTML = `
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 16V3" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 14v6h14v-6" />
    </svg>
  `

  dateContainer.append(dateIcon, date)

  const credit = document.createElement('a')
  credit.className = 'photo-card__credit'
  credit.href = addReferral('https://unsplash.com')
  credit.target = '_blank'
  credit.rel = 'noopener noreferrer'
  credit.textContent = 'Unsplash'

  card.append(photoLink, authorLink, dateContainer, credit)

  return card
}