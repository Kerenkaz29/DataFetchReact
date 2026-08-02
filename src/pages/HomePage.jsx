import { useState } from 'react'
import usePosts from '../hooks/usePosts.js'
import Title from '../components/Title.jsx'
import PostCarousel from '../components/PostCarousel.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import AddPostForm from '../components/AddPostForm.jsx'

const MAX_SUGGESTIONS = 5

function HomePage() {
  const { posts, loading, error, addPost, deletePost } = usePosts()
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  )

  const suggestions = search ? filteredPosts.slice(0, MAX_SUGGESTIONS) : []

  function selectSuggestion(title) {
    setSearch(title)
    setShowSuggestions(false)
  }

  function handleAddPost(post) {
    addPost(post)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16 text-slate-900 dark:bg-neutral-900 dark:text-white">
      <ThemeToggle />

      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center">
          <Title />
          {!loading && !error && (
            <p className="mt-2 text-xl font-semibold bg-linear-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Explore all {posts.length} posts, fetched live
            </p>
          )}
        </div>

        {!loading && !error && (
          <>
            <div className="relative mt-8 rounded-full bg-transparent p-[2px] transition focus-within:bg-linear-to-r focus-within:from-fuchsia-400 focus-within:to-cyan-400">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                placeholder="Search posts by title..."
                className="w-full rounded-full border-none bg-white px-4 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
              />

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                  {suggestions.map((post) => (
                    <li key={post.id}>
                      <button
                        type="button"
                        onMouseDown={() => selectSuggestion(post.title)}
                        className="block w-full px-4 py-2 text-left capitalize hover:bg-slate-100 dark:hover:bg-neutral-700"
                      >
                        {post.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-4 w-full rounded-lg border border-dashed border-slate-300 py-3 font-medium text-slate-600 transition hover:border-fuchsia-400 hover:text-fuchsia-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-fuchsia-400 dark:hover:text-fuchsia-400"
              >
                + Add a new post
              </button>
            )}

            {showForm && <AddPostForm onAdd={handleAddPost} onCancel={() => setShowForm(false)} />}
          </>
        )}

        <div className="mt-12">
          {loading && (
            <p className="text-center text-slate-500 dark:text-neutral-400">Loading posts...</p>
          )}
          {!loading && error && <p className="text-center text-red-400">{error}</p>}
          {!loading && !error && filteredPosts.length === 0 && (
            <p className="text-center text-slate-500 dark:text-neutral-400">
              No posts match your search.
            </p>
          )}
          {!loading && !error && filteredPosts.length > 0 && (
            <PostCarousel key={search} posts={filteredPosts} onDelete={deletePost} />
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
