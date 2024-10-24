import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {FaRegEye} from 'react-icons/fa6'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const responseData = await response.json()
    if (response.ok) {
      this.onSuccess(responseData.jwt_token)
    } else {
      this.onFailure(responseData.error_msg)
    }
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {
      username,
      password,
      showErrorMsg,
      errorMsg,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const typeOfInput = showPassword ? 'text' : 'password'
    const showIconUrl = showPassword
      ? 'https://res.cloudinary.com/dazwjceuy/image/upload/v1722530869/eye-slash_siodyq.svg'
      : 'https://res.cloudinary.com/dazwjceuy/image/upload/v1722530779/eye_m5j2mu.svg'
    return (
      <div className="loginpage">
        <div className="card">
          <h1 className="logo">Travel Trip</h1>
          <form onSubmit={this.onSubmitForm} className="loginform">
            <label htmlFor="username" className="label">
              Username
            </label>
            <br />
            <input
              type="text"
              id="username"
              className="login-input-box"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
            <br />
            <label htmlFor="password" className="label">
              Password
            </label>
            <br />
            <div className="password-field">
              <input
                type={typeOfInput}
                id="password"
                className="login-input-box"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
              <br />
              <button
                className="eye-btn"
                onClick={this.onClickShowPassword}
                type="button"
                data-testid="show password"
              >
                <img src={showIconUrl} alt="show password" />
              </button>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
          <details className="footer">
            <summary>Click Here for Default Credentials</summary>
            <div className="type-of-user">
              <summary className="prime">
                <fieldset>
                  <h3>Username : rahul</h3>
                  <h4>Password : rahul@2021</h4>
                </fieldset>
              </summary>
            </div>
          </details>
        </div>
      </div>
    )
  }
}

export default Login
