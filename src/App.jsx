import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed, Subscriptions } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/subscriptions" element={<Subscriptions />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;