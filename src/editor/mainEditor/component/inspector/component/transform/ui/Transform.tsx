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
        return (
            <article className="transform-component">
                <Translation translate={setCurrentGameObjectLocalTranslation}></Translation>
                {/*<Rotation rotate={setTriangleEulerAngle}></Rotation>*/}

            </article>
        )
    }
}
