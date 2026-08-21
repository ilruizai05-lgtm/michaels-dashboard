// Navigation config. `roles` gates which accounts even *see* an item — for
// Employees, rentals / finances / employee-admin / activity-log are not
// rendered at all (absent from nav), per the access model in the handoff.
export const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'grid', roles: ['owner', 'employee'] },
  { key: 'watches', label: 'Watch repairs', icon: 'watch', roles: ['owner', 'employee'] },
  { key: 'intake', label: 'New intake', icon: 'plus', roles: ['owner', 'employee'] },
  { key: 'customers', label: 'Customers', icon: 'users', roles: ['owner', 'employee'] },
  { key: 'rentals', label: 'Rentals', icon: 'home', roles: ['owner'] },
  { key: 'finances', label: 'Finances', icon: 'chart', roles: ['owner'] },
  { key: 'employees', label: 'Employees', icon: 'badge', roles: ['owner'] },
  { key: 'activity', label: 'Activity log', icon: 'activity', roles: ['owner'] },
]

// The four areas an Employee never sees — surfaced as a locked footer in the
// nav so it reads as real product chrome (not just silently missing).
export const ownerOnlyLabels = ['Rentals', 'Finances', 'Employees', 'Activity log']
