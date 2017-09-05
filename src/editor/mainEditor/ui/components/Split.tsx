import * as React from "react";
import { findDOMNode } from "react-dom";
import { fromEvent } from "wonder-frp/dist/es2015/global/Operator";

interface IProps {
    position: "left" | "right" | "top" | "bottom";
    size?: number;
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
                    x: e.clientX,
                    y: e.clientY
                }
            }).takeUntil(mouseUp$.do(() => {
                this.props.onDragFinish();
                console.log("finish!!!")
            }));
        }).subscribe(position => {
            onDrag(position.x);
        });
    }

    render() {
        this._setStyle();

        return (
            <div className="drag-split" style={this._style}></div>
        );
    }
}