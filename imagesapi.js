/*random api helper*/
const { checkupdate } = require('./functioncheckupdate');
/*class api*/
class api {}
/**/
/*checkupdate*/
checkupdate();
/**/
/*api assign && export*/
Object.assign(api.prototype, require('./functionimageapi'));
module.exports = {
	api
};
/**/
