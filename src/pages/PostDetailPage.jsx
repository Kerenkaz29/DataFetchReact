import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'

function PostDetailPage() {
  const { id } = useParams()
  const {
    data: post,
    loading: loadingPost,
    error: postError,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const {
    data: comments,
    loading: loadingComments,
    error: commentsError,
  } = useFetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/20 hover:text-white"
        >
          ← Back to posts
        </Link>

        {loadingPost && <p className="mt-6 text-white/50">Loading post...</p>}
        {!loadingPost && postError && (
          <p className="mt-6 text-red-400">Post not found.</p>
        )}

        {!loadingPost && post && (
          <div className="mt-6">
            <h1 className="text-2xl font-semibold capitalize">{post.title}</h1>
            <p className="mt-3 text-white/70">{post.body}</p>
          </div>
        )}

        <h2 className="mt-10 mb-4 text-lg font-semibold">
          Comments{!loadingComments && comments && ` (${comments.length})`}
        </h2>

        {loadingComments && <p className="text-white/50">Loading comments...</p>}
        {!loadingComments && commentsError && (
          <p className="text-red-400">Couldn't load comments.</p>
        )}
        {!loadingComments && comments && comments.length === 0 && (
          <p className="text-white/40">No comments yet.</p>
        )}

        {!loadingComments && comments && comments.length > 0 && (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment.id} className="flex gap-3 rounded-lg bg-white/10 p-4">
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-fuchsia-500/30 text-sm font-medium uppercase">
                  {comment.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{comment.name}</p>
                  <p className="text-xs text-white/40">{comment.email}</p>
                  <p className="mt-2 text-sm text-white/70">{comment.body}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PostDetailPage
