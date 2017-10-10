import * as React from "react";
import Position from "../inspector/component/transform/ui/component/Position";
import { IComponentDataConfig } from "./ComponentData_config";
import { EComponentClassName } from "../../enum/EComponentClassName";
import { EComponentType } from "../../enum/EComponentType";
import {parseFields} from "./ParseComponentField";

export const buildComponent = (type:EComponentType, name:EComponentClassName, componentData_config:IComponentDataConfig, props:any) => {
    var fieldConfigArr = componentData_config[type][name],
        resultItemArr = [];

    fieldConfigArr.forEach((fieldConfig) => {
        let {
            name
        } = fieldConfig;

        switch (name){
            case "position":
                let positionProps = {
                    ...props,
                    fieldConfig,
                    key:`${name}`
                };

                resultItemArr.push(<Position {...positionProps}></Position>);
            break;
        }
    });

    return resultItemArr;
};

export const buildPositionFields = (props,actions) => {
    var fieldArr = [];

    var { fieldConfig } = props,
        {name,fields} = fieldConfig;

    fields.forEach((field,i)=>{
        fieldArr.push(<div className="flex-component" key={`${name}${i}`}>{parseFields(field,props,actions)}</div>);
    });

    return fieldArr;
};
