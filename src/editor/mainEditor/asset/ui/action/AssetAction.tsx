export const GET_IMAGE_FILE: string = "GET_IMAGE_FILE";

export interface IAssetAction {
    getImageFile: Function;
}

export const getImageFile = (imgFiles) => ({
    type: GET_IMAGE_FILE,
    images:imgFiles
});