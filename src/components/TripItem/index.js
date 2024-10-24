import TripsContext from '../../Context/TripsContext'
import './index.css'

const TripItem = props => (
  <TripsContext.Consumer>
    {value => {
      const {removeTripItem} = value
      const {tripItemDetails} = props
      const {endLoc, startDate, endDate, id} = tripItemDetails
      const onClickCancel = () => {
        removeTripItem(id)
      }
      return (
        <div className="cartItem">
          <p className="cartItemEndLoc">{endLoc}</p>
          <div className="cartItemDate">
            <p className="cartItemDateItem">Date</p>
            <p className="fromAndToDate">
              {startDate} to {endDate}
            </p>
          </div>
          <button type="button" className="cancelBtn" onClick={onClickCancel}>
            Cancel
          </button>
        </div>
      )
    }}
  </TripsContext.Consumer>
)

export default TripItem
