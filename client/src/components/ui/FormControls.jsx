function FieldShell({ children, error, hint, label, name, required = false }) {
  return (
    <div className="space-y-2">
      <label className="ds-label" htmlFor={name}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? <p className="text-sm text-[#9c493d]" id={`${name}-error`}>{error}</p> : null}
      {!error && hint ? <p className="text-sm text-brown-light" id={`${name}-hint`}>{hint}</p> : null}
    </div>
  )
}

export function Input({ error, hint, label, name, required, ...props }) {
  return (
    <FieldShell error={error} hint={hint} label={label} name={name} required={required}>
      <input aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} aria-invalid={Boolean(error)} className="ds-input" id={name} name={name} {...props} />
    </FieldShell>
  )
}

export function Textarea({ error, hint, label, name, required, ...props }) {
  return (
    <FieldShell error={error} hint={hint} label={label} name={name} required={required}>
      <textarea aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} aria-invalid={Boolean(error)} className="ds-input min-h-28 resize-y" id={name} name={name} {...props} />
    </FieldShell>
  )
}

export function Select({ children, error, hint, label, name, required, ...props }) {
  return (
    <FieldShell error={error} hint={hint} label={label} name={name} required={required}>
      <select aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} aria-invalid={Boolean(error)} className="ds-input" id={name} name={name} {...props}>
        {children}
      </select>
    </FieldShell>
  )
}

export function Choice({ checked, children, name, type = 'checkbox', ...props }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-charcoal-soft">
      <input checked={checked} className="h-4 w-4 accent-brown" name={name} type={type} {...props} />
      {children}
    </label>
  )
}

export function FileUpload({ error, hint, label, name, ...props }) {
  return (
    <FieldShell error={error} hint={hint} label={label} name={name}>
      <input aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} aria-invalid={Boolean(error)} className="ds-input file:mr-3 file:border-0 file:bg-sandstone-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brown" id={name} name={name} type="file" {...props} />
    </FieldShell>
  )
}