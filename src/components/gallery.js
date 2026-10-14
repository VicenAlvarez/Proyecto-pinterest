import { createPhotoCard } from './photocard.js'

export function renderGallery(container, photos) {
  const cards = photos.map(createPhotoCard)
  container.replaceChildren(...cards)
}