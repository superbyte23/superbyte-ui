import { useEffect, useRef } from 'react'
import 'superbyte-admin/assets/js/datatable.js'
import { useApp } from '../theme/AppContext'

const CS_ROWS = [
  { name: 'Acme Corp', plan: 'Pro', amount: 290, seats: 3, status: 'Active' },
  { name: 'Northwind', plan: 'Enterprise', amount: 1240, seats: 12, status: 'Active' },
  { name: 'Globex', plan: 'Starter', amount: 29, seats: 1, status: 'Trial' },
  { name: 'Initech', plan: 'Pro', amount: 290, seats: 4, status: 'Active' },
  { name: 'Umbrella', plan: 'Starter', amount: 29, seats: 2, status: 'Trial' },
  { name: 'Hooli', plan: 'Enterprise', amount: 1240, seats: 18, status: 'Active' },
  { name: 'Vandelay Industries', plan: 'Pro', amount: 290, seats: 2, status: 'Suspended' },
  { name: 'Stark Industries', plan: 'Enterprise', amount: 1240, seats: 9, status: 'Active' },
  { name: 'Wayne Enterprises', plan: 'Pro', amount: 290, seats: 5, status: 'Active' },
  { name: 'Pied Piper', plan: 'Starter', amount: 29, seats: 1, status: 'Trial' },
  { name: 'Aperture Science', plan: 'Pro', amount: 290, seats: 3, status: 'Active' },
  { name: 'Massive Dynamic', plan: 'Enterprise', amount: 1240, seats: 7, status: 'Active' },
  { name: 'Soylent Corp', plan: 'Starter', amount: 29, seats: 1, status: 'Cancelled' },
  { name: 'Dunder Mifflin', plan: 'Pro', amount: 290, seats: 4, status: 'Active' },
  { name: 'Cyberdyne Systems', plan: 'Enterprise', amount: 1240, seats: 11, status: 'Active' },
  { name: 'Tyrell Corp', plan: 'Starter', amount: 29, seats: 2, status: 'Trial' },
  { name: 'Omni Consumer Products', plan: 'Pro', amount: 290, seats: 6, status: 'Active' },
  { name: 'Rich Industries', plan: 'Pro', amount: 290, seats: 3, status: 'Active' }
]

const csTag = s =>
  s === 'Active'
    ? 'tag-green'
    : s === 'Trial'
      ? 'tag-indigo'
      : s === 'Suspended'
        ? 'tag-yellow'
        : 'tag-slate'

export default function Tables() {
  const zoneRef = useRef(null)
  const { showToast } = useApp()

  useEffect(() => {
    if (!zoneRef.current || !window.SuperDataTable) return
    const dt = new window.SuperDataTable(zoneRef.current, {
      data: CS_ROWS,
      perPage: 10,
      perPageOptions: [5, 10, 25, 0],
      initialSort: { key: 'name', dir: 1 },
      tableClass: 'row-actions-always',
      searchPlaceholder: 'Filter rows…',
      infoText: (from, to, total) =>
        `Showing ${from}–${to} of ${total} customers · client-side`,
      columns: [
        { key: 'name', title: 'Customer', cellClass: 'name-cell' },
        { key: 'plan', title: 'Plan' },
        {
          key: 'amount',
          title: 'MRR',
          align: 'right',
          cellClass: 'mono-cell',
          render: r => '$' + r.amount.toLocaleString()
        },
        { key: 'seats', title: 'Seats', align: 'right', cellClass: 'mono-cell' },
        {
          key: 'status',
          title: 'Status',
          render: r =>
            `<span class="tag ${csTag(r.status)}"><i class="hgi-stroke hgi-circle"></i> ${r.status}</span>`
        },
        {
          title: 'Actions',
          align: 'right',
          sortable: false,
          cellClass: 'row-actions',
          render: r =>
            `<button class="row-btn" data-act="view" data-name="${r.name}" title="View"><i class="hgi-stroke hgi-eye"></i></button>` +
            `<button class="row-btn" data-act="edit" data-name="${r.name}" title="Edit"><i class="hgi-stroke hgi-edit-01"></i></button>` +
            `<button class="row-btn danger" data-act="del" data-name="${r.name}" title="Delete"><i class="hgi-stroke hgi-trash-01"></i></button>`
        }
      ]
    })

    const onClick = e => {
      const btn = e.target.closest('[data-act]')
      if (!btn) return
      const { act, name } = btn.dataset
      if (act === 'view') showToast('success', `Viewing ${name}`)
      else if (act === 'edit') showToast('success', `Editing ${name}`)
      else if (act === 'del') showToast('success', `${name} deleted`)
    }
    const zone = zoneRef.current
    zone.addEventListener('click', onClick)
    return () => {
      zone.removeEventListener('click', onClick)
      if (dt && dt.destroy) dt.destroy()
    }
  }, [showToast])

  return (
    <section className="page-section active">
      <div className="page-head">
        <div>
          <h1>Tables</h1>
          <p>SuperDataTable · rows in memory · search · sort · paginate</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <i className="hgi-stroke hgi-sorting-a-z-01"></i> Client-side DataTable
          </div>
          <span className="card-sub">
            SuperDataTable — the dependency-free DataTable library from superbyte-admin
          </span>
        </div>
        <div className="card-body">
          <div ref={zoneRef}></div>
        </div>
      </div>
    </section>
  )
}
