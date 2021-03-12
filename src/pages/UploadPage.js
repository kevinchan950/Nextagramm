import React, { useState } from 'react'
import { Form, FormGroup, Input, Button, FormText} from 'reactstrap'
import LoadingIndicator from '../containers/LoadingIndicator'
import axios from 'axios'

const UploadPage = () => {
	
	const[imageFile, setImageFile] = useState(null)
	const[imageValue, setImageValue] = useState(null)
	const[previewImage, setPreviewImage] = useState(null)
	const[message, setMessage] = useState("")
	const[isLoading, setIsLoading] = useState(true)

	const handleUploadImage = (e) => {
		setImageFile(e.target.file[0])
		setImageValue(e.target.value)
		setPreviewImage(URL.createObjectURL(e.target.file[0]))
	}

	const handleUploadSubmit = (e) => {
		e.preventDefault()
		let token = localStorage.getItem("token");
		let formData = new FormData();
		formData.append("image", imageFile);

		axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
			headers: {
				"Authorization" : `Bearer ${token}`
			}
		})
		.then(response=>{
			if (response.data.success) {
				setMessage("Image Uploaded Successfully!")
				setPreviewImage(null)
				setImageFile(null)
			}
		})
		.catch(error=>{
			console.log(error.response.data.message)
		})
	}

	return (
		<>
			<h1 className="uploadpage-header">Upload Page</h1>
			<Form className="uploadpage-form" onSubmit={handleUploadSubmit}>
				<FormGroup>
					<Input type="file" name="image-file" onChange={handleUploadImage} value={imageValue} />
					<FormText>
						Make sure the image being uploaded is a supported format.
					</FormText>
				</FormGroup>
				<Button type="submit" color="primary">
					Upload
				</Button>
			</Form>

			<div className="card">
				{previewImage ? (
					<img className="previewImage" src={previewImage} width="50%" height="50%" display="flex" />
					): (
						<h3 className="text-center">
							{message ? message : "Live Preview"}
						</h3>
					) 
				}
			</div>
		</>		
	);
};

export default UploadPage;