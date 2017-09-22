import { EComponentType } from "../enum/EComponentType";
import { Component } from "wonder.js/dist/es2015/component/Component";
import { EComponentName } from "../enum/EComponentName";

export type AllComponentData = Array<{type:EComponentType, name:EComponentName, component:Component}>;