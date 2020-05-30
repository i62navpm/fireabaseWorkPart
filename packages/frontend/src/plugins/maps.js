import config from '@/config/firebase'

const script = document.createElement('script')
script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=places`

document.head.appendChild(script)
