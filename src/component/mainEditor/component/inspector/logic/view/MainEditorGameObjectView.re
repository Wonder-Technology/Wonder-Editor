let _isAdded = (component) => component !== (-1);

let _getNotAddedComponent = () => (-1);

let _operateSpecificComponent = (gameObject, componentName, stateTuple) =>
  switch componentName {
  | "cameraController" =>
    stateTuple |> MainEditorGameObjectBuss.hasCameraControllerComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getCameraControllerComponent(gameObject) :
      _getNotAddedComponent()
  | "transform" =>
    stateTuple |> MainEditorGameObjectBuss.hasTransformComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getTransformComponent(gameObject) :
      _getNotAddedComponent()
  | "material" =>
    stateTuple |> MainEditorGameObjectBuss.hasMaterialComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getMaterialComponent(gameObject) :
      _getNotAddedComponent()
  | "boxGeometry" =>
    stateTuple |> MainEditorGameObjectBuss.hasBoxGeometryComponent(gameObject) ?
      stateTuple |> MainEditorGameObjectBuss.getBoxGeometryComponent(gameObject) :
      _getNotAddedComponent()
  | "sourceInstance" =>
    stateTuple |> MainEditorGameObjectBuss.hasSourceInstanceComponent(gameObject) ?
      stateTuple
      |> MainEditorGameObjectBuss.getSourceInstanceComponent(gameObject)
      |> Js.Option.getExn :
      _getNotAddedComponent()
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

let buildCurrentGameObjectShowComponentList = (gameObject, allShowComponentConfig, stateTuple) =>
  allShowComponentConfig
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
             (addedComponentList, addableComponentList),
             item: GameObjectAllComponentParseType.gameObjectInfo
           ) =>
             stateTuple
             |> _operateSpecificComponent(gameObject, item.type_)
             |> (
               (component) =>
                 component |> _isAdded ?
                   (addedComponentList @ [(item.type_, component)], addableComponentList) :
                   (addedComponentList, addableComponentList @ [item.type_])
             ),
           ([], [])
         )
  );