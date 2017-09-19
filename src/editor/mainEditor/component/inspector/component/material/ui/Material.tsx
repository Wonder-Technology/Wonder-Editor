import * as React from "react";
import ColorPicker, { ColorPickerType } from './component/ColorPicker'
import {getCurrentGameObjectColor, setCurrentGameObjectColor} from "../logic/view/MaterialView";
import {isDirty, markDirty, markNotDirty} from "../../../../../utils/dirtyUtils";
import {IDirtyState} from "../../../../../interface/IDirtyState";

interface IProps{
}

export default class Material extends React.Component<IProps,any>{
    constructor(props:IProps){
        super(props);
    }

    componentWillMount() {
        markNotDirty(this);
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IDirtyState) {
        if (isDirty(nextState)) {
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        markNotDirty(this);
    }

    render(){
        var style = {
            width: "100px",
            height: "30px"
        },
        color = "#ff0000";

        return (
            <article style={style}>
                <ColorPicker type={ColorPickerType.Sketch} color={color} onChange={ (color) => this.handleChange(color)} />
            </article>
        )
    }

    handleChange(color: string) {
        console.log(color)
        setCurrentGameObjectColor(color);

        markDirty(this);
    }
}
