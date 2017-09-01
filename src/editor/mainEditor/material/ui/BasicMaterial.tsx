import * as React from "react";
import ColorPicker, { ColorPickerType } from '../../../components/ColorPicker'
import { setColor, getColor } from "../logic/view/BasicMaterialView";

interface IProps{
}

interface IState {
    color: string
}

export default class BasicMaterial extends React.Component<IProps,IState>{
    constructor(props:IProps){
        super(props);
        this.state = { color: getColor() }
    }

    render(){
        return (
            <div style={{
                width: "100px",
                height: "30px"
            }}>
                <ColorPicker type={ColorPickerType.Sketch} color={this.state.color} onChange={ (color) => this.handleChange(color)} />
            </div>
        )
    }
    
    handleChange(color: string) {
        this.setState({ color })
        setColor(color)
    } 
}
