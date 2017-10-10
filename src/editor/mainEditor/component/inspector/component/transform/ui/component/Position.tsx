import * as React from "react";
import {Component} from "wonder.js/dist/es2015/component/Component";
import {buildPositionFields} from "../../../../../config/ComponentDataConfigParseSystem";

interface IProps {
    getLocalPosition:Function;
    setLocalPosition:Function;
    component:Component;
    fieldConfig:any;
}

export default class Position extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    changeX(props:IProps, value: number) {
        var position = props.getLocalPosition(props.component);

        props.setLocalPosition(props.component,value, position.y, position.z);
    }

    changeY(props:IProps, value: number) {
        var position = props.getLocalPosition(props.component);

        props.setLocalPosition(props.component, position.x, value, position.z);
    }

    changeZ(props:IProps, value: number) {
        var position = props.getLocalPosition(props.component);

        props.setLocalPosition(props.component,position.x, position.y, value);
    }

    render() {
        var actions = {
            changeX:this.changeX,
            changeY:this.changeY,
            changeZ:this.changeZ
        };

        var position = this.props.getLocalPosition(this.props.component);
        var props = Object.assign({},this.props,{
            localPositionX:position.x,
            localPositionY:position.y,
            localPositionZ:position.z
        });

        return (
            <article className="translation">
                {buildPositionFields(props, actions)}
            </article>
        )
    }
}
