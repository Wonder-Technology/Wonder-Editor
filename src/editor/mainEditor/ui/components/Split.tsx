import * as React from "react";
import { findDOMNode } from "react-dom";
import { fromEvent } from "wonder-frp/dist/es2015/global/Operator";

interface IProps {
    position: "left" | "right" | "top" | "bottom";
    size?: number;
    min:number;
    max:number;
    onDrag: Function;
    onDragFinish: Function;
}

export default class Split extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this._bindDragEvent();
    }

    private _style: any = {};
    private _setStyle() {
        var { position } = this.props,
            size = this.props.size || 5;

        this._style[position] = "0px";

        if (position === "left" || position === "right") {
            this._style.width = size + "px";
            this._style.height = "100%";
        }
        else {
            this._style.width = "100%";
            this._style.height = size + "px";
        }
    }

    private _bindDragEvent() {
        var thisDom = findDOMNode(this);
        var { onDrag } = this.props;

        var mouseDown$ = fromEvent(thisDom, "mousedown");
        var mouseUp$ = fromEvent(document, "mouseup");
        var mouseMove$ = fromEvent(document, "mousemove");

        mouseDown$.flatMap((state) => {
            return mouseMove$.map(e => {
                e.preventDefault();

                return {
                    x: state.clientX,
                    y: state.clientY,
                    xDistance:e.clientX - state.clientX,
                    yDistance:e.clientY - state.clientY,
                }
            }).takeUntil(mouseUp$.do(() => {
                this.props.onDragFinish();
                console.log("finish!!!")
            }));
        }).subscribe(point => {
            var {position,min,max} = this.props;
            var {innerWidth,innerHeight} = window;
            console.log(point)

            if (position === "left" || position === "right") {
                var percentX = (point.x + point.xDistance)/innerWidth*100;

                if(percentX >= max){
                    percentX = max;
                }
                if(percentX <= min){
                    percentX = min;
                }

                onDrag(percentX);
            }
            else if (position === "top" || position === "bottom") {
                var percentY = (point.y + point.yDistance)/innerHeight*100;

                if(percentY >= max){
                    percentY = max;
                }
                if(percentY <= min){
                    percentY = min;
                }

                onDrag(percentY);
            }
        });
    }

    render() {
        this._setStyle();

        return (
            <div className="drag-split" style={this._style}></div>
        );
    }
}