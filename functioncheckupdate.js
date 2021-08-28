/*module exports*/
module.exports = {
	checkupdate
};
/**/
/*checkupdate*/
async function checkupdate() {
	if (!require('node-fetch')) return;
	const packageData = await require('node-fetch')(
		`https://registry.npmjs.com/${require('./package.json').name}`
	).then(text => text.json());
	if (require('./package.json').version !== packageData['dist-tags'].latest) {
		console.log('\n\n');
		console.log(
			'\x1b[32m' + '---------------------------------------------------'
		);
		console.log(
			`\x1b[32m` +
				`| @ ${require('./package.json').name}                        - [] X |`
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
			`\x1b[36m` +
				`|        Run "npm i ${require('./package.json').name}@latest"       |`
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
/**/
