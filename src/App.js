import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import Home from './components/Home'
import Login from './components/Login'
import BookTrip from './components/BookTrip'
import Mytrips from './components/Mytrips'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import TripsContext from './Context/TripsContext'

// Replace your code here
class App extends Component {
  state = {
    tripsList: [],
  }

  addTripItem = (endLoc, startDate, endDate) => {
    const newTrip = {
      id: uuidv4(),
      endLoc,
      startDate,
      endDate,
    }
    this.setState(prevState => ({
      tripsList: [...prevState.tripsList, newTrip],
    }))
  }

  removeTripItem = id => {
    const {tripsList} = this.state
    const updatedCartList = tripsList.filter(
      eachTripItem => eachTripItem.id !== id,
    )
    this.setState({tripsList: updatedCartList})
  }

  render() {
    const {tripsList} = this.state
    return (
      <TripsContext.Provider
        value={{
          tripsList,
          addTripItem: this.addTripItem,
          removeTripItem: this.removeTripItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/book-a-new-trip" component={BookTrip} />
          <ProtectedRoute exact path="/my-trips" component={Mytrips} />
          <Route component={PageNotFound} />
        </Switch>
      </TripsContext.Provider>
    )
  }
}

export default App
