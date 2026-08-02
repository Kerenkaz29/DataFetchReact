import { useEffect, useState } from 'react'
import useFetch from './useFetch.js'

function usePosts() {
  const { data: fetchedPosts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
  )

  const [newPosts, setNewPosts] = useState(() => {
    const stored = localStorage.getItem('newPosts')
    return stored ? JSON.parse(stored) : []
  })
  const [deletedIds, setDeletedIds] = useState(() => {
    const stored = localStorage.getItem('deletedIds')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('newPosts', JSON.stringify(newPosts))
  }, [newPosts])

  useEffect(() => {
    localStorage.setItem('deletedIds', JSON.stringify(deletedIds))
  }, [deletedIds])

  const posts = [...newPosts, ...(fetchedPosts || [])]
    .filter((post) => !deletedIds.includes(post.id))
    .map((post, index) => ({ ...post, number: index + 1 }))

  function addPost(post) {
    setNewPosts((current) => [{ ...post, id: posts.length + 1 }, ...current])
  }

  function deletePost(id) {
    const isLocalPost = newPosts.some((post) => post.id === id)
    if (isLocalPost) {
      setNewPosts((current) => current.filter((post) => post.id !== id))
    } else {
      setDeletedIds((current) => [...current, id])
    }
  }

  return { posts, loading, error, addPost, deletePost }
}

export default usePosts
