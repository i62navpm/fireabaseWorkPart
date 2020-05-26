export default function (value) {
  const breadcrumbs = {
    workforce: { text: 'Workforce', href: 'workforce' },
    worker: { text: 'Worker', href: 'worker' },
    calendar: { text: 'Calendar', href: 'calendar' },
    summary: { text: 'Summary', href: 'summary' },
  }
  const routerMap = {
    workforce: [breadcrumbs.workforce],
    worker: [breadcrumbs.workforce, breadcrumbs.worker],
    calendar: [breadcrumbs.workforce, breadcrumbs.worker, breadcrumbs.calendar],
    summary: [
      breadcrumbs.workforce,
      breadcrumbs.worker,
      breadcrumbs.calendar,
      breadcrumbs.summary,
    ],
  }
  return routerMap[value] || []
}
