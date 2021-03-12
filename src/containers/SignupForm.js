import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { checkUsername, checkEmail, checkPassword } from '../utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignupForm = ({swapForm, handleModalClick}) => {
	
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isDuplicate, setIsDuplicate] = useState(false)
	const [timeoutID, setTimeoutID] = useState(0)

	const handleClick = ()=> {
		swapForm()
	}

	const handleSignupClick = ()=> {
		axios.post("https://insta.nextacademy.com/api/v1/users/", {
			username, email, password
		})
		.then(response=>{
			localStorage.setItem("token", response.data.auth_token)
			localStorage.setItem("loginUser", response.data.user.username)
			handleModalClick()
		})
		.catch(err=>{
			const errors = err.response.data.message
			for (let i=0; i<errors.length;i++){
				toast(errors[i], {
					autoClose:true,
					style: {
						backgroundColor:"#f44646",
						color: "white"
					}
				})
			}
		})
	}

	const handleNameInput =(e)=>{
		setUsername(e.target.value)
		checkDuplicate(e.target.value)
	}

	const handleEmailInput =(e)=>{
		setEmail(e.target.value)
	}

	const handlePasswordInput =(e)=>{
		setPassword(e.target.value)
	}

	const checkDuplicate = (username) => {
		clearTimeout(timeoutID)
		if(username.trim().length ==0) {
			setIsDuplicate(false)
		}
		else {
			const newTimeoutID = setTimeoutID (()=>{
				axios.get("https://insta.nextacademy.com/api/v1/users/check_name?username=" + username)
				.then(response=>{
					setIsDuplicate(response.data.exists)
				})
			}, 3000)
			setTimeoutID(newTimeoutID)
		}
	}

	const toastInputCheck = (msg) => {
		toast(msg, {
			auto: false,
			closeButton: false,
			closeOnClick: false,
			style: {
				backgroundColor: "#f44646",
				color: "white"
			}
		})
	}

	const checkInput = () => {
		const u = checkUsername(username)
		const e = checkEmail(email)
		const p = checkPassword(password)
		if (username.length && !u) {
			toastInputCheck("Username must be in between 8 to 20 characters")
		}
		if (email.length && !e) {
			toastInputCheck("Email format is invalid")
		}
		if (password.length && !p) {
			toastInputCheck("Password must be in between 8 to 50 characters")
		}
		if (isDuplicate) {
			toastInputCheck("Username already exists")
		}
		if (u && e && p && !isDuplicate) {
			return false
		}
		return true
	}

	toast.dismiss()

	return (
		<>
			<div className="form">
				<h1 className="form-header">Sign Up</h1>
				<div>
					<div>
						<label className="form-label">Username: </label>
						<input className="form-input" onChange={handleNameInput} type="text" placeholder="Enter between 5 to 20 characters"	/>				
					</div>
					<div>
						<label className="form-label">Email: </label>
						<input className="form-input" onChange={handleEmailInput} type="email"/>				
					</div>
					<div>
						<label className="form-label">Password: </label>
						<input className="form-input" onChange={handlePasswordInput} type="password" />
					</div>
					<div>
						<span className="small">
							Already a member?   
							<Link className="form-link small" onClick={handleClick}>
								{" "}Log In! <FontAwesomeIcon icon={faArrowLeft} /> 
							</Link>
						</span>
					</div>
					<button className="form-button" disabled={checkInput()} onClick={handleSignupClick}> Sign Up </button>
					<button className="form-button" onClick={handleModalClick}> Close </button>
				</div>
			</div>
		</>
	);
};

export default SignupForm;