export async function call (
	url,
	method = 'POST',
	data = false,
	convertDataToJSON = true,
	authToken = '',
) {
	const options = {
		method,
	};
	options.headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${authToken}`, // Include the authorization token in the headers
	};

	if (method === 'POST' && data !== false) {
		if (convertDataToJSON) {
			options.body = JSON.stringify(data);
		} else {
			options.body = data;
		}
	}

	const response = await fetch(url, options);
	const res = await response.json();
	return res;
}
