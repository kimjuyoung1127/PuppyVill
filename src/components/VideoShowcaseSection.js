// src/components/VideoShowcaseSection.js
import React from 'react';
import YouTubeEmbed from './YouTubeEmbed'; // Assuming it's in the same directory

const VideoShowcaseSection = () => {
  // Placeholder video IDs - replace with actual video IDs from props or state later
  const videoId1 = "VIDEO_ID_1_PLACEHOLDER"; // Example: "dQw4w9WgXcQ"
  const videoId2 = "VIDEO_ID_2_PLACEHOLDER"; // Example: "rokGy0huYEA"

  return (
    <section className="video-showcase-section">
      <h3>Program Highlights in Action</h3>
      {/* Comment: This section is designed to hold 1-2 promotional videos. */}
      {/* Ensure the necessary CSS for .video-responsive-wrapper and .video-responsive-iframe is applied globally or scoped. */}

      {videoId1 && <YouTubeEmbed videoId={videoId1} />}
      {videoId2 && <YouTubeEmbed videoId={videoId2} />}

      {!videoId1 && !videoId2 && <p>No videos available for this program yet.</p>}
    </section>
  );
};

export default VideoShowcaseSection;
