export function registerValidations(user) {
	const errors = {};
	const regEmail =
		/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

	if (!user.name) {
		errors.name = 'Name is required';
	}

	if (!user.email) {
		errors.email = 'Email is required';
	} else if (!regEmail.test(user.email)) {
		errors.email = 'Format: something@some.com';
	}

	if (!user.password) {
		errors.password = 'Password is required';
	} else if (user.password.length < 8) {
		errors.password = 'Password must be at least 8 characters long';
	}

	return errors;
}
export function signInValidations(user) {
	const errors = {};
	const regEmail =
		/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

	if (!user.email) {
		errors.email = 'Email is required';
	} else if (!regEmail.test(user.email)) {
		errors.email = 'Format: something@some.com';
	}

	if (!user.password) {
		errors.password = 'Password is required';
	}

	return errors;
}

export function resetValidations(email) {
	const errors = {};
	const regEmail =
		/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

	if (!email.email) {
		errors.email = 'Email is required';
	} else if (!regEmail.test(email.email)) {
		errors.email = 'Format: something@some.com';
	}

	return errors;
}

export function validatePassword(password) {
	const errors = {};
	if (!password.password) {
		errors.password = 'Password is required';
	} else if (password.password.length < 8) {
		errors.password = 'Password must be at least 8 characters long';
	}
	return errors;
}
