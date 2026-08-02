import { Link } from 'react-router-dom'

function PostCard({ post, onDelete }) {
  function handleDelete(event) {
    event.preventDefault()
    onDelete(post.id)
  }

  return (
    <Link
      to={`/posts/${post.id}`}
      className="block h-full rounded-lg bg-transparent p-[2px] transition hover:bg-linear-to-r hover:from-fuchsia-400 hover:to-cyan-400 hover:shadow-md"
    >
      <div className="flex h-full flex-col rounded-[7px] border border-slate-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-fuchsia-400 to-cyan-400 text-sm font-bold text-white">
            #{post.number}
          </div>
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete post"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:text-neutral-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
        <h2 className="mt-3 font-semibold capitalize">{post.title}</h2>
        <p className="mt-1 line-clamp-3 text-sm text-slate-600 dark:text-neutral-300">
          {post.body}
        </p>
      </div>
    </Link>
  )
}

export default PostCard
