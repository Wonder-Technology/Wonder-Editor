import * as React from "react";
import { findDOMNode } from "react-dom";
import { fromEvent } from "wonder-frp/dist/es2015/global/Operator";
import { root } from "../../../definition/Variable";
import { error } from "../../../../utils/logUtils";

interface IProps {
    position: "left" | "right" | "top" | "bottom";
    size?: number;
    minPercent: number;
    maxPercent: number;
    onDrag: Function;
    onDragFinish: Function;
}

type Style = {
    left: string;
    right: string;
    top: string;
    bottom: string;
    width: string;
    height: string;
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

        switch (position) {
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

        mouseDown$.flatMap((mouseDownEvent: MouseEvent) => {
            return mouseMove$.map((mouseMoveEvent: MouseEvent) => {
                mouseMoveEvent.preventDefault();

                return {
                    x: mouseMoveEvent.clientX,
                    y: mouseMoveEvent.clientY
                }
            }).takeUntil(mouseUp$.do(() => {
                this.props.onDragFinish();
            }));
        }).subscribe(result => {
            var { position, minPercent, maxPercent } = this.props,
                { innerWidth, innerHeight } = root;

            switch (position) {
                case "left":
                    let leftDistance = (innerWidth - result.x) / innerWidth * 100;

                    leftDistance = this._ensureTargetWithinRange(leftDistance, minPercent, maxPercent);

                    onDrag(leftDistance);
                    break;
                case "right":
                    let rightDistance = result.x / innerWidth * 100;

                    rightDistance = this._ensureTargetWithinRange(rightDistance, minPercent, maxPercent);

                    onDrag(rightDistance);
                    break;
                case "top":
                    let topDistance = (innerHeight - result.y) / innerHeight * 100;

                    topDistance = this._ensureTargetWithinRange(topDistance, minPercent, maxPercent);

                    onDrag(topDistance);
                    break;
                default:
                    error(true, `unknown position:${position}`);
                    break;
            }
        });
    }

    private _ensureTargetWithinRange(target: number, min: number, max: number): number {
        if (target >= max) {
            return max;
        }
        else if (target <= min) {
            return min;
        }

        return Number(target.toFixed(2));
    }

    render() {
        this._setStyle();

        return (
            <article className="drag-split" style={this._style}>
            </article>
        );
    }
}