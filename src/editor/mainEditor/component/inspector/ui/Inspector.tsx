import * as React from "react";
import Split from "../../split/ui/Split";
import { resizeCanvas } from "../../../utils/canvasUtils";
import Transform from "../component/transform/ui/Transform";
import Material from "../component/material/ui/Material";
import {AllComponentData} from "../../../type/componentType";
import {getReactComponentName} from "../../../../../utils/uiUtil";
import {hasCurrentGameObjectByUid} from "../../../logic/view/MainView";
import {changeWidthBySplit} from "../../split/logic/view/SplitView";

interface IProps {
    currentGameObjectId:number;

    getAllComponentData:Function;
}

export default class Inspector extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    private _style = {
        width: "15%"
    };

    onDragFinish() {
        resizeCanvas();
    }

    renderCurrentGameObjectComponents(){
        var {currentGameObjectId,getAllComponentData} = this.props,
            showComponents = [];

        if(hasCurrentGameObjectByUid(currentGameObjectId)){
            let resultData:AllComponentData = getAllComponentData(currentGameObjectId);

            resultData.forEach((item,i) => {
                switch (item.type){
                    case getReactComponentName(Transform):
                        showComponents.push(<Transform key={i}/>);
                        break;
                    case getReactComponentName(Material):
                        showComponents.push(<Material key={i}/>);
                        break;
                }
            });
        }

        return showComponents;
    }

    render() {
        var showComponents = this.renderCurrentGameObjectComponents();

        return (
            <article className="main-inspector" style={this._style}>
                {showComponents}

                <Split position="left" minPercent={15} maxPercent={25} onDrag={width => changeWidthBySplit(this,this._style,width)} onDragFinish={this.onDragFinish} />
            </article>
        )
    }
}
