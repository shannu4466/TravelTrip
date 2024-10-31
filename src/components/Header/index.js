import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GoHome} from 'react-icons/go'
import {CiShoppingBasket} from 'react-icons/ci'
import {BiLogOut} from 'react-icons/bi'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div>
      <nav className="header-container larger">
        <Link to="/" className="link">
          <h1 className="logo-home">Travel Trip</h1>
        </Link>
        <div className="nav-bars">
          <Link to="/" className="link">
            <p className="nav-btn">Home</p>
          </Link>
          <Link to="/my-trips" className="link">
            <p className="nav-btn">My Trips</p>
          </Link>
        </div>
        <button className="logout-btn" type="button" onClick={onClickLogoutBtn}>
          Logout
        </button>
      </nav>
      <nav className="mobile">
        <div className="nav-bars-mobile">
          <Link to="/" className="link">
            <button className="icon" type="button">
              <GoHome className="icon-size" />
            </button>
          </Link>
          <Link to="/my-trips" className="link">
            <button className="icon" type="button">
              <CiShoppingBasket className="icon-size" />
            </button>
          </Link>
          <button
            className="logout-btn"
            type="button"
            onClick={onClickLogoutBtn}
          >
            <BiLogOut className="icon-size" />
          </button>
        </div>
      </nav>
    </div>
  )
}
export default withRouter(Header)
