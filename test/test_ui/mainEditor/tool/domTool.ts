export const getDom = (ctFromShallow:any,name:string) => {
    return ctFromShallow.find(name);
};

export const getDomAttribute = (dom:any, attributeName:string)=>{
    return dom.prop(attributeName);
}

export const getState = (ctFromShallow:any) => {
    return ctFromShallow.state();
};
