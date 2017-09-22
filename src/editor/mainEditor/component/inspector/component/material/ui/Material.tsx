import * as React from "react";
import ColorPicker, { ColorPickerType } from './component/ColorPicker'
import {markDirty} from "../../../../../utils/dirtyUtils";
import {addName} from "../../../../../../../typescript/decorator";
import {EComponentType} from "../../../../../enum/EComponentType";

interface IProps{
    getCurrentGameObjectColor:Function;
    setCurrentGameObjectColor:Function;
}

@addName(EComponentType.MATERIAL)
export default class Material extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    render(){
        var color = this.props.getCurrentGameObjectColor().toString();

        return (
            <article className="material-component" >
                <span>当前颜色：</span>
                <ColorPicker type={ColorPickerType.Sketch} color={color} onChange={ (color) => this.handleChange(color)} />
            </article>
        )
    }

    handleChange(color: string) {
        this.props.setCurrentGameObjectColor(color);

        markDirty(this);
    }
}