const { Link } = require('react-router-dom')

function PostsItem({ user, post, id }) {
  return (
    <Link className="list-group-item list-group-item-action" to={`/posts/${id}`}>
      <span className="pe-4">
        {user}
      </span>
      <span>
        {post}
      </span>
    </Link>
  )
}

export default PostsItem
