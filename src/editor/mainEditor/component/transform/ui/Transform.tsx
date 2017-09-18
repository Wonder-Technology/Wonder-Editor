import * as React from "react";
import Translation from "./component/Translation";
import { setCurrentGameObjectLocalTranslation } from "../logic/view/TransformView";
import Split from "../../../ui/component/Split";
import { markDirty } from "../../../utils/dirtyUtils";
import { resizeCanvas } from "../../../utils/canvasUtils";

interface IProps {
}

export default class Transform extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    private _style = {
        width: "15%"
    };

    changeWidth(width: number) {
        this._style.width = width.toFixed(2) + "%";

        markDirty(this);
    }

    onDragFinish() {
        resizeCanvas();
    }

    render() {
        return (
            <article className="transform-component" style={this._style}>
                <Translation translate={setCurrentGameObjectLocalTranslation}></Translation>
                {/*<Rotation rotate={setTriangleEulerAngle}></Rotation>*/}

                <Split position="left" minPercent={15} maxPercent={25} onDrag={width => this.changeWidth(width)} onDragFinish={this.onDragFinish} />
            </article>
        )
    }
}
