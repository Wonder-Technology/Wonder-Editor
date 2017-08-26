import { createState, getState, setState } from "./StateManagerEdit";
import { getCameraFromState, getTriangleFromState } from "./SceneGameObjectEdit";
import { Map } from "immutable";

export const getStateEdit = getState;
export const setStateEdit = setState;
export const createStateEdit = createState;
export const getTriangleFromStateEdit = getTriangleFromState;
export const getCameraFromStateEdit = getCameraFromState;