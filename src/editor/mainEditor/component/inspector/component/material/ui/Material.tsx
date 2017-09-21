import * as React from "react";
import ColorPicker, { ColorPickerType } from './component/ColorPicker'
import {getCurrentGameObjectColor, setCurrentGameObjectColor} from "../logic/view/MaterialView";
import {markDirty} from "../../../../../utils/dirtyUtils";
import {addName} from "../../../../../../../typescript/decorator";
import {EComponentType} from "../../../../../enum/EComponentType";

interface IProps{
}

@addName(EComponentType.MATERIAL)
export default class Material extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    render(){
        var color = getCurrentGameObjectColor().toString();

        return (
            <article className="material-component" >
                <span>当前颜色：</span>
                <ColorPicker type={ColorPickerType.Sketch} color={color} onChange={ (color) => this.handleChange(color)} />
            </article>
        )
    }

    handleChange(color: string) {
        setCurrentGameObjectColor(color);

        markDirty(this);
    }
}