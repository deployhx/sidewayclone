import "xgplayer/dist/index.min.css";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Player from "xgplayer";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  LinearProgress,
  Button,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constants";
import "xgplayer/dist/index.min.css";

const XGPLAYER_URL = "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);
  const playerRef = useRef(null);
  const playerInstance = useRef(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  useEffect(() => {
    if (!videoDetail) return;
    const {
      snippet: { channelId },
    } = videoDetail;

    fetchFromAPI(`channels?part=snippet&id=${channelId}`).then((data) =>
      setChannelDetails(data?.items[0])
    );
  }, [videoDetail]);

  // xgplayer setup
  useEffect(() => {
    if (playerRef.current) {
      if (playerInstance.current) {
        playerInstance.current.destroy();
        playerInstance.current = null;
      }
      playerInstance.current = new Player({
        id: "xgplayer-container",
        url: XGPLAYER_URL,
        width: "100%",
        height: "100%",
        autoplay: true,
      });
    }
    // Cleanup on unmount
    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
        playerInstance.current = null;
      }
    };
  }, [id]);

  const handleSubscribe = () => {
    if (!channelDetails) return;
    const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
    const channelId = channelDetails.id;
    const channelTitle = channelDetails.snippet.title;
    const profilePicture = channelDetails.snippet.thumbnails.high.url;
    if (!subscriptions.some((sub) => sub.channelId === channelId)) {
      subscriptions.push({ channelId, channelTitle, profilePicture });
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
      alert("Subscribed!");
    } else {
      alert("Already subscribed!");
    }
  };

  if (!videoDetail || !videos?.length)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ backgroundColor: "#9403fc" }} />
      </Box>
    );

  const {
    snippet: { title, channelId, channelTitle, description, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="90vh" sx={{ maxWidth: "100%", overflowX: "hidden", p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ bgcolor: "#212121", p: 2, borderRadius: 2 }}>
            {/* Responsive 16:9 video frame */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%", // 16:9 aspect ratio
                mb: 2,
                borderRadius: 2,
                overflow: "hidden",
                background: "#000",
              }}
            >
              <div
                id="xgplayer-container"
                ref={playerRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>

            {/* Video details */}
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
              {title}
            </Typography>

            {/* Channel details with Subscribe button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link
                  to={`/channel/${channelId}`}
                  style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
                >
                  <Avatar
                    src={
                      channelDetails?.snippet?.thumbnails?.high?.url ||
                      demoProfilePicture
                    }
                    alt="Channel Logo"
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ ml: 1, color: "#fff" }}
                  >
                    {channelTitle}
                    <CheckCircle
                      sx={{ fontSize: 12, color: "gray", ml: 1 }}
                    />
                  </Typography>
                </Link>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </Box>

            {/* Video stats */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                color: "gray",
                mb: 2,
              }}
            >
              <Typography variant="caption">
                {`${parseInt(viewCount).toLocaleString()} views`}
              </Typography>
              <Typography variant="caption">
                {`${parseInt(likeCount).toLocaleString()} likes`}
              </Typography>
              <Typography variant="caption">
                {new Date(publishedAt).toLocaleDateString()}
              </Typography>
            </Box>

            {/* Video description */}
            <Typography
              variant="body2"
              sx={{ color: "gray" }}
            >
              {description}
            </Typography>
          </Box>
        </Grid>

        {/* Related videos */}
        <Grid item xs={12} md={4}>
          <Videos videos={videos} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoDetail;