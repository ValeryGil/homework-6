import PostForm from './PostForm/PostForm'
import PostsList from './PostsList/PostsList'

const {
  createContext, useState, useEffect, useContext,
} = require('react')

const PostsContext = createContext()

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/posts')
      .then((response) => response.json())
      .then((dataFromServer) => setPosts(dataFromServer))
  }, [])

  const addPost = (newPost) => {
    setPosts((prev) => [...prev, newPost])
  }

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      <PostForm />

      <hr className="mb-4" />

      <PostsList />
    </PostsContext.Provider>
  )
}

export default Posts

const usePostsContext = () => useContext(PostsContext)

export {
  PostsContext,
  usePostsContext,
}
