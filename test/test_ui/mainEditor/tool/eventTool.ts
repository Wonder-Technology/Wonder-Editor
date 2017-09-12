export const execEventHandler = (dom:any, handlerName:string, fakeData:any) => {
    dom.prop(handlerName)(fakeData);
}

