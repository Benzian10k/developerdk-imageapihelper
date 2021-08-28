/*random api helper*/
const {
	checkupdate
} = require('./functioncheckupdate');
/*class api*/
class api {
	constructor() {}
	randomimage({ query: type, res: app, host: host }) {
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
		const superagent = require('superagent');
		let list = [];
		superagent
			.get(
				`https://raw.githubusercontent.com/developerdk1973/developerdk-imageapiconfig/main/imageconfig.json`
			)
			.end((err, response) => {
				if (err) {
					return {
						error: true,
						type: 'api-error'
					};
				}
				const jsondata = JSON.parse(response.text);
				const imageapidata = jsondata.data;
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
				const oururl = `${apikey}${imagetype}${Math.floor(
					Math.random() * (total - 1 + 1) + 1
				)}.${format}`;
				app.get(`/image/${type}/${imagetype}.${format}`, (req, res) => {
					res.send({ url: oururl });
				});
				app.use((req, res) => {
					res.status(404).send({ error: '404 not found' });
				});
				list.push = `${host}/image/${type}/${imagetype}.${format}`;
			});
			return list;
	}
}
/**/
/*checkupdate*/
checkupdate();
/**/
/*api export*/
if (typeof exports == 'object') exports.api = api;
/**/
