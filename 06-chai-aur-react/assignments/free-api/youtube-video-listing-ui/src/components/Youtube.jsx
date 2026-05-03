import { useState } from "react";
import "./Youtube.css";

const Youtube = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async function () {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/youtube/videos",
      );
      const data = await response.json();
      console.log("Full API Response:", data);
      console.log("Videos Array:", data.data.data);
      if (data.data.data && data.data.data.length > 0) {
        console.log("First video object:", data.data.data[0]);
        console.log("Video keys:", Object.keys(data.data.data[0]));
      }
      setVideos(data.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="youtube-container">
      <h1>YouTube Video Listing</h1>
      <p>This is a simple UI to display a list of YouTube videos.</p>
      <button className="load-btn" onClick={fetchVideos}>
        Load Videos
      </button>

      <div className="videos-grid">
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="video-card">
              <img
                src={video.items?.snippet?.thumbnails?.medium?.url}
                alt={video.items?.snippet?.title}
              />
              <div className="video-card-content">
                <h3>{video.items?.snippet?.title}</h3>
                <p>{video.items?.snippet?.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-videos">Click "Load Videos" to see YouTube videos</p>
        )}
      </div>
    </div>
  );
};

export default Youtube;
