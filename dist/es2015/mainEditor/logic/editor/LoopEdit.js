export var saveLoop = function (name, state, loop) {
    var resultState = null;
    resultState = state.setIn(["MainView", name], loop);
    return resultState;
};
//# sourceMappingURL=LoopEdit.js.map