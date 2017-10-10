import {EEditorState} from "../../enum/EEditorState";

//todo change to enum
export const CHANGE_EDITOR_STATE:string = "CHANGE_EDITOR_STATE";

export interface IMainEditorAction {
    setCurrentGameObjectId:Function
}

export const changeEditorState = (state:EEditorState) => ({
    type:CHANGE_EDITOR_STATE,
    state
});

