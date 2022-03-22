import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../../Modal/Modal'
import Form from '../Form/Form'

function PostsDetail() {
  const { postsId } = useParams()
  const navigate = useNavigate()
  const [viewModal, setViewModal] = useState(false)
  const controller = useRef(new AbortController())
  const [post, setPost] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/posts/${postsId}`, { signal: controller.current.signal })
      .then((response) => response.json())
      .then((dataFromServer) => setPost(dataFromServer))

    return () => {
      controller.current.abort()
    }
  }, [])

  const openModal = () => {
    setViewModal(true)
  }

  const closeModal = () => {
    setViewModal(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.target).entries())

    const response = await fetch(`http://localhost:3001/api/v1/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      const updatedPostFromServer = await response.json()
      setPost(updatedPostFromServer)
      closeModal()
      e.target.reset()
    } else {
      alert('Wrong data')
    }
  }

  const content = () => {
    if (!post.id) {
      return <strong>Loading...</strong>
    }

    return (
      <>
        <section className="d-flex flex-column align-items-center">
          <div className="card border-dark" style={{ width: '20rem' }}>
            <img src={post.photo} className="card-img-top img-thumbnail" alt="..." />
            <div className="card-body text-dark bg-light">
              <h5 className="card-title">{post.user}</h5>
              <p className="card-text">{post.post}</p>
            </div>
            <div className="card-body text-dark bg-light">
              <button type="button" onClick={() => navigate(-1)} className="btn btn-primary mx-2">Go back</button>
              <button type="button" onClick={openModal} className="btn btn-success">Edit</button>
            </div>
          </div>
        </section>
        <Modal
          state={viewModal}
          onClose={closeModal}
        >
          <Form
            onSubmit={submitHandler}
            {...post}
          />
        </Modal>
      </>
    )
  }

  return (
    <div className="d-flex justify-content-center">
      {content()}
    </div>
  )
}

export default PostsDetail
