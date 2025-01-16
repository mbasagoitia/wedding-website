import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './client/src/components/Header';
import Home from './client/src/pages/Home';
import Rsvp from './client/src/pages/Rsvp';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="photos" element={<Photos />} />
          <Route path="timeline-of-events" element={<Timeline />} />
          <Route path="travel" element={<Travel />} />
          <Route path="things-to-do" element={<ThingsToDo />} /> */}
          <Route path="/rsvp" element={<Rsvp />} />
          {/* <Route path="contribute" element={<Contribute />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <div className="bg-image"></div> */}
      <footer></footer>
    </>
  );
}

export default App;
