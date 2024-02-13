import React, {useState} from 'react'
import axios from 'axios'
import {FaSearch, FaGithub} from 'react-icons/fa'
import {MdLocationOn, MdLink} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
// Import the CSS file
import './index.css'

function Home() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState(null)

  const apiKey = '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'
  const navigate = useNavigate()

  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://apis2.ccbp.in/gpv/profile-details/${username}`,
        {
          params: {api_key: apiKey},
        },
      )
      setUserData(response.data)
      setInputError(null)
      navigate(`/repositories/${username}`)
    } catch (e) {
      setError(error)
      setInputError('Invalid username. Please enter a valid GitHub username.')
      setUserData(null)
    }
    setLoading(false)
  }

  const handleSearch = () => {
    if (username.trim() !== '') {
      navigate(`/repositories/${username}`)
      fetchUserProfile()
      setUsername('')
    } else {
      setInputError('Please enter a valid GitHub username')
    }
  }

  const handleTryAgain = () => {
    fetchUserProfile()
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        aria-label="Enter GitHub username"
      />
      <button onClick={handleSearch} aria-label="Search">
        <FaSearch />
      </button>
      {inputError && <p>{inputError}</p>}
      <h6>Github Profile Visualizer</h6>

      {loading && <p>Loading...</p>}
      {userData && (
        <div>
          <h5>{userData.login}</h5>
          <img
            src={userData.avatar_url}
            alt="Avatar"
            style={{borderRadius: '50%'}}
          />
          <p>{userData.bio}</p>
          <div className="d-flex">
            <div>
              <h5>{userData.followers}</h5>
              <p>FOLLOWERS</p>
            </div>
            <div>
              <h5>{userData.following}</h5>
              <p>FOLLOWING</p>
            </div>
            <div>
              <h5>{userData.public_repos}</h5>
              <p>PUBLIC REPOS</p>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <p>Company</p>
              <FaGithub /> <h5>{userData.company}</h5>
            </div>
            <div>
              <p>Company Url</p>
              <MdLink /> <h5>{userData.html_url}</h5>
            </div>
            <div>
              <MdLocationOn />
              <p>Location</p>
              <h5>{userData.location}</h5>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div>
          <p>Something went wrong. Please try again</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  )
}

export default Home
