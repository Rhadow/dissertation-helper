import SettingConstants from '../constants/setting-constants';

function ajaxInitializer(options) {
	let ajaxOption;

    ajaxOption = {
        url     : options.url,
        type    : options.type,
        dataType: 'json',
        cache   : false
    };
    return $.ajax(ajaxOption);
}

let API = {
	getCharacterInformation(character) {
		let ajaxOptions = {
			url  : `${SettingConstants.moeDictUrl}/uni/${character}`,
			type : 'GET'
		};
		return ajaxInitializer(ajaxOptions);
	}
};

export default API;
