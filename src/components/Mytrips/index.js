import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'
import TripItem from '../TripItem'
import TripsContext from '../../Context/TripsContext'

const Mytrips = () => {
  const renderEmptyView = () => (
    <div className="my-trips-container">
      <div className="empty-trip">
        <img
          src="https://res.cloudinary.com/drjvxkwkq/image/upload/v1727714808/bag_uyvde0.png"
          alt="no trips"
        />
        <h1>No upcoming trips</h1>
        <p>When you book a trip, you will see your trip details here</p>
        <Link to="/book-a-new-trip">
          <button className="confirm-btn">Book a new trip</button>
        </Link>
      </div>
      <div className="mobile-header">
        <Header />
      </div>
    </div>
  )

  const renderTripsView = tripsList => (
    <div className="my-trips-container">
      <div className="my-trips">
        <p className="trips-heading">My Trips</p>
        <ul>
          {tripsList.map(eachTrip => (
            <TripItem key={eachTrip.id} tripItemDetails={eachTrip} />
          ))}
        </ul>
      </div>
      <div className="mobile-header">
        <Header />
      </div>
    </div>
  )

  return (
    <TripsContext.Consumer>
      {value => {
        const {tripsList, id} = value
        return (
          <div>
            <div className="larger-view-header">
              <Header />
            </div>
            {tripsList.length === 0
              ? renderEmptyView()
              : renderTripsView(tripsList)}
          </div>
        )
      }}
    </TripsContext.Consumer>
  )
}

export default Mytrips
