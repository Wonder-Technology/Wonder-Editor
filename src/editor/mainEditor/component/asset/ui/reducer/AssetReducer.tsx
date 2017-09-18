import {GET_IMAGE_FILE} from "../action/AssetAction";

export default function getAssetFiles(state: any = {
    images:[]
}, action) {
    switch (action.type) {
        case GET_IMAGE_FILE: return Object.assign({},state,{
            images:state.images.concat(action.images)
        });
        default: return state;
    }
};
