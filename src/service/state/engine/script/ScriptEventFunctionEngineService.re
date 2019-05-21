open Wonderjs;

open StateDataMainType;

let createScriptEventFunctionData = ScriptEventFunctionAPI.createScriptEventFunctionData;

let createEmptyScriptEventFunctionData = () =>
  ScriptEventFunctionAPI.createScriptEventFunctionData({
    "init": Js.Nullable.undefined,
    "update": Js.Nullable.undefined,
    "dispose": Js.Nullable.undefined,
  });

let enableScriptEventFunction = ScriptEventFunctionAPI.enableScriptEventFunction;

let disableScriptEventFunction = ScriptEventFunctionAPI.disableScriptEventFunction;

let isScriptEventFunctionEnable = ScriptEventFunctionAPI.isScriptEventFunctionEnable;