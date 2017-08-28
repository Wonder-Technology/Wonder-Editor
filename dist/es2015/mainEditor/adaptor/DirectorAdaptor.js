import { Director } from "wonder.js/dist/es2015/core/Director";
export var getDirector = function () {
    return Director.getInstance();
};
export var init = function () {
    getDirector().init();
};
export var loopBody = function (time) {
    getDirector().loopBody(time);
};
//# sourceMappingURL=DirectorAdaptor.js.map