import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
    <>
      <p>Social network for sharing posts and photos.</p>
      <button type="button" onClick={() => { navigate(1) }} className="btn btn-success">Return future</button>
    </>
  )
}
export default About
