export function addName(componentName:string){
    return (target:any) => {
        target.name_for_component = componentName;
    }
}

export function getComponentName(component:any){
    return component.prototype.constructor.name_for_component;
}
