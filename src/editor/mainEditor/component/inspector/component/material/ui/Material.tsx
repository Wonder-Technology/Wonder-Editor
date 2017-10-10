import * as React from "react";
import ColorPicker from './component/ColorPicker'
import {markDirty} from "../../../../utils/ui/dirtyUtils";
import {addName} from "../../../../../../../typescript/decorator";
import {EComponentType} from "../../../../../enum/EComponentType";
import {EColorPickerType} from "../../enum/EColorPickerType";

interface IProps{
    component:any;
    getGameObjectColor:Function;
    setGameObjectColor:Function;
}

@addName(EComponentType.MATERIAL)
export default class Material extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    render(){
        var color = this.props.getGameObjectColor(this.props.component).toString();

        return (
            <article className="material-component" >
                <span>当前颜色：</span>
                <ColorPicker type={EColorPickerType.SKETCH} color={color} onChange={ (color) => this.handleChange(color)} />
            </article>
        )
    }

    handleChange(color: string) {
        this.props.setGameObjectColor(this.props.component,color);

        markDirty(this);
    }
}