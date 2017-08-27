export const getTriangleFromState = (state) => {
    return state.getIn(["scene", "triangle"]);
};

export const getCameraFromState = (state) => {
    return state.getIn(["scene", "camera"]);
};
