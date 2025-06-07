import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState('')
  const videoRef = useRef(null)

  useEffect(() => {
    // Fetch available videos
    axios
      .get('http://localhost:8000/videos')
      .then((res) => setVideos(res.data))
      .catch((err) => console.error('Failed to load videos', err))
  }, [])

  const handlePlay = (e) => {
    e.preventDefault()
    if (videoRef.current) {
      videoRef.current.load() // Reload the new source
      videoRef.current.play() // Start playing
    }
  }

  return (
    <div className="App">
      <h1>🎥 Video Streaming App</h1>

      <form onSubmit={handlePlay}>
        <select
          value={selectedVideo}
          onChange={(e) => setSelectedVideo(e.target.value)}
        >
          <option value="">Select a video</option>
          {videos.map((video, idx) => (
            <option key={idx} value={video}>
              {video}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedVideo}>
          Play
        </button>
      </form>

      {selectedVideo && (
        <video ref={videoRef} controls>
          <source
            src={`http://localhost:8000/video?name=${selectedVideo}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

export default App
