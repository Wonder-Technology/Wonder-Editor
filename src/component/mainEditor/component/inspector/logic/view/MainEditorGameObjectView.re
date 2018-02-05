let _operateSpecificComponent = (gameObject, componentName, stateTuple) =>
  switch componentName {
  | "cameraController" =>
    stateTuple |> MainEditorGameObjectBuss.hasCameraControllerComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getCameraControllerComponent(gameObject) : (-1)
  | "transform" =>
    stateTuple |> MainEditorGameObjectBuss.hasTransformComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getTransformComponent(gameObject) : (-1)
  | "material" =>
    stateTuple |> MainEditorGameObjectBuss.hasMaterialComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getMaterialComponent(gameObject) : (-1)
  | "boxGeometry" =>
    stateTuple |> MainEditorGameObjectBuss.hasBoxGeometryComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getBoxGeometryComponent(gameObject) : (-1)
  | "sourceInstance" =>
    stateTuple |> MainEditorGameObjectBuss.hasSourceInstanceComponent(gameObject) ?
      switch (stateTuple |> MainEditorGameObjectBuss.getSourceInstanceComponent(gameObject)) {
      | None => (-1)
      | Some(sourceInstance) => sourceInstance
      } :
      (-1)
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildErrorMessage(
        ~title="_getGameObjectSpecificComponent",
        ~description={j|specific component:$componentName is error|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|gameObject:$gameObject, component:$componentName|j}
      )
    )
  };

let _isSpecificComponentExist = (includeComponent, excludeComponent, gameObject, stateTuple) =>
  includeComponent
  |> Js.Array.filter((item) => stateTuple |> _operateSpecificComponent(gameObject, item) != (-1))
  |> Js.Array.length
  |> ((len) => len == (includeComponent |> Js.Array.length))
  && excludeComponent
  |> Js.Array.filter((item) => stateTuple |> _operateSpecificComponent(gameObject, item) != (-1))
  |> Js.Array.length
  |> ((len) => len == 0);

let buildCurrentGameObjectShowComponentList = (gameObject, stateTuple) =>
  GameObjectAllComponentParseSystem.getGameObjectAllComponentConfig()
  |> Js.Array.filter(
       (gameObjectType: GameObjectAllComponentParseType.gameObjectComponent) =>
         _isSpecificComponentExist(
           gameObjectType.include_component,
           gameObjectType.exclude_component,
           gameObject,
           stateTuple
         )
     )
  |> OperateArrayUtils.getFirst
  |> (
    (gameObjectType: GameObjectAllComponentParseType.gameObjectComponent) =>
      gameObjectType.all_component
      |> Js.Array.reduce(
           (
             (existComponentList, notExistComponentList),
             item: GameObjectAllComponentParseType.gameObjectInfo
           ) =>
             stateTuple
             |> _operateSpecificComponent(gameObject, item.type_)
             |> (
               (component) =>
                 component != (-1) ?
                   (existComponentList @ [(item.type_, component)], notExistComponentList) :
                   (existComponentList, notExistComponentList @ [item.type_])
             ),
           ([], [])
         )
  );