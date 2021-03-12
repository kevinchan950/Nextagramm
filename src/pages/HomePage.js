import React , {useState, useEffect} from "react";
import { CardImg, CardBody, CardTitle} from 'reactstrap';
import UserImages from '../components/UserImages'
import axios from 'axios'
import LoadingIndicator from '../containers/LoadingIndicator'
import {Link} from 'react-router-dom'

const HomePage = () => {
	
	const [users,setUsers] = useState([])
	const [isLoading,setIsLoading] = useState(true)

	useEffect(()=>{
	  axios.get('https://insta.nextacademy.com/api/v1/users')
	  .then((response)=>{
	    setUsers(response.data)
	    setIsLoading(false)
	  })
	},[])
	
	if(isLoading){
	    return(
	    <LoadingIndicator width="100px" height="100px" color="red" />
	    )
	}

	return (
		<React.Fragment>
			{users.map((users) => {			
				return(
				<div className="HomePage">
					<div className="HomePageCard row d-flex flex-wrap">
						<div className="col-lg-2 pr-0">	
							<CardBody className="HomePageCardBody">
								<CardTitle className="HomePageCardTitle">
									<Link to = {`/profile/${users.id}`}>{users.username}</Link>
								</CardTitle>
							</CardBody>

							<div className="HomePageContent">	
								<CardImg className="UserProfileImage" src={users.profileImage} />
							</div>
						</div>
						
						<div className="col-lg-10 HomePageUserImage">
							<UserImages userId={users.id}/>
						</div>
					</div>			
				</div>	
				)			 
			})}
		</React.Fragment>	
	);
};

export default HomePage;