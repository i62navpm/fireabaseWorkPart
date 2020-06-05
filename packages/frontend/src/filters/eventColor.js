export default function (value) {
  const eventColor = {
    fullSalary: 'success',
    halfSalary: 'warning',
    customSalary: 'info',
    debtSalary: 'error',
    default: 'primary',
  }

  return eventColor[value] || eventColor['default']
}
