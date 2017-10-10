import * as React from "react";
import { SketchPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, HuePicker, MaterialPicker, SliderPicker, SwatchesPicker } from 'react-color';
import {markDirty} from "../../../../../utils/ui/dirtyUtils";
import {EColorPickerType} from "../../../enum/EColorPickerType";

interface IProps {
    color: string;
    type?: EColorPickerType;
    onChange: (color: string) => void;
}

export default class ColorPicker extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    private _isShowPicker:boolean = false;

    render() {
        var {color} = this.props;

        var btnStyle = {
            backgroundColor: color
        };

        return (
            <article className="color-component">
                <div className="color-button" style={btnStyle} onClick={()=>this.handleClick()}></div>
                <div className="color-picker">
                    {this.renderPicker()}
                </div>
            </article>
        )
    }

    renderPicker(){
        if (!this._isShowPicker) {
            return null
        }

        let props = {
            color: this.props.color,
            onChange: (color) => this.handleChange(color.hex)
        };

        switch(this.props.type) {
            case EColorPickerType.BLOCK:
                return <BlockPicker {...props} />
            case EColorPickerType.CHROME:
                return <ChromePicker {...props} />
            case EColorPickerType.CIRCLE:
                return <CirclePicker {...props} />
            case EColorPickerType.COMPACT:
                return <CompactPicker {...props} />
            case EColorPickerType.HUE:
                return <HuePicker {...props} />
            case EColorPickerType.MATERIAL:
                return <MaterialPicker {...props} />
            case EColorPickerType.SLIDER:
                return <SliderPicker {...props} />
            case EColorPickerType.SWATCHES:
                return <SwatchesPicker {...props} />
            case EColorPickerType.SKETCH:
            default:
                return <SketchPicker {...props} />
        }
    }

    handleClick() {
        this._isShowPicker = !this._isShowPicker;

        markDirty(this);
    }

    handleChange(color: string) {
        this.props.onChange(color)

        markDirty(this);
    }
}
