export default function (value) {
  const breadcrumbs = {
    workforce: { text: 'Plantilla', href: 'workforce' },
    calendar: { text: 'Calendario', href: 'calendar' },
    summary: { text: 'Resumen', href: 'summary' },
  }
  const routerMap = {
    workforce: [breadcrumbs.workforce],
    calendar: [breadcrumbs.workforce, breadcrumbs.calendar],
    summary: [breadcrumbs.workforce, breadcrumbs.calendar, breadcrumbs.summary],
  }
  return routerMap[value] || []
}
