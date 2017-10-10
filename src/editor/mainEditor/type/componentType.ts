import { EComponentType } from "../enum/EComponentType";
import { Component } from "wonder.js/dist/es2015/component/Component";
import { EComponentClassName } from "../enum/EComponentClassName";

export type AllComponentData = Array<{type:EComponentType, className:EComponentClassName, component:Component}>;