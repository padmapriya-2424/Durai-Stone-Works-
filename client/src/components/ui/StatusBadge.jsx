const statusStyles = {
  approved: 'border-[#a9c5a0] bg-[#edf5eb] text-[#41613b]',
  attention: 'border-[#d7b37a] bg-[#fbf2df] text-[#765523]',
  draft: 'border-sandstone-200 bg-sandstone-100 text-charcoal-soft',
}

function StatusBadge({ children, status = 'draft' }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${statusStyles[status]}`}>
      {children}
    </span>
  )
}

export default StatusBadge