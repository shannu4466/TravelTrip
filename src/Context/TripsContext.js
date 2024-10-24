import React from 'react'

const TripsContext = React.createContext({
  tripsList: [],
  addTripItem: () => {},
  removeTripItem: () => {},
})

export default TripsContext
