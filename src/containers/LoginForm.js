import React, {useState} from 'react'
import { Link , useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginForm = ({swapForm, handleModalClick}) => {
	
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const history = useHistory()

	let token = localStorage.getItem("token")
	let loginUser = localStorage.getItem("loginUser")

	const handleClick = ()=> {
		swapForm()
	}

	const handleLoginClick = ()=> {
		axios.post("https://insta.nextacademy.com/api/v1/login", {
			username, password
		})
		.then(response=>{
			localStorage.setItem("token", response.data.auth_token)
			localStorage.setItem("loginUser", response.data.user.username)
	
			history.push("/profile")
			handleModalClick()
			toast(`Welcome ${username}}!`, {
				autoClose:true,
				style: {
					backgroundColor: "lightgreen",
					color: "white"
				}
			})
		})
		.catch(err=>{
			if(err.length!=0){
				toast("Username or password is incorrect!", {
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
	}

	const handlePasswordInput =(e)=>{
		setPassword(e.target.value)
	}

	return (
		<>
			<div className="form">
				<h1 className="form-header">Log In</h1>
				<div>
					<div>
						<label className="form-label">Username: </label>
						<input className="form-input" onChange={handleNameInput} type="text" placeholder="Enter between 5 to 20 characters" value={username}/>				
					</div>
					<div>
						<label className="form-label">Password: </label>
						<input className="form-input" onChange={handlePasswordInput} type="password" />
					</div>
					<div>
						<span className="small">
							Not yet sign up?   
							<Link className="form-link small" onClick={handleClick}>
								{" "}Sign Up! <FontAwesomeIcon icon={faArrowLeft} /> 
							</Link>
						</span>
					</div>
					<button className="form-button" onClick={handleLoginClick}> Log In </button>
					<button className="form-button" onClick={handleModalClick}> Close </button>
				</div>
			</div>
		</>
	);
};

export default LoginForm;