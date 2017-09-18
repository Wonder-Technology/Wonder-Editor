import {IDirtyState} from "../interface/IDirtyState";

export const markNotDirty = (reactComponentInstance:any) => {
    reactComponentInstance.setState({isChange:false});
};

export const markDirty = (reactComponentInstance:any) => {
    reactComponentInstance.setState({isChange:true});
};

export const isDirty = (reactComponentState:IDirtyState) => {
    return reactComponentState.isChange === true;
};
