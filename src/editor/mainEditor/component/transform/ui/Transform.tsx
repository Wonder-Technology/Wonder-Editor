import * as React from "react";
import Translation from "./component/Translation";
import { setCurrentGameObjectLocalTranslation } from "../logic/view/TransformView";

interface IProps {
}

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
