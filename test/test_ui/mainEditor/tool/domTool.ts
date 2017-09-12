export const getDom = (ct:any,name:string) => {
    return ct.find(name);
};

export const getDomAttribute = (dom:any, attributeName:string)=>{
    return dom.prop(attributeName);
}
