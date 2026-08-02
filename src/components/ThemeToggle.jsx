import useTheme from '../hooks/useTheme.js'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white text-lg shadow transition hover:scale-105 dark:border-white/10 dark:bg-white/10"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
