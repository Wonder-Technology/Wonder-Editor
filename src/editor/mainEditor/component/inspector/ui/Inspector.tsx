import * as React from "react";
import Split from "../../../ui/component/Split";
import { markDirty } from "../../../utils/dirtyUtils";
import { resizeCanvas } from "../../../utils/canvasUtils";
import Transform from "../../transform/ui/Transform";
import BasicMaterial from "../../../material/ui/BasicMaterial";

interface IProps {
}

export default class Inspector extends React.Component<IProps, any>{
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
        /*        var names = ["A","B"];
                names.forEach(item => {
                    switch (item){
                        case getComponentName(A):this._fcks.push(<A></A>);break;
                        case getComponentName(B):this._fcks.push(<B name="wejhfjkwef"></B>);break;
                    }
                });*/
        return (
            <article className="main-inspector" style={this._style}>
                <Transform />
                <BasicMaterial />

                <Split position="left" minPercent={15} maxPercent={25} onDrag={width => this.changeWidth(width)} onDragFinish={this.onDragFinish} />
            </article>
        )
    }
}
