import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
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

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);

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
    <Box minHeight="90vh" sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              bgcolor: "#212121",
              p: 1,
              marginBottom: 1,
            }}
          >
            {/* Video player */}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            {/* Video details */}
            <Typography
              variant="h6"
              sx={{ marginTop: "16px", color: "#fff", mb: 2 }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <Link
                to={`/channel/${channelId}`}
                style={{ display: "flex", alignItems: "center" }}
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
                  sx={{ marginLeft: "8px", color: "#fff" }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: 12, color: "gray", marginLeft: "5px" }}
                  />
                </Typography>
              </Link>
              <Button
                variant="contained"
                color='secondary'
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </Box>

            {/* Video stats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
                color: "gray",
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
              sx={{ color: "gray", marginTop: "8px" }}
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