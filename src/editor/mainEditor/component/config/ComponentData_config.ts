import { EComponentFieldType } from "../../enum/EComponentFieldType";

const _getSpanFieldConfig = (text:string) =>({
    text,
    type: EComponentFieldType.SPAN,
});

const _getInputNumberFieldConfig = (key:string, dynamicDefaultValue?:string, onChange?:string, defaultValue:number = 0) =>({
    key,
    defaultValue,
    dynamicDefaultValue,
    onChange: onChange !== null && onChange !== void 0 ? onChange : `change${key}`,
    type: EComponentFieldType.INPUT_NUMBER,
});

export const componentData_config = {
    Transform: {
        ThreeDTransform: [
            {
                name: "position",
                fields: [
                    [_getSpanFieldConfig("Position")],
                    [
                        _getInputNumberFieldConfig("X", "localPositionX"),
                        _getInputNumberFieldConfig("Y", "localPositionY"),
                        _getInputNumberFieldConfig("Z", "localPositionZ")
                    ]
                ]
            }
        ]
    },
    Material: {
        BasicMaterial: [
            {
                name: "color",
                type: EComponentFieldType.COLOR_PICKER
                // defaultValue: FROM_CURRENT_GAMEOBJECT_COLOR
            }
        ],
        LightMaterial: []
    },
    Camera: {
        CameraController: []
    }
}

export interface IComponentDataConfig{

}

export interface IComponentFieldConfig{

}



const FROM_CURRENT_GAMEOBJECT_COLOR:number = 1;
