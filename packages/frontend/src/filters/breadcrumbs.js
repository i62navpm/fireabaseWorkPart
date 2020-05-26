export default function (value) {
  const breadcrumbs = {
    workforce: { text: 'Workforce', href: 'workforce' },
    worker: { text: 'Worker', href: 'worker' },
  }
  const routerMap = {
    workforce: [breadcrumbs.workforce],
    worker: [breadcrumbs.workforce, breadcrumbs.worker],
  }
  return routerMap[value] || []
}
