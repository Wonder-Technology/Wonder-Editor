import * as React from "react";
import {addName} from "../../../../../../../typescript/decorator";
import {EComponentType} from "../../../../../enum/EComponentType";
import {EComponentClassName} from "../../../../../enum/EComponentClassName";
import {componentData_config} from "../../../../config/ComponentData_config";
import {buildComponent} from "../../../../config/ComponentDataConfigParseSystem";
import {getLocalPosition, setLocalPosition, translateLocal} from "../logic/view/TransformView";

interface IProps {
    component:any;
}

@addName(EComponentType.TRANSFORM)
export default class Transform extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    render() {
        var {component} = this.props,
            type = EComponentType.TRANSFORM,
            name = EComponentClassName.THREED_TRANSFORM;

        var props = {
            component,
            setLocalPosition,
            getLocalPosition
        };

        return (
            <article className="transform-component">
                {buildComponent(type, name, componentData_config,props)}
                {/*<Position translate={translateLocal} component={this.props.component}></Position>*/}
                {/*<Rotation rotate={setTriangleEulerAngle}></Rotation>*/}

            </article>
        )
    }
}