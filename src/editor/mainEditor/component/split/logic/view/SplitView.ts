import {markDirty} from "../../../../utils/dirtyUtils";

export const changeWidthBySplit = (reactComponent:any, styleProperty:{width:string}, value:number) => {
    styleProperty.width = `${value}%`;

    markDirty(reactComponent);
};