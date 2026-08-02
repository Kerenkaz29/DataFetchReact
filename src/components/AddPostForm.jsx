import { useState } from 'react'

function AddPostForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      })
      if (!response.ok) throw new Error('Request failed')
      const newPost = await response.json()

      onAdd(newPost)
      setTitle('')
      setBody('')
    } catch {
      setError('Failed to add post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Add a new post</h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
        className="mt-3 w-full rounded-lg border-none bg-slate-100 px-4 py-2 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-neutral-700 dark:placeholder-neutral-300"
      />

      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Body"
        required
        rows={3}
        className="mt-3 w-full rounded-lg border-none bg-slate-100 px-4 py-2 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-neutral-700 dark:placeholder-neutral-300"
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-3 rounded-lg bg-fuchsia-500 px-4 py-2 font-medium text-white transition hover:bg-fuchsia-600 disabled:opacity-50"
      >
        {submitting ? 'Adding...' : 'Add Post'}
      </button>
    </form>
  )
}

export default AddPostForm
