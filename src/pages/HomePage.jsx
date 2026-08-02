import useFetch from '../hooks/useFetch.js'
import Title from '../components/Title.jsx'
import PostCarousel from '../components/PostCarousel.jsx'

function HomePage() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center">
          <Title />
        </div>

        <div className="mt-12">
          {loading && <p className="text-center text-white/50">Loading posts...</p>}
          {!loading && error && <p className="text-center text-red-400">{error}</p>}
          {!loading && !error && <PostCarousel posts={posts} />}
        </div>
      </div>
    </div>
  )
}

export default HomePage
