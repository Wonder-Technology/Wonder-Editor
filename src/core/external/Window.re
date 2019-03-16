let getLanguage = [%raw
  param => "
    function getLanguageFromBrower() {
        var Browser_Agent = navigator.userAgent;
        if (Browser_Agent.toLowerCase().indexOf('msie') != -1) {
            if (navigator.browserLanguage.toLowerCase() === 'zh-cn') {
                return 'ZH';
            } else {
                return 'EN';
            }
        } else {
            if (navigator.language.toLowerCase() === 'zh-cn') {
                return 'ZH';
            } else {
                return 'EN';
            }
        }
    };

    let language = window.localStorage['language'];

    if (language === undefined || language === null) {
        return getLanguageFromBrower();
    } else {
        return language
    }
"
];