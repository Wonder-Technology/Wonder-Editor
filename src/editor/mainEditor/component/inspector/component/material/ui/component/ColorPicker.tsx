import * as React from "react";
import { SketchPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, HuePicker, MaterialPicker, SliderPicker, SwatchesPicker } from 'react-color';
import { string2rgb, reverseRGB, rgb2hex, hex2string } from '../../../../../../../../utils/colorUtil';
import {markDirty, markNotDirty, isDirty} from "../../../../../../utils/dirtyUtils";
import {IDirtyState} from "../../../../../../interface/IDirtyState";

interface IProps {
    color: string;   // 当前颜色
    showValue?: boolean; // 显示文字
    type?: ColorPickerType; // picker类型
    onChange: (color: string) => void;
}

export enum ColorPickerType {
    Sketch,
    Block,
    Chrome,
    Circle,
    Compact,
    Hue,
    Material,
    Slider,
    Swatches
}

export default class ColorPicker extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    private _isShowPicker:boolean = false;

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

    render() {
        var {color} = this.props,
            rgb = string2rgb(color),
            textColor = hex2string(rgb2hex(reverseRGB(rgb)));

        var btnStyle = {
            backgroundColor: color,
            color: textColor
        };

        return (
            <article className="color-component">
                <div className="color-button" style={btnStyle} onClick={this.handleClick.bind(this)}>
                    {this.props.showValue ? color : ""}
                </div>
                <div className="color-picker">
                    {this.renderPicker()}
                </div>
            </article>
        )
    }

    renderPicker(): React.ReactNode {
        if (!this._isShowPicker) {
            return null
        }

        let props = {
            color: this.props.color,
            onChange: (color) => this.handleChange(color.hex)
        };

        switch(this.props.type) {
            case ColorPickerType.Block:
                return <BlockPicker {...props} />
            case ColorPickerType.Chrome:
                return <ChromePicker {...props} />
            case ColorPickerType.Circle:
                return <CirclePicker {...props} />
            case ColorPickerType.Compact:
                return <CompactPicker {...props} />
            case ColorPickerType.Hue:
                return <HuePicker {...props} />
            case ColorPickerType.Material:
                return <MaterialPicker {...props} />
            case ColorPickerType.Slider:
                return <SliderPicker {...props} />
            case ColorPickerType.Swatches:
                return <SwatchesPicker {...props} />
            case ColorPickerType.Sketch:
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
