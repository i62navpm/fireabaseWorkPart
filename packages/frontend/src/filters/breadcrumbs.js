export default function (value) {
  const breadcrumbs = {
    workforces: { text: 'Workforces', href: 'workforces' },
    workers: { text: 'Workers', href: 'workers' },
  }
  const routerMap = {
    workforces: [breadcrumbs.workforces],
    workers: [breadcrumbs.workforces, breadcrumbs.workers],
  }
  return routerMap[value] || []
}
