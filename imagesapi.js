const superagent = require('superagent');
/*random api helper*/
class api {
	constructor() {}
	randomimage({ query: type, res: app }) {
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
			});
	}
}
/*update checker*/
async function checkupdate() {
	if (!require('node-fetch')) return;
	const packageData = await require('node-fetch')(
		`https://registry.npmjs.com/developerdk-imageapihelper`
	).then(text => text.json());
	if (require('./package.json').version !== packageData['dist-tags'].latest) {
		console.log('\n\n');
		console.log(
			'\x1b[32m' + '---------------------------------------------------'
		);
		console.log(
			'\x1b[32m' +
				'| @ developerdk-imageapihelper                        - [] X |'
		);
		console.log(
			'\x1b[32m' + '---------------------------------------------------'
		);
		console.log(
			'\x1b[33m' +
				`|            The module is\x1b[31m out of date!\x1b[33m           |`
		);
		console.log(
			'\x1b[35m' + '|             New version is available!           |'
		);
		console.log(
			'\x1b[34m' +
				`|                  ${require('./package.json').version} --> ${
					packageData['dist-tags'].latest
				}                |`
		);
		console.log(
			'\x1b[36m' +
				'|        Run "npm i developerdk-imageapihelper@latest"       |'
		);
		console.log(
			'\x1b[36m' + '|                    to update!                   |'
		);
		console.log(
			'\x1b[37m' + `|          View the full changelog here:          |`
		);
		console.log(
			'\x1b[32m' + '---------------------------------------------------\x1b[37m'
		);
		console.log('\n\n');
	}
}
checkupdate();
/**/
if (typeof exports == 'object') exports.api = api;
/**/
