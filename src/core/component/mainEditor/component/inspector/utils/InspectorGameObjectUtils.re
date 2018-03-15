let _isAdded = (component) => component !== (-1);

let _getNotAddedComponent = () => (-1);

let _getComponent = (gameObject, hasComponent, getComponent, engineState) =>
  engineState |> hasComponent(gameObject) ?
    engineState |> getComponent(gameObject) : _getNotAddedComponent();

let _operateSpecificComponent = (gameObject, componentName, engineState) =>
  switch componentName {
  | "cameraController" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasCameraControllerComponent,
         GameObjectComponentEngineService.getCameraControllerComponent
       )
  | "transform" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasTransformComponent,
         GameObjectComponentEngineService.getTransformComponent
       )
  | "material" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasMaterialComponent,
         GameObjectComponentEngineService.getMaterialComponent
       )
  | "boxGeometry" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasGeometryComponent,
         GameObjectComponentEngineService.getGeometryComponent
       )
  | "sourceInstance" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasSourceInstanceComponent,
         GameObjectComponentEngineService.getSourceInstanceComponent
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

let _isSpecificComponentExist = (includeComponent, excludeComponent, gameObject, engineState) =>
  includeComponent
  |> Js.Array.filter((item) => engineState |> _operateSpecificComponent(gameObject, item) != (-1))
  |> Js.Array.length
  |> ((len) => len == (includeComponent |> Js.Array.length))
  && excludeComponent
  |> Js.Array.filter((item) => engineState |> _operateSpecificComponent(gameObject, item) != (-1))
  |> Js.Array.length
  |> ((len) => len == 0);

let buildCurrentGameObjectShowComponentList = (gameObject, allShowComponentConfig, engineState) =>
  allShowComponentConfig
  |> Js.Array.filter(
       (gameObjectType: GameObjectAllComponentParseType.gameObjectComponent) =>
         _isSpecificComponentExist(
           gameObjectType.include_component,
           gameObjectType.exclude_component,
           gameObject,
           engineState
         )
     )
  |> ArrayService.getFirst
  |> (
    (gameObjectType: GameObjectAllComponentParseType.gameObjectComponent) =>
      gameObjectType.all_component
      |> Js.Array.reduce(
           (
             (addedComponentList, addableComponentList),
             item: GameObjectAllComponentParseType.gameObjectInfo
           ) =>
             engineState
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