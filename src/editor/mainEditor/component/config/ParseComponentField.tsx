import * as React from "react";
import {EComponentFieldType} from "../../enum/EComponentFieldType";
import InputNumber from "antd/lib/input-number";

export const parseFields = (fieldArr,props,actions):any => {
    var result = [];

    fieldArr.forEach((field)=>{
        result.push(_parseFieldContainer(field,props,actions))
    });

    return result;
};

const _parseFieldContainer = (field,props,actions):any => {
    var change = actions[field.onChange],
        dynamicDefaultValue = props[field.dynamicDefaultValue];

    switch (field.type){
        case EComponentFieldType.SPAN:
            return <div className="flex-children" key={`${field.type}${field.text}`}>
                <span>{field.text}</span>
            </div>;

        case EComponentFieldType.INPUT_NUMBER:
            return <div className="flex-children" key={`${field.type}${field.key}`}>
                <span>{field.key}</span>
               <InputNumber step={0.1} defaultValue={_getDefaultValue(field.defaultValue, dynamicDefaultValue)} onChange={(e)=>change(props, e)} />
            </div>
    }
};

const _getDefaultValue = (defaultValue:any, dynamicDefaultValue:any) => {
    return dynamicDefaultValue !== null && dynamicDefaultValue !== void 0 ? dynamicDefaultValue : defaultValue;
}
