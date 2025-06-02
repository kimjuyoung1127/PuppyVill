// src/components/YouTubeEmbed.js
import React from 'react';

/**
 * YouTubeEmbed component to embed a YouTube video.
 * For responsiveness, apply the following CSS:
 * .video-responsive-wrapper {
 *   position: relative;
 *   padding-bottom: 56.25%; /* 16:9 aspect ratio */
 *   height: 0;
 *   overflow: hidden;
 *   margin-bottom: 1rem; /* Optional: for spacing between videos */
 * }
 * .video-responsive-iframe {
 *   position: absolute;
 *   top: 0;
 *   left: 0;
 *   width: 100%;
 *   height: 100%;
 * }
 */
const YouTubeEmbed = ({ videoId }) => {
  if (!videoId) {
    return <p>Video ID is missing.</p>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-responsive-wrapper">
      <iframe
        className="video-responsive-iframe"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      />
    </div>
  );
};

export default YouTubeEmbed;
