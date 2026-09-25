const buttonVariants = {
  primary:
    'border border-charcoal bg-charcoal text-ivory hover:border-brown hover:bg-brown',
  secondary:
    'border border-brown bg-transparent text-brown hover:bg-sandstone-100',
  tertiary:
    'border-b-1 border-gold bg-transparent px-0! text-brown hover:border-brown hover:text-charcoal',
}

function Button({ as: Component = 'button', children, className = '', loading = false, variant = 'primary', ...props }) {
  const componentProps = Component === 'button' ? { disabled: loading || props.disabled } : {}

  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-stone px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant]} ${className}`}
      {...componentProps}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Component>
  )
}

export default Button