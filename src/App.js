import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './client/components/Header.jsx';
import Home from './client/pages/Home.jsx';
import Rsvp from './client/pages/Rsvp.jsx';
import Timeline from './client/pages/Timeline.jsx';
import Travel from './client/pages/Travel.jsx';
import Photos from './client/pages/Photos.jsx';
import UploadPhotos from './client/pages/UploadPhotos.jsx';
import PhotoCollection from './client/pages/PhotoCollection.jsx';
import ThingsToDo from './client/pages/ThingsToDo.jsx';
import Contribute from './client/pages/Contribute.jsx';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/auth/status", { 
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        if (data.isAuthenticated) {
            setUser(data.user);
        }
    })
    .catch(() => setUser(null));
}, []);

  return (
      <BrowserRouter>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="timeline-of-events" element={<Timeline />} />
            <Route path="photos" element={<Photos />} />
            <Route path="photos/upload" element={<UploadPhotos user={user} />} />
            <Route path="photos/:category" element={<PhotoCollection />} />
            <Route path="travel" element={<Travel />} />
            <Route path="things-to-do" element={<ThingsToDo />} />
            <Route path="/rsvp" element={<Rsvp />} />
            <Route path="contribute" element={<Contribute />} />
          </Routes>
        </>
      </BrowserRouter>
  );
}

export default App;
