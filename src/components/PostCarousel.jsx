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

function PostCarousel({ posts }) {
  const pages = chunk(posts, POSTS_PER_PAGE)
  const [activePage, setActivePage] = useState(0)

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pages[activePage].map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {pages.map((_, pageIndex) => (
          <button
            key={pageIndex}
            type="button"
            aria-label={`Go to page ${pageIndex + 1}`}
            onClick={() => setActivePage(pageIndex)}
            className={`h-2 w-2 rounded-full ${
              pageIndex === activePage ? 'bg-fuchsia-400' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default PostCarousel
