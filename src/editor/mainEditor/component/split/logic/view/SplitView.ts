import {markDirty} from "../../../utils/ui/dirtyUtils";

export const changeWidthBySplit = (reactComponent:any, styleProperty:{width:string}, value:number) => {
    styleProperty.width = `${value}%`;

    markDirty(reactComponent);
};