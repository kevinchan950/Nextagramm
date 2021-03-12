export const checkUsername = (username) => {
	const l = username.length
	if (l>= 8 && l <= 20) {
		return true
	}
	return false
}

export const checkEmail = (email) => {
	return email.match(/^\S+@\S+\.\S+$/) ? true : false
}

export const checkPassword = (password) => {
	const l = password.length
	if (l >= 8 && l <= 50) {
		return true
	}
	return false
}
