import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Image from 'react-graceful-image'
import LoadingIndicator from '../containers/LoadingIndicator'

const UserImages = ({userId}) => {

const[isLoading,setIsLoading] = useState(true)
const[userImages,setUserImages]=useState([])

useEffect(()=>{
	axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
	.then((response)=>{
		setUserImages(response.data)
		setIsLoading(false)
	})
},[userId])	

if(isLoading){
  	return(
  	<LoadingIndicator width="100px" height="100px" color="red" />
  	)
}

	return(
		<React.Fragment>
			{userImages.map((userImages)=>{
				return (
					<Image className="Image" src={userImages.url} />
				)
			})}

		</React.Fragment>
	);
};

export default UserImages;