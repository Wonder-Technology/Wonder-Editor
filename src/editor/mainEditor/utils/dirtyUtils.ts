export const markNotDirty = (reactComponentInstance:any) => {
    reactComponentInstance.setState({change:false});
};

export const markDirty = (reactComponentInstance:any) => {
    reactComponentInstance.setState({change:true});
};

export const isDirty = (reactComponentInstance:any) => {
    return reactComponentInstance.change === true;
};
