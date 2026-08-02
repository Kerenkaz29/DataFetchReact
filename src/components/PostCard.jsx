import { Link } from 'react-router-dom'

function PostCard({ post }) {
  return (
    <Link
      to={`/posts/${post.id}`}
      className="block rounded-xl bg-white/10 p-5 text-left transition hover:bg-white/15"
    >
      <h2 className="font-semibold capitalize">{post.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm text-white/60">{post.body}</p>
    </Link>
  )
}

export default PostCard
