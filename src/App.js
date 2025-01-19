import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './client/src/components/Header.jsx';
import Home from './client/src/pages/Home.jsx';
import Rsvp from './client/src/pages/Rsvp.jsx';
import Timeline from './client/src/pages/Timeline.jsx';
import Travel from './client/src/pages/Travel.jsx';
import Photos from './client/src/pages/Photos.jsx';
import ThingsToDo from './client/src/pages/ThingsToDo.jsx';

function App() {
  return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="bg-image">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="timeline-of-events" element={<Timeline />} />
            <Route path="photos" element={<Photos />} />
            <Route path="travel" element={<Travel />} />
            <Route path="things-to-do" element={<ThingsToDo />} />
            <Route path="/rsvp" element={<Rsvp />} />
            {/* <Route path="contribute" element={<Contribute />} /> */}
          </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
