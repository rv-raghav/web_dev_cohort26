import { useState } from "react";

const Youtube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async function () {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/youtube/videos",
      );
      const data = await response.json();
      setVideos(data.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="badge" style={{ marginBottom: '0.5rem' }}>MEDIA</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>YouTube Video Listing</h1>
          <p>This is a simple UI to display a list of YouTube videos.</p>
        </div>
        <button onClick={fetchVideos}>
          Load Videos
        </button>
      </div>

      <div className="grid-container">
        {loading ? (
          <div className="loading-text">Loading videos...</div>
        ) : videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="neo-card" style={{ padding: 0 }}>
              <div style={{ borderBottom: 'var(--border-width) solid var(--border-color)', height: '200px' }}>
                <img
                  src={video.items?.snippet?.thumbnails?.medium?.url || video.items?.snippet?.thumbnails?.default?.url}
                  alt={video.items?.snippet?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: '1.2' }}>{video.items?.snippet?.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                  {video.items?.snippet?.description?.slice(0, 100)}...
                </p>
                <button style={{ width: '100%' }}>Watch Now</button>
              </div>
            </div>
          ))
        ) : (
          <div className="neo-card">Click "Load Videos" to see YouTube videos</div>
        )}
      </div>
    </div>
  );
};

export default Youtube;
