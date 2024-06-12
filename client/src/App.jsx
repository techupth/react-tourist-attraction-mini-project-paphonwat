import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [trips, setTrips] = useState([]);
  const [searches, setSearches] = useState("");

  useEffect(() => {
    setTripsData()
  }, [searches])

  const setTripsData = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/trips?keywords=${searches}`)
      setTrips(response.data.data)
    }
    catch (error) {
      console.error("ผิดพลาด", error)
    }
  };

  const handleSearchChange = (event) => {
    setSearches(event.target.value);
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="app-title">เที่ยวไหนดี</h1>
          <div className="searches">
            <label htmlFor="search">ค้นหาที่เที่ยว...</label>
            <input
             id="search" 
             type="text" 
             className="search-bar" 
             placeholder="หาที่เทียวแล้วไปกับ..."
             onChange={handleSearchChange} 
             value={searches}
             />
          </div>   
        </header>
        <main className="content">
          {trips.map((trip) => {
            return (
              <div key={trip.id} className="article">
              <img src={trip.photos[0]} alt="Image 1" className="article-image" />
              <div className="article-content">
                <h2 className="article-title"> {trip.title} </h2>
                <p className="article-description"> {trip.description.slice(0, 100)} </p>
                <p className="article-read" onClick={() => { window.open(trip.url, "_blank") }}>อ่านต่อ</p>
                <p className="article-tags">หมวด {trip.tags.join(' ')}</p>
                <div className="subImg">
                  <img src={trip.photos[1]} alt="Image 2" className="sub-image" />
                  <img src={trip.photos[2]} alt="Image 3" className="sub-image" />
                  <img src={trip.photos[3]} alt="Image 4" className="sub-image" />
                </div>
              </div>
              <img src="https://img.icons8.com/?size=100&id=IBUUC7KokVgW&format=png&color=000000" alt="link" className="to-link" />
            </div>
            )
          })}
        </main>
      </div>
    </div>
  );
}

export default App;


