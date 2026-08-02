import { Link, useParams } from 'react-router-dom'

function PostDetailPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm text-white/50 hover:text-white">
          ← Back to posts
        </Link>
        <p className="mt-6 text-white/60">Post detail for #{id} coming soon.</p>
      </div>
    </div>
  )
}

export default PostDetailPage
