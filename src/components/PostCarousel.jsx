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
        <div className="mt-6 flex flex-wrap justify-center gap-1">
          {pages.map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              aria-label={`Go to page ${pageIndex + 1}`}
              onClick={() => setActivePage(pageIndex)}
              className="flex h-8 w-8 items-center justify-center"
            >
              <span
                className={`block h-2 w-2 rounded-full ${
                  pageIndex === activePage
                    ? 'bg-fuchsia-500'
                    : 'bg-slate-900/20 dark:bg-white/30'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostCarousel
