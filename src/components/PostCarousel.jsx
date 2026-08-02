import { useState } from 'react'
import PostCard from './PostCard.jsx'

const POSTS_PER_PAGE = 6

function chunk(array, size) {
  const pages = []
  for (let i = 0; i < array.length; i += size) {
    pages.push(array.slice(i, i + size))
  }
  return pages
}

function PostCarousel({ posts, onDelete }) {
  const pages = chunk(posts, POSTS_PER_PAGE)
  const [activePage, setActivePage] = useState(0)

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pages[activePage].map((post, index) => (
          <PostCard key={`${post.id}-${index}`} post={post} onDelete={onDelete} />
        ))}
      </div>

      {pages.length > 1 && (
        <>
          <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
            <button
              type="button"
              onClick={() => setActivePage((current) => current - 1)}
              disabled={activePage === 0}
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-900/5 disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-white/10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <span className="text-sm text-slate-500 dark:text-neutral-400">
              Page {activePage + 1} of {pages.length}
            </span>

            <button
              type="button"
              onClick={() => setActivePage((current) => current + 1)}
              disabled={activePage === pages.length - 1}
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-900/5 disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-white/10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="mt-6 hidden flex-wrap justify-center gap-1.5 sm:flex">
            {pages.map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                aria-label={`Go to page ${pageIndex + 1}`}
                onClick={() => setActivePage(pageIndex)}
                className={`h-2 w-2 rounded-full ${
                  pageIndex === activePage
                    ? 'bg-fuchsia-500'
                    : 'bg-slate-900/20 dark:bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PostCarousel
