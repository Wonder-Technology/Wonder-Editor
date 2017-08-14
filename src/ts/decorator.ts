import {setReactComponentName} from "../utils/uiUtil";

export function addName(componentName:string){
    return (target:any) => {
        setReactComponentName(target,componentName);
    }
}
