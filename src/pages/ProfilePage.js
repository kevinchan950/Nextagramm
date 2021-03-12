import React , {useState, useEffect} from "react";
import UserImages from '../components/UserImages'
import axios from 'axios'
import LoadingIndicator from '../containers/LoadingIndicator' 
import { useParams, useHistory } from 'react-router-dom'
import Image from 'react-graceful-image'

const ProfilePage = () => {
	const [user, setUser] = useState([])
	const[isLoading,setIsLoading] = useState(true)
	const history = useHistory()

	if (!localStorage.getItem("token")){
		history.push("/")
	}

	useEffect(()=>{
		axios.get(`https://insta.nextacademy.com/api/v1/users/me`, {
			headers: {
				"Authorization" : `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(response=>{
			setUser(response.data)
			setIsLoading (false)
		})
	},[])

	if(isLoading){
  		return(
  			<LoadingIndicator width="100px" height="100px" color="red" />
  		)
	}

	return (
		<React.Fragment>
			<div className="ProfileSection">
				<Image src={user.profile_picture} />
				<h1>{user.username}</h1>
			</div>

			<div className="ImageSection">
				<UserImages userId={user.id} /> 
			</div>
		</React.Fragment>	
	);
};

export default ProfilePage;