import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="homepage">
    <div className="larger-view-header">
      <Header />
    </div>
    <div className="homepage-container">
      <div className="page-img-mobile">
        <img
          src="https://res.cloudinary.com/drjvxkwkq/image/upload/v1725977584/travel_jikgld.png"
          alt="homepage"
          className="mobile-img"
        />
      </div>
      <div className="page-desc">
        <h1 className="moto">Travel. Relax. Memories.</h1>
        <p className="desc">
          With travel trip you can experience new travel and the best tourist
          destinations.
        </p>
        <Link to="/book-a-new-trip">
          <button className="booktrip-btn" type="button">
            Book a New Trip
          </button>
        </Link>
      </div>
      <div className="page-img">
        <img
          src="https://res.cloudinary.com/drjvxkwkq/image/upload/v1725977584/travel_jikgld.png"
          alt="homepage"
          className="larger-homepage-img"
        />
      </div>
    </div>
    <div className="mobile-header">
      <Header />
    </div>
  </div>
)

export default Home
