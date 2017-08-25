export const getDom = (ct,name) => {
    return ct.find(name);
};

export const getDomAttribute = (dom, attributeName)=>{
    return dom.node.props[attributeName];
}
