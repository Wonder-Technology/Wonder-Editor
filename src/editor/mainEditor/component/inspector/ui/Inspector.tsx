import * as React from "react";
import Split from "../../split/ui/Split";
import Transform from "../component/transform/ui/Transform";
import Material from "../component/material/ui/Material";
import {AllComponentData} from "../../../type/componentType";
import {getReactComponentName} from "../../../../../utils/uiUtil";
import {getGameObjectColor, setGameObjectColor} from "../component/material/logic/view/MaterialView";
import {hasCurrentGameObjectByUId} from "../../../logic/view/SceneView";

interface IProps {
    currentGameObjectId:number;

    getAllComponentData:Function;
    resizeCanvas:Function;
    changeWidthBySplit:Function;
}

export default class Inspector extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    private _style = {
        width: "20%"
    };

    onDragFinish() {
        this.props.resizeCanvas();
    }

    render() {
        var showComponents = this._renderCurrentGameObjectComponents();

        return (
            <article className="main-inspector" style={this._style}>
                {showComponents}

                <Split position="left" minPercent={20} maxPercent={25} onDrag={width => this.props.changeWidthBySplit(this,this._style,width)} onDragFinish={()=>this.onDragFinish()} />
            </article>
        )
    }

    private _renderCurrentGameObjectComponents(){
        var {currentGameObjectId,getAllComponentData} = this.props,
            showComponents = [];

        if(hasCurrentGameObjectByUId(currentGameObjectId)){
            let resultData:AllComponentData = getAllComponentData(currentGameObjectId);

            resultData.forEach(({type, component},i) => {
                switch (type){
                    case getReactComponentName(Transform):
                        showComponents.push(<Transform key={`${currentGameObjectId}${i}`} component={component}/>);
                        break;
                    case getReactComponentName(Material):
                        showComponents.push(<Material key={`${currentGameObjectId}${i}`} setGameObjectColor={setGameObjectColor} getGameObjectColor={getGameObjectColor} component={component}/>);
                        break;
                }
            });
        }

        return showComponents;
    }
}
