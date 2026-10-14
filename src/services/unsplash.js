const API_URL = '/api/unsplash'

async function requestPhotos(path) {
  const response = await fetch(`${API_URL}${path}`)

  if (!response.ok) {
    throw new Error(`No se pudieron cargar las imágenes (${response.status})`)
  }

  return response.json()
}

export async function getInitialPhotos() {
  return requestPhotos('/photos?per_page=30')
}

export async function searchPhotos(query) {
  const params = new URLSearchParams({
    query,
    per_page: '30',
  })

  const data = await requestPhotos(`/search/photos?${params}`)

  return data.results
}