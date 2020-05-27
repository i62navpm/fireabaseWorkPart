export default function (value) {
  const breadcrumbs = {
    workforce: { text: 'Workforce', href: 'workforce' },
    calendar: { text: 'Calendar', href: 'calendar' },
    summary: { text: 'Summary', href: 'summary' },
  }
  const routerMap = {
    workforce: [breadcrumbs.workforce],
    calendar: [breadcrumbs.workforce, breadcrumbs.calendar],
    summary: [breadcrumbs.workforce, breadcrumbs.calendar, breadcrumbs.summary],
  }
  return routerMap[value] || []
}
