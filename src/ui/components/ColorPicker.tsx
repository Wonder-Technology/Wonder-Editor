import * as React from "react";
import { connect } from "react-redux";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { string2rgb, reverseRGB, rgb2hex, hex2string } from '../../utils/colorUtil';

/**
 * ColorPicker用法：
 *  使用时给定一个容器，比如div，设定这个容易的大小，ColorPicker将填充整个容器，
 *  注意该容器的overflow应该是visible的，不然将会看不到picker弹出来
 */

interface IProps {
    color: string
    onChange: (color: string) => void
}

interface IState {
    displayPicker: boolean
    color: string
}

class ColorPicker extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {
            displayPicker: false,
            color: props.color
        }
    }

    render() {

        // 取反色用于显示文件
        const textColor = hex2string(rgb2hex(reverseRGB(string2rgb(this.state.color))))

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
            <div style={styles.container}>
                <div style={styles.button} onClick={this.handleClick.bind(this)}>{this.state.color}</div>
                <div style={styles.picker}>
                    {this.state.displayPicker ? <SketchPicker color={this.state.color} onChange={(color) => this.handleChange(color)} /> : ""}
                </div>
            </div>
        )
    }

    handleClick() {
        this.setState({
            displayPicker: !this.state.displayPicker
        })
    }

    handleChange(color) {
        this.setState({
            color: color.hex
        })
        this.props.onChange(this.state.color)
    }

}

const mapStateToProps = (state: any) => {
    return {
    }
};

export default connect<any, any, IProps>(mapStateToProps)(ColorPicker);
