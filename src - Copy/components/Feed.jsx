import { useState, useEffect } from "react";
import { Box, LinearProgress, Stack, Typography, MenuItem, Select } from "@mui/material";
import { Sidebar, Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("relevance"); // New state for filter

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}&order=${filter}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory, filter]); // Add filter as a dependency

  if (!videos?.length)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ backgroundColor: "#263229" }} />
      </Box>
    );

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} Videos
        </Typography>

        {/* Filter Dropdown */}
        <Box mb={2}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ color: "white", backgroundColor: "#3d3d3d", borderRadius: 1 }}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="date">Upload Date</MenuItem>
            <MenuItem value="viewCount">View Count</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </Box>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
