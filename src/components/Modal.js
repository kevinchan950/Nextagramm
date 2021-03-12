import React, {useState} from 'react'
import LoginForm from '../containers/LoginForm'
import SignupForm from '../containers/SignupForm'
import { Link } from 'react-router-dom'

const Modal = () => {
	
	const [showModal, setShowModal] =  useState(false)
	const [isLoginForm, setIsLoginForm] = useState(true)

	const handleModalClick =()=>{
		setShowModal(!showModal)
	}

	const swapForm =()=>{
		setIsLoginForm(!isLoginForm)
	}

	return (
		<>
			<Link className="modal-button" onClick={handleModalClick}>Account</Link>
			{
				showModal ? 
				<div className="modal-container">
					<div className="modal-content">
						<div>
							{
								isLoginForm ?
								<LoginForm swapForm={swapForm} handleModalClick={handleModalClick}/> :
								<SignupForm swapForm={swapForm} handleModalClick={handleModalClick}/>								
							}
						</div>
					</div>	
				</div> : undefined
			}
		</>
	);
};

export default Modal;