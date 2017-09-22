import * as React from "react";
import Translation from "./component/Translation";
import { setCurrentGameObjectLocalTranslation } from "../logic/view/TransformView";
import {addName} from "../../../../../../../typescript/decorator";
import {EComponentType} from "../../../../../enum/EComponentType";

interface IProps {
}

@addName(EComponentType.TRANSFORM)
export default class Transform extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    render() {
        // var type = EComponentType.TRANSFORM,
        //     name = EComponentName.THREEDTRANSFORM;
        // //todo replace <Translation> with items
        // var items = buildItems(type, name, componentData_config);

        return (
            <article className="transform-component">
                <Translation translate={setCurrentGameObjectLocalTranslation}></Translation>
                {/*<Rotation rotate={setTriangleEulerAngle}></Rotation>*/}

            </article>
        )
    }
}
