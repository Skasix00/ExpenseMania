function getYear() {
	const today = new Date();
	return today.getFullYear();
}

function getMonth() {
	const today = new Date();
	return today.getMonth() + 1;
}

export { getYear, getMonth };
