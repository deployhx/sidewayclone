import { useState } from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ReportIcon from '@mui/icons-material/Report';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Typography, IconButton } from "@mui/material";

// Dummy data for subscriptions
const subscriptions = [
  { id: 1, name: "React Channel", icon: <InfoOutlinedIcon /> },
  { id: 2, name: "Music Beats", icon: <InfoOutlinedIcon /> },
  { id: 3, name: "Tech Guru", icon: <InfoOutlinedIcon /> },
];

const playlists = [
  { id: 1, name: "Workout Mix" },
  { id: 2, name: "Chill Vibes" },
  { id: 3, name: "Focus Flow" },
];

const collections = [
  { id: 1, name: "Liked Videos" },
  { id: 2, name: "Watch Later" },
  { id: 3, name: "Favorites" },
];

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);
  const [isCollectionOpen, setIsCollectionOpen] = useState(true);
  const [isSubsOpen, setIsSubsOpen] = useState(true);

  // Compact mode: show only icons for first 4 categories
  if (!isSidebarOpen) {
    return (
      <Box sx={{ width: 56, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", p: 1, bgcolor: "#181818" }}>
        <IconButton onClick={() => setIsSidebarOpen(true)} sx={{ mb: 2 }}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Stack spacing={2} sx={{ flex: 1 }}>
          {categories.slice(0, 4).map((category) => (
            <IconButton
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              sx={{
                color: category.name === selectedCategory ? "#aaff00" : "#f1f1f1",
                bgcolor: category.name === selectedCategory ? "#263229" : "transparent",
                borderRadius: 2,
                width: 40,
                height: 40,
                mx: "auto"
              }}
            >
              {category.icon}
            </IconButton>
          ))}
        </Stack>
        <Box sx={{ width: "100%", mt: "auto", pb: 1 }}>
          <Stack spacing={1} alignItems="center">
            <IconButton sx={{ color: "gray" }}><SettingsIcon fontSize="small" /></IconButton>
            <IconButton sx={{ color: "gray" }}><ReportIcon fontSize="small" /></IconButton>
            <IconButton sx={{ color: "gray" }}><HelpOutlineIcon fontSize="small" /></IconButton>
            <IconButton sx={{ color: "gray" }}><FeedbackOutlinedIcon fontSize="small" /></IconButton>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: 220, md: 260 },
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#181818",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={() => setIsSidebarOpen(false)}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Sidebar Content */}
      <Stack
        direction="column"
        sx={{
          overflowY: "auto",
          flex: 1,
          gap: 1,
          px: 1,
        }}
      >
        {/* Categories */}
        {categories.map((category) => (
          <button
            className="category-btn"
            onClick={() => setSelectedCategory(category.name)}
            style={{
              background: category.name === selectedCategory && "#263229",
              color: "white",
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: "10px 16px",
              borderRadius: 6,
              marginBottom: 2,
            }}
            key={category.name}
          >
            <span style={{
              color: category.name === selectedCategory ? "#aaff00" : "#f1f1f1",
              marginRight: "15px"
            }}>
              {category.icon}
            </span>
            <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
              {category.name}
            </span>
          </button>
        ))}

        {/* Playlists */}
        <div>
          <button
            className="category-btn"
            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
            style={{
              color: "white",
              justifyContent: 'space-between',
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: "10px 16px",
              borderRadius: 6,
              marginBottom: 2,
              background: "none"
            }}
          >
            <span>Playlists</span>
            {isPlaylistOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
          {isPlaylistOpen && (
            <Stack sx={{ pl: 2 }}>
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  className="category-btn"
                  style={{
                    color: "white",
                    justifyContent: 'flex-start',
                    fontSize: '0.9rem',
                    padding: '8px 16px',
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: 6,
                    marginBottom: 2,
                  }}
                >
                  {playlist.name}
                </button>
              ))}
            </Stack>
          )}
        </div>

        {/* Collections Section */}
        <div>
          <button
            className="category-btn"
            onClick={() => setIsCollectionOpen(!isCollectionOpen)}
            style={{
              color: "white",
              justifyContent: 'space-between',
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: "10px 16px",
              borderRadius: 6,
              marginBottom: 2,
              background: "none"
            }}
          >
            <span>Collections</span>
            {isCollectionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
          {isCollectionOpen && (
            <Stack sx={{ pl: 2 }}>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  className="category-btn"
                  style={{
                    color: "white",
                    justifyContent: 'flex-start',
                    fontSize: '0.9rem',
                    padding: '8px 16px',
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: 6,
                    marginBottom: 2,
                  }}
                >
                  {collection.name}
                </button>
              ))}
            </Stack>
          )}
        </div>
      </Stack>

      {/* Footer Info */}
      <Box sx={{ p: 2, borderTop: "1px solid #222", textAlign: "center" }}>
        <Stack spacing={1} sx={{ mb: 1 }}>
          <button className="category-btn" style={{
            color: "gray", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%", padding: "4px 0"
          }}>
            <SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Settings
          </button>
          <button className="category-btn" style={{
            color: "gray", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%", padding: "4px 0"
          }}>
            <ReportIcon fontSize="small" sx={{ mr: 1 }} /> Report history
          </button>
          <button className="category-btn" style={{
            color: "gray", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%", padding: "4px 0"
          }}>
            <HelpOutlineIcon fontSize="small" sx={{ mr: 1 }} /> Help
          </button>
          <button className="category-btn" style={{
            color: "gray", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%", padding: "4px 0"
          }}>
            <FeedbackOutlinedIcon fontSize="small" sx={{ mr: 1 }} /> Send feedback
          </button>
        </Stack>
        <Typography variant="caption" color="gray" sx={{ display: "block", mb: 1 }}>
          About Press Copyright Contact us Creators Advertise Developers
        </Typography>
        <Typography variant="caption" color="gray" sx={{ display: "block" }}>
          Terms Privacy Policy &amp; Safety
        </Typography>
        <Typography variant="caption" color="gray" sx={{ display: "block", mt: 1 }}>
          &copy; {new Date().getFullYear()} SidewayClone. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;