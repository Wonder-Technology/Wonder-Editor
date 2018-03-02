let _isAdded = (component) => component !== (-1);

let _getNotAddedComponent = () => (-1);

let _getComponent = (gameObject, hasComponent, getComponent, stateTuple) =>
  stateTuple |> hasComponent(gameObject) ?
    stateTuple |> getComponent(gameObject) : _getNotAddedComponent();

let _operateSpecificComponent = (gameObject, componentName, stateTuple) =>
  switch componentName {
  | "cameraController" =>
    stateTuple
    |> _getComponent(
         gameObject,
         MainEditorGameObjectBuss.hasCameraControllerComponent,
         MainEditorGameObjectBuss.getCameraControllerComponent
       )
  | "transform" =>
    stateTuple
    |> _getComponent(
         gameObject,
         MainEditorGameObjectBuss.hasTransformComponent,
         MainEditorGameObjectBuss.getTransformComponent
       )
  | "material" =>
    stateTuple
    |> _getComponent(
         gameObject,
         MainEditorGameObjectBuss.hasMaterialComponent,
         MainEditorGameObjectBuss.getMaterialComponent
       )
  | "boxGeometry" =>
    stateTuple
    |> _getComponent(
         gameObject,
         MainEditorGameObjectBuss.hasBoxGeometryComponent,
         MainEditorGameObjectBuss.getBoxGeometryComponent
       )
  | "sourceInstance" =>
    stateTuple
    |> _getComponent(
         gameObject,
         MainEditorGameObjectBuss.hasSourceInstanceComponent,
         MainEditorGameObjectBuss.getSourceInstanceComponent
       )
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