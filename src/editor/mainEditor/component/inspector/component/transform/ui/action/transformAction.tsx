export const GETTRANSFORM: string = "GETTRANSFORM";

export interface ITransformAction {
    getTransform: Function;
}

export const getTransform = () => ({
    type: GETTRANSFORM
});

