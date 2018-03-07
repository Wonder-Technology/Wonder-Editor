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
         GameObjectFacade.hasCameraControllerComponent,
         GameObjectFacade.getCameraControllerComponent
       )
  | "transform" =>
    stateTuple
    |> _getComponent(
         gameObject,
         GameObjectFacade.hasTransformComponent,
         GameObjectFacade.getTransformComponent
       )
  | "material" =>
    stateTuple
    |> _getComponent(
         gameObject,
         GameObjectFacade.hasMaterialComponent,
         GameObjectFacade.getMaterialComponent
       )
  | "boxGeometry" =>
    stateTuple
    |> _getComponent(
         gameObject,
         GameObjectFacade.hasGeometryComponent,
         GameObjectFacade.getGeometryComponent
       )
  | "sourceInstance" =>
    stateTuple
    |> _getComponent(
         gameObject,
         GameObjectFacade.hasSourceInstanceComponent,
         GameObjectFacade.getSourceInstanceComponent
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