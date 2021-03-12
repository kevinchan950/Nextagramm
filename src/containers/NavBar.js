import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import Modal from '../components/Modal'

const NavBar = () => {
	let token = localStorage.getItem("token")

	let loginUser = localStorage.getItem("loginUser")

	const handleLogoutClick = () => {
		localStorage.clear()
	}

	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg">	
				
				<Link className="navbarlink" to = "/"><FontAwesomeIcon icon={faInstagram}/>{" "}Nextagram</Link>

				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarlinks" aria-controls="navbarlinks" aria-expanded="false" aria-label="Toggle navigation">
    				<span class="navbar-toggler-icon"></span>
  				</button>

				<div className="collapse navbar-collapse" id="navbarlinks">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							{
								token ?
									<Link className="navbarlink" to = "/profile">{loginUser}</Link>:
									""

							}
						</li>
						<li className="nav-item">
							{
								token ?
									<Link exact path = "/" className="navbarlink" onClick={handleLogoutClick}> Log Out </Link>:
									<Modal />
							}
						</li>
					</ul>
					<form className="form-inline my-2 my-lg-0 navform">
						<input className="form-control mr-sm-2 navSearch" type="search" placeholder="Search" />
						<button className="btn btn-outline-success my-2 my-sm-0 navbutton" type="submit">Search</button>
					</form>
				</div>
			</nav>
		</React.Fragment>
	);
};

export default NavBar;