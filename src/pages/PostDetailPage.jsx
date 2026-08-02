import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import usePosts from '../hooks/usePosts.js'
import ThemeToggle from '../components/ThemeToggle.jsx'

function PostDetailPage() {
  const { id } = useParams()

  const { posts, loading: loadingPost, error: postError } = usePosts()
  const post = posts.find((storedPost) => String(storedPost.id) === id)

  const {
    data: comments,
    loading: loadingComments,
    error: commentsError,
  } = useFetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16 text-slate-900 dark:bg-neutral-900 dark:text-white">
      <ThemeToggle />

      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm transition hover:bg-slate-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          ← Back to posts
        </Link>

        {loadingPost && (
          <p className="mt-6 text-slate-500 dark:text-neutral-400">Loading post...</p>
        )}
        {!loadingPost && (postError || !post) && (
          <p className="mt-6 text-red-400">Post not found.</p>
        )}

        {!loadingPost && post && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-fuchsia-400 to-cyan-400 text-sm font-bold text-white">
              #{post.number}
            </div>
            <h1 className="mt-4 text-xl font-semibold capitalize">{post.title}</h1>
            <p className="mt-2 text-slate-600 dark:text-neutral-300">{post.body}</p>
          </div>
        )}

        <h2 className="mt-10 mb-2 text-lg font-semibold">
          Comments{!loadingComments && comments && ` (${comments.length})`}
        </h2>

        {loadingComments && (
          <p className="text-slate-500 dark:text-neutral-400">Loading comments...</p>
        )}
        {!loadingComments && commentsError && (
          <p className="text-red-400">Couldn't load comments.</p>
        )}
        {!loadingComments && comments && comments.length === 0 && (
          <p className="text-slate-400 dark:text-neutral-500">No comments yet.</p>
        )}

        {!loadingComments && comments && comments.length > 0 && (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment.id} className="flex gap-2">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-linear-to-r from-fuchsia-400 to-cyan-400 text-sm font-bold text-white uppercase">
                  {comment.name[0]}
                </div>
                <div>
                  <div className="rounded-2xl bg-white px-3 py-2 shadow-sm dark:bg-neutral-800">
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <p className="text-sm text-slate-700 dark:text-neutral-300">
                      {comment.body}
                    </p>
                  </div>
                  <p className="mt-1 pl-3 text-xs text-slate-500 dark:text-neutral-500">
                    {comment.email}
                  </p>
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
