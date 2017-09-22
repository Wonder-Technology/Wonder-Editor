// import { IComponentDataConfig, IComponentFieldConfig } from "./componentData_config";
// import { EComponentName } from "../../enum/EComponentName";
// import { EComponentType } from "../../enum/EComponentType";
//
// export const buildItems = (type:EComponentType, name:EComponentName, componentData_config:IComponentDataConfig) => {
//     var fieldConfigArr = componentData_config[type][name],
//         resultItemArr = [];
//
//     forEach(fieldConfigArr, (fieldConfig) => {
//         var {
//             name,
//
//         } = fieldConfig;
//
//         switch (name){
//             case "position":
//                 //todo rename Translation to Position
//
//                 //inject fieldConfig to Translation
//                 resultItemArr.push("<Translation translate={setCurrentGameObjectLocalTranslation} fieldConfig={fieldConfig}></Translation>");
//             break;
//             ...
//         }
//     })
//
//     return resultItemArr;
// }
//
// export const buildField = (fieldConfig:IComponentFieldConfig) => {
//     var fieldArr = [];
//
//     switch (fieldConfig.type){
//         case EComponentFieldType.INPUT:
//             let {
//                 length,
//                 description,
//                 defaultValue
//             } = fieldConfig;
//
//
//             for(let i = 0; i < length; i++){
//                 fieldArr.push(<Input description={description[i]} defaultValue={defaultValue[i]}>);
//             }
//
//             break;
//
//         case EComponentFieldType.COLOR_PICKER:
//             let {
//                 length,
//                 description,
//                 // defaultValue
//             } = fieldConfig;
//
//             if(defaultValue === FROM_CURRENT_GAMEOBJECT_COLOR){
//
//             }
//             else{
//
//             }
//
//             break;
//
//         ...
//     }
//
//     return fieldArr;
// }