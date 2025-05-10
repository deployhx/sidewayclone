import { useState, useEffect } from "react";
import { Box, LinearProgress, Stack, Typography, Button, ButtonGroup } from "@mui/material";
import { Sidebar, Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const FILTERS = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Upload Date" },
  { value: "viewCount", label: "View Count" },
  { value: "rating", label: "Rating" },
];

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("relevance");

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}&order=${filter}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory, filter]);

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

        {/* Filter Buttons */}
        <Box mb={3}>
          <ButtonGroup
            variant="contained"
            sx={{
              background: "transparent",
              boxShadow: "none",
              gap: 2,
            }}
          >
            {FILTERS.map((f) => (
              <Button
                key={f.value}
                onClick={() => setFilter(f.value)}
                sx={{
                  borderRadius: "999px",
                  minWidth: 120,
                  height: 36,
                  px: 3,
                  fontWeight: filter === f.value ? "bold" : "normal",
                  backgroundColor: filter === f.value ? "#263229" : "#181818",
                  color: filter === f.value ? "#fff" : "#bdbdbd",
                  textTransform: "none",
                  boxShadow: filter === f.value ? 2 : "none",
                  "&:hover": {
                    backgroundColor: "#263229",
                    color: "#fff",
                  },
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;