import { Map } from "immutable";
import {initEditor} from "./MainView";
import {getCurrentGameObjectUId, getSceneUId, hasCurrentGameObjectByUId} from "./SceneView";

export const initEditorView = initEditor;

export const getCurrentGameObjectUIdView = getCurrentGameObjectUId;

export const hasCurrentGameObjectByUIdView = hasCurrentGameObjectByUId;

export const getSceneUIdView = getSceneUId;