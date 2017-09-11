import * as React from "react";
import { findDOMNode } from "react-dom";
import { fromEvent } from "wonder-frp/dist/es2015/global/Operator";
import {root} from "../../../definition/Variable";
import {error} from "../../../../utils/logUtils";

interface IProps {
    position: "left" | "right" | "top" | "bottom";
    size?: number;
    min:number;
    max:number;
    onDrag: Function;
    onDragFinish: Function;
}

type Style = {
    left :string;
    right :string;
    top :string;
    bottom:string;
    width:string;
    height:string;
}

export default class Split extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    private _style: Style = {} as Style;

    componentDidMount() {
        this._bindDragEvent();
    }

    private _setStyle() {
        var { position } = this.props,
            size = this.props.size || 5;

        this._style[position] = "0px";

        switch(position){
            case "left":
            case "right":
                this._style.width = size + "px";
                this._style.height = "100%";
                break;
            case "top":
            case "bottom":
                this._style.width = "100%";
                this._style.height = size + "px";
                break;
            default:
                error(true, `unknown position:${position}`);
                break;
        }
    }

    private _bindDragEvent() {
        var thisDom = findDOMNode(this),
            { onDrag } = this.props,
            mouseDown$ = fromEvent(thisDom, "mousedown"),
            mouseUp$ = fromEvent(document, "mouseup"),
            mouseMove$ = fromEvent(document, "mousemove");

        mouseDown$.flatMap((mouseDownEvent:MouseEvent) => {
            return mouseMove$.map((mouseMoveEvent:MouseEvent) => {
                mouseMoveEvent.preventDefault();

                return {
                    x: mouseDownEvent.clientX,
                    y: mouseDownEvent.clientY,
                    xDistance:mouseMoveEvent.clientX - mouseDownEvent.clientX,
                    yDistance:mouseMoveEvent.clientY - mouseDownEvent.clientY,
                }
            }).takeUntil(mouseUp$.do(() => {
                this.props.onDragFinish();
                console.log("finish!!!")
            }));
        }).subscribe(point => {
            var {position,min,max} = this.props,
                {innerWidth,innerHeight} = root;

            switch(position){
                case "left":
                case "right":
                    let percentX = (point.x + point.xDistance)/innerWidth*100;

                    if(percentX >= max){
                        percentX = max;
                    }
                    if(percentX <= min){
                        percentX = min;
                    }

                    onDrag(percentX);
                    break;
                case "top":
                case "bottom":
                    let percentY = (point.y + point.yDistance)/innerHeight*100;

                    if(percentY >= max){
                        percentY = max;
                    }
                    if(percentY <= min){
                        percentY = min;
                    }

                    onDrag(percentY);
                    break;
                default:
                    error(true, `unknown position:${position}`);
                    break;
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