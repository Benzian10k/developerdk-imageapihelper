/*module exports*/
module.exports = {
	randomimage
};
/**/
/*randomimage*/
async function randomimage({ query: type, res: app, host: host }) {
	if (!app) {
		return console.log(`res not found!`);
	}
	if (type) {
		if (!type.length) {
			return {
				error: true,
				type: 'no-query'
			};
		}
	}
	if (!type) {
		return {
			error: true,
			type: 'no-query'
		};
	}
	if (host) {
		if (!host.length) {
			return {
				error: true,
				type: 'no-host'
			};
		}
	}
	if (!host) {
		return {
			error: true,
			type: 'no-host'
		};
	}
	await require('node-fetch')(
		`https://raw.githubusercontent.com/developerdk1973/developerdk-imageapiconfig/main/imageconfig.json`
	)
		.then(function(u) {
			return u.json();
		})
		.then(function(json) {
			app.get('/imageapi/config.json', (req, res) => {
				res.json(json);
			});
		});
	const imageapiconfig = await require('node-fetch')(
		host + `/imageapi/config.json`
	).then(i => i.json());
	const imageapidata = imageapiconfig.data;
	console.log(imageapidata);
	const urltype = !!imageapidata.find(
		url => url.type.toLowerCase() === type.toLowerCase()
	);
	if (!urltype) {
		return {
			error: true,
			type: 'invalid-search'
		};
	}
	const apikey = imageapidata.find(
		url => url.type.toLowerCase() === type.toLowerCase()
	).apikey;
	const imagetype = imageapidata.find(
		url => url.type.toLowerCase() === type.toLowerCase()
	).imagetype;
	const total = imageapidata.find(
		url => url.type.toLowerCase() === type.toLowerCase()
	).total;
	const format = imageapidata.find(
		url => url.type.toLowerCase() === type.toLowerCase()
	).format;
	app.get(`/image/${type}/${imagetype}.${format}`, (req, res) => {
		res.json({
			url: `${apikey}${imagetype}${Math.floor(
				Math.random() * (total - 1 + 1) + 1
			)}.${format}`
		});
	});
	app.use((req, res) => {
		res.status(404).send({ error: '404 not found' });
	});
}
/**/
