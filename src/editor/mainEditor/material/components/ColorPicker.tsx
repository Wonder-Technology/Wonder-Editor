import * as React from "react";
import { SketchPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, HuePicker, MaterialPicker, SliderPicker, SwatchesPicker } from 'react-color';
import reactCSS from 'reactcss';
import { string2rgb, reverseRGB, rgb2hex, hex2string } from '../../../../utils/colorUtil';

/**
 * ColorPicker用法：
 *  使用时给定一个容器，比如div，设定这个容易的大小，ColorPicker将填充整个容器，
 *  注意该容器的overflow应该是visible的，不然将会看不到picker弹出来
 * 
 *  RoadMap:
 *    结合全局状态，提供动态presets
 */

interface IProps {
    color: string   // 当前颜色
    showValue?: boolean // 显示文字
    type?: ColorPickerType // picker类型
    onChange: (color: string) => void
}

interface IState {
    displayPicker: boolean
    color: string
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

class ColorPicker extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            displayPicker: false,
            color: props.color
        }
    }

    render() {

        // 在非灰色区间取反色用于显示文字
        const rgb = string2rgb(this.state.color)
        const textColor = hex2string(rgb2hex(reverseRGB(rgb)))

        // 暂时使用这个，后面可以统一搬到外部
        const styles = reactCSS({
            "default": {
                container: {
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    overflow: "visible",
                    position: "relative"
                },
                button: {
                    width: "100%",
                    height: "100%",
                    backgroundColor: this.state.color,
                    textAlign: "center",
                    color: textColor,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    fontSize: "12px"
                },
                picker: {
                    marginTop: "5px"
                }
            }
        })

        return (
            <div className="container" style={styles.container}>
                <div className="button" style={styles.button} onClick={this.handleClick.bind(this)}>
                    {this.props.showValue ? this.state.color : ""}
                </div>
                <div className="picker" style={styles.picker}>
                    {this.renderPicker()}
                </div>
            </div>
        )
    }

    renderPicker(): React.ReactNode {
        if (!this.state.displayPicker) {
            return null
        }
        const props = {
            color: this.state.color,
            onChange: (color) => this.handleChange(color.hex)
        }
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
        this.setState({
            displayPicker: !this.state.displayPicker
        })
    }

    handleChange(color: string) {
        this.setState({ color })
        this.props.onChange(color)
    }

}

export default ColorPicker;
