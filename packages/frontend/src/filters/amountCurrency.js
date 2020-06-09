export default function (value) {
  return value
    ? new Intl.NumberFormat('es', {
        style: 'currency',
        currency: 'EUR',
      }).format(value)
    : '-'
}
