const firstLetterToUpercase = (str: string[] | string) => {
	if (Array.isArray(str)) {
		return str.map(
			element =>
				`${element[0].toUpperCase()}${element.slice(1, element.length)}`
		)
	} else {
		return `${str[0].toUpperCase()}${str.slice(1, str.length)}`
	}
}

export default firstLetterToUpercase
