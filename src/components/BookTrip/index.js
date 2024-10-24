import {Component} from 'react'
import {CiCircleInfo} from 'react-icons/ci'

import Header from '../Header'
import './index.css'
import TripsContext from '../../Context/TripsContext'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Flight'},
  {value: 'flight', displayText: 'Bus'},
  {value: 'bus', displayText: 'Car'},
  {value: 'train', displayText: 'Train'},
]

class BookTrip extends Component {
  state = {
    name: '',
    stLoc: '',
    endLoc: '',
    currentStep: 1,
    startDate: '',
    endDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    isChecked: false,
    assistanceValue: 'Car',
    nameError: false,
    startLocError: false,
    endLocError: false,
    startDateError: false,
    endDateError: false,
    showDateError: false,
    bars: [true, false, false, false, false],
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
      nameError: false,
      errorIcon: false,
    })
  }

  onchangeStartingLoc = event => {
    this.setState({stLoc: event.target.value, startLocError: false})
  }

  onChangeEndingLoc = event => {
    this.setState({endLoc: event.target.value, endLocError: false})
  }

  onBlurName = () => {
    const {name} = this.state
    if (name === '') {
      this.setState({nameError: true})
    }
  }

  onBlurStartLoc = () => {
    const {stLoc} = this.state
    if (stLoc === '') {
      this.setState({startLocError: true})
    }
  }

  onBlurEndLoc = () => {
    const {endLoc} = this.state
    if (endLoc === '') {
      this.setState({endLocError: true})
    }
  }

  renderUserDetails = () => {
    const {
      name,
      stLoc,
      endLoc,
      nameError,
      startLocError,
      endLocError,
    } = this.state
    return (
      <div className="text">
        <h1 className="info">Your Details</h1>
        <p>Enter your name and location details</p>
        <form
          className="userdetails-card"
          onSubmit={e => {
            e.preventDefault()
            let hasError = false
            if (name === '') {
              this.setState({nameError: true})
              hasError = true
            }

            if (stLoc === '') {
              this.setState({startLocError: true})
              hasError = true
            }

            if (endLoc === '') {
              this.setState({endLocError: true})
              hasError = true
            }

            if (hasError) {
              this.onBlurName()
              this.onBlurStartLoc()
              this.onBlurEndLoc()
              return
            }

            if (name !== '' && stLoc !== '' && endLoc !== '') {
              this.onSubmitDetails()
            }
          }}
        >
          <label htmlFor="name">Name</label>
          <div className="input-fields">
            <input
              type="text"
              className={`input-box ${nameError}`}
              id="name"
              value={name}
              onChange={this.onChangeName}
              placeholder="Enter name"
              onBlur={this.onBlurName}
            />
            {nameError && <CiCircleInfo className="error-icon" />}
          </div>
          {nameError && <p className="error">Enter your name</p>}
          <label htmlFor="start-loc">Start Location</label>
          <div className="input-fields">
            <input
              type="text"
              className={`input-box ${startLocError}`}
              id="start-loc"
              value={stLoc}
              onChange={this.onchangeStartingLoc}
              placeholder="Enter start location"
              onBlur={this.onBlurStartLoc}
            />
            {startLocError && <CiCircleInfo className="error-icon" />}
          </div>
          {startLocError && <p className="error">Enter your start location</p>}
          <label htmlFor="end-loc">End Location</label>
          <div className="input-fields">
            <input
              type="text"
              className={`input-box ${endLocError}`}
              id="end-loc"
              value={endLoc}
              onChange={this.onChangeEndingLoc}
              placeholder="Enter end location"
              onBlur={this.onBlurEndLoc}
            />
            {endLocError && <CiCircleInfo className="error-icon" />}
          </div>
          {endLocError && <p className="error">Enter your end location</p>}
          <button className="next-btn" type="submit">
            Next
          </button>
        </form>
      </div>
    )
  }

  onChangeSartDate = event => {
    this.setState({
      startDate: event.target.value,
      startDateError: false,
      showDateError: false,
    })
  }

  onChangeEndDate = event => {
    const endDate = event.target.value
    this.setState({endDate, endDateError: false}, () => {
      const {startDate} = this.state
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        this.setState({showDateError: true})
      } else {
        this.setState({showDateError: false})
      }
    })
  }

  onBlurStartDate = () => {
    const {startDate} = this.state
    if (startDate === '') {
      this.setState({startDateError: true})
    }
  }

  onBluEndDate = () => {
    const {endDate} = this.state
    if (endDate === '') {
      this.setState({endDateError: true})
    }
  }

  renderDatefileds = () => {
    const {
      startDate,
      endDate,
      startDateError,
      endDateError,
      showDateError,
      nameError,
    } = this.state

    return (
      <div className="text">
        <h1 className="info">Date Selection</h1>
        <p>Select your start and end date</p>
        <form
          className="userdetails-card"
          onSubmit={e => {
            e.preventDefault()
            let hasError = false
            if (startDate === '') {
              this.setState({startDateError: true})
              hasError = true
            }
            if (endDate === '') {
              this.setState({endDateError: true})
              hasError = true
            }
            if (hasError) {
              this.onBlurStartDate()
              this.onBluEndDate()
              return
            }
            if (startDate !== '' && endDate !== '' && !showDateError) {
              this.onSubmitDetails()
            }
          }}
        >
          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            id="start-date"
            className={`input-box ${startDateError}`}
            onChange={this.onChangeSartDate}
            value={startDate}
            onBlur={this.onBlurStartDate}
          />
          {startDateError && <p className="error">Select start date</p>}
          <label htmlFor="end-date">End Date</label>
          <input
            type="date"
            id="end-date"
            className={`input-box ${endDateError}`}
            onChange={this.onChangeEndDate}
            value={endDate}
            onBlur={this.onBluEndDate}
          />
          {endDateError && <p className="error">Select end date</p>}
          {showDateError && (
            <p className="error">
              The end date cannot be less than the start date
            </p>
          )}
          <div className="btns">
            <button
              className="prev-btn"
              type="button"
              onClick={this.onClickPreviousBtn}
            >
              Previous
            </button>
            <button className="next-btn" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  incrementAdult = () => {
    this.setState(prevState => ({adults: prevState.adults + 1}))
  }

  decrementAdult = () => {
    const {adults} = this.state
    if (adults > 1) {
      this.setState(prevState => ({adults: prevState.adults - 1}))
    }
  }

  incrementChild = () => {
    this.setState(prevState => ({children: prevState.children + 1}))
  }

  decrementChild = () => {
    const {children} = this.state
    if (children > 0) {
      this.setState(prevState => ({children: prevState.children - 1}))
    }
  }

  incrementInfant = () => {
    this.setState(prevState => ({infants: prevState.infants + 1}))
  }

  decrementInfant = () => {
    const {infants} = this.state
    if (infants > 0) {
      this.setState(prevState => ({infants: prevState.infants - 1}))
    }
  }

  renderGuests = () => {
    const {adults, children, infants} = this.state
    return (
      <div className="text">
        <h1 className="info">Guests</h1>
        <p>Select your guests</p>
        <form
          onSubmit={e => {
            e.preventDefault()
            this.onSubmitDetails()
          }}
          className="userdetails-card"
        >
          <div className="guest-type">
            <div className="guest">
              <p className="type-of-guest">Adults</p>
              <p>Age 13 or above</p>
            </div>
            <div className="guest-inc-or-dec">
              <button
                className="increase"
                type="button"
                onClick={this.decrementAdult}
              >
                -
              </button>
              <p className="number">{adults}</p>
              <button
                className="increase"
                type="button"
                onClick={this.incrementAdult}
              >
                +
              </button>
            </div>
          </div>
          <hr className="line" />
          <div className="guest-type">
            <div className="guest">
              <p className="type-of-guest">Children</p>
              <p>Age 2-12</p>
            </div>
            <div className="guest-inc-or-dec">
              <button
                className="increase"
                type="button"
                onClick={this.decrementChild}
              >
                -
              </button>
              <p className="number">{children}</p>
              <button
                className="increase"
                type="button"
                onClick={this.incrementChild}
              >
                +
              </button>
            </div>
          </div>
          <hr className="line" />
          <div className="guest-type">
            <div className="guest">
              <p className="type-of-guest">Infants</p>
              <p>Under 2</p>
            </div>
            <div className="guest-inc-or-dec">
              <button
                className="increase"
                type="button"
                onClick={this.decrementInfant}
              >
                -
              </button>
              <p className="number">{infants}</p>
              <button
                className="increase"
                type="button"
                onClick={this.incrementInfant}
              >
                +
              </button>
            </div>
          </div>
          <div className="btns">
            <button
              className="prev-btn"
              type="button"
              onClick={this.onClickPreviousBtn}
            >
              Previous
            </button>
            {adults >= 1 && children >= 0 && infants >= 0 && (
              <button className="next-btn" type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    )
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeAssistance = event => {
    this.setState({assistanceValue: event.target.value})
  }

  renderAssistance = () => {
    const {isChecked} = this.state
    return (
      <div className="text">
        <h1 className="info">Travel Assistance</h1>
        <p>Select your Travel Assistance</p>
        <form
          className="userdetails-card"
          onSubmit={e => {
            e.preventDefault()
            this.onSubmitDetails()
          }}
        >
          <div className="assist">
            <input
              type="checkbox"
              id="assistance"
              checked={isChecked}
              onChange={this.onClickCheckBox}
            />
            <label htmlFor="assistance">Travle Assistance Needed</label>
          </div>
          {isChecked && (
            <div>
              <p>Travel Assistance</p>
              <select
                className="input-box"
                onChange={this.onChangeAssistance}
                defaultValue="Car"
              >
                {travelAssistanceList.map(eachAssist => (
                  <option key={eachAssist.value}>
                    {eachAssist.displayText}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="btns">
            <button
              className="prev-btn"
              type="button"
              onClick={this.onClickPreviousBtn}
            >
              Previous
            </button>
            <button className="next-btn" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  onClickCancelBtn = () => {
    window.location.reload()
    this.setState({currentStep: 5})
  }

  onClickNewTripBtn = () => {
    this.setState({currentStep: 1, bars: [true, false, false, false, false]})
  }

  renderConfirmCard = () => (
    <div className="booking-confirm-card userdetails-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
        alt="Success"
        className="confirm-image"
      />
      <h1>Awesome</h1>
      <p>Your booking has been confirmed</p>
      <button
        className="confirm-btn"
        type="button"
        onClick={this.onClickNewTripBtn}
      >
        Book a New Trip
      </button>
    </div>
  )

  renderConfirmation = () => (
    <TripsContext.Consumer>
      {value => {
        const {
          name,
          stLoc,
          endLoc,
          startDate,
          endDate,
          adults,
          infants,
          children,
          assistanceValue,
          bars,
        } = this.state
        const {addTripItem} = value
        const onAddTrip = () => {
          addTripItem(endLoc, startDate, endDate)
          this.setState({
            name: '',
            stLoc: '',
            endLoc: '',
            startDate: '',
            endDate: '',
            adults: 1,
            infants: 0,
            children: 0,
            isChecked: false,
            assistanceValue: 'Car',
            bars: [false, false, false, false, false],
          })
        }
        const totalGuests = adults + children + infants
        return (
          <div className="confirm-page-card">
            <div className="confirm text">
              <h1 className="info">Confirmation</h1>
              <p className="confirm-info">Confirm your details</p>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  this.onSubmitDetails()
                }}
              >
                <div className="confirm-card">
                  <ul className="confirm-unorder-list-item">
                    <li className="confirm-list-item">
                      <p className="confirm-span-head">Name</p>
                      <p className="confirm-span">
                        :&nbsp;&nbsp;&nbsp;&nbsp;{name}
                      </p>
                    </li>
                    <li className="confirm-list-item">
                      <p className="confirm-span-head">Start Location</p>
                      <p className="confirm-span">
                        :&nbsp;&nbsp;&nbsp;&nbsp;{stLoc}
                      </p>
                    </li>
                    <li className="confirm-list-item">
                      <p className="confirm-span-head">End Location</p>
                      <p className="confirm-span">
                        :&nbsp;&nbsp;&nbsp;&nbsp;{endLoc}
                      </p>
                    </li>
                    <li className="confirm-list-item">
                      <p className="confirm-span-head">Start Date</p>
                      <p className="confirm-span">
                        :&nbsp;&nbsp;&nbsp;&nbsp;{startDate}
                      </p>
                    </li>
                    <li className="confirm-list-item">
                      <p className="confirm-span-head">End Date</p>
                      <p className="confirm-span">
                        :&nbsp;&nbsp;&nbsp;&nbsp;{endDate}
                      </p>
                    </li>
                    <li className="confirm-list-item">
                      <p className="confirm-span-head">Guests</p>
                      <p className="confirm-span">
                        :&nbsp;&nbsp;&nbsp;&nbsp;{totalGuests}
                      </p>
                    </li>
                    <li className="confirm-list-item">
                      <p className="confirm-span-head">Travel Assistance</p>
                      <p className="confirm-span">
                        :&nbsp;&nbsp;&nbsp;&nbsp;{assistanceValue}
                      </p>
                    </li>
                  </ul>
                  <div className="btns">
                    <button
                      className="prev-btn"
                      type="button"
                      onClick={this.onClickCancelBtn}
                    >
                      Cancel
                    </button>
                    <button className="next-btn" onClick={onAddTrip}>
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
      }}
    </TripsContext.Consumer>
  )

  onClickPreviousBtn = () => {
    const {bars, currentStep} = this.state
    const bar = bars
    bar[currentStep - 1] = false
    this.setState(prevState => ({
      currentStep: prevState.currentStep - 1,
    }))
  }

  onSubmitDetails = () => {
    const {currentStep, bars} = this.state
    const bar = bars
    bar[currentStep] = true
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1,
      bars: bar,
    }))
  }

  render() {
    const {currentStep, bars} = this.state
    return (
      <div className="booktrip-container">
        <div className="mobile-bars">
          {bars.slice(0, 5).map((eachBar, index) => (
            <div className={`bar ${bars[index]}`} />
          ))}
        </div>
        <div className="larger-view-header">
          <Header />
        </div>
        <div className="booktrip">
          <div className="booking-card">
            <div className="steplist-left-part">
              <ol className="step-ol">
                {stepsList.map((eachStep, index) => {
                  const stepIndex = index + 1
                  let stepClass = ''
                  if (stepIndex < currentStep) {
                    stepClass = 'completed-step'
                  } else if (stepIndex === currentStep) {
                    stepClass = 'current-step'
                  } else {
                    stepClass = 'future-step'
                  }

                  const numberClass =
                    stepIndex === currentStep
                      ? 'current-step-number'
                      : 'default-step-number'

                  return (
                    <li
                      className={`stepdetails ${stepClass}`}
                      key={eachStep.displayText}
                    >
                      {stepIndex < currentStep ? (
                        <>
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                            alt="complete"
                            className="step-image"
                          />
                          <span className="step-text">
                            {eachStep.displayText}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={`step-number ${numberClass}`}>
                            {stepIndex}
                          </span>
                          <span className="step-text">
                            {eachStep.displayText}
                          </span>
                        </>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
            <div className="steplist-right-part">
              {(() => {
                switch (currentStep) {
                  case 1:
                    return this.renderUserDetails()
                  case 2:
                    return this.renderDatefileds()
                  case 3:
                    return this.renderGuests()
                  case 4:
                    return this.renderAssistance()
                  case 5:
                    return this.renderConfirmation()
                  case 6:
                    return this.renderConfirmCard()
                  default:
                    return this.renderUserDetails()
                }
              })()}
            </div>
          </div>
        </div>
        <div className="mobile-header">
          <Header />
        </div>
      </div>
    )
  }
}

export default BookTrip
