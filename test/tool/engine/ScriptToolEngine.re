let getScriptAttributeEntries = (script, attributeName, engineState) =>
  ScriptEngineService.unsafeGetScriptAttribute(
    script,
    attributeName,
    engineState,
  )
  |> ScriptAttributeEngineService.getScriptAttributeEntries;

let getScriptAttributeFieldNames = (script, attributeName, engineState) =>
  getScriptAttributeEntries(script, attributeName, engineState)
  |> Js.Array.map(((name, _)) => name);

let unsafeGetScriptEventFunctionData =
    (script, eventFunctionName, engineState) =>
  Wonderjs.OperateScriptDataMainService.unsafeGetScriptAllEventFunctionData(
    script,
    engineState,
  )
  |> WonderCommonlib.ImmutableHashMapService.unsafeGet(eventFunctionName);

let getScriptFirstEventFunctionNameAndData = (script, engineState) =>
  ScriptEngineService.getScriptAllEventFunctionEntries(script, engineState)
  |> ArrayService.unsafeGetFirst;

let buildEventFunctionJsObj =
    (~initFunc=None, ~updateFunc=None, ~disposeFunc=None, ()) => {
  "init": initFunc |> Js.Nullable.fromOption,
  "update": updateFunc |> Js.Nullable.fromOption,
  "dispose": disposeFunc |> Js.Nullable.fromOption,
};

let buildScriptEventFunctionData = (~initFunc, ~updateFunc, ~disposeFunc) =>
  ScriptEventFunctionEngineService.createScriptEventFunctionData(
    buildEventFunctionJsObj(~initFunc, ~updateFunc, ~disposeFunc, ()),
  );

let buildSetLocalPositionEventFunc = () =>
  (. script, api, engineState) => {
    let api = Obj.magic(api);
    let unsafeGetScriptGameObject = api##unsafeGetScriptGameObject;
    let unsafeGetGameObjectTransformComponent =
      api##unsafeGetGameObjectTransformComponent;
    let getTransformLocalPosition = api##getTransformLocalPosition;
    let setTransformLocalPosition = api##setTransformLocalPosition;

    let transform =
      unsafeGetGameObjectTransformComponent(.
        unsafeGetScriptGameObject(. script, engineState),
        engineState,
      );

    let (x, y, z) = getTransformLocalPosition(. transform, engineState);

    let engineState =
      setTransformLocalPosition(. transform, (x +. 10., y, z), engineState);

    engineState;
  };

let createIntFieldValue = value =>
  value |> Wonderjs.ScriptAttributeType.intToScriptAttributeValue;

let getAttributeFieldADefaultValue = () => 1;

let buildScriptAttribute = scriptAttributeName => {
  let scriptAttribute = ScriptAttributeEngineService.createScriptAttribute();

  let scriptAttribute =
    ScriptAttributeEngineService.addScriptAttributeFieldJsObj(
      "a",
      {
        "type": "int",
        "defaultValue":
          getAttributeFieldADefaultValue() |> createIntFieldValue,
      },
      scriptAttribute,
    );

  scriptAttribute;
};