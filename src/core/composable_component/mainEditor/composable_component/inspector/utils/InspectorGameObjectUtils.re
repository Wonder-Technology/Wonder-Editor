let _isAdded = (component) => component !== (-1);

let _getNotAddedComponent = () => (-1);

let _getComponent = (gameObject, hasComponent, getComponent, engineState) =>
  engineState |> hasComponent(gameObject) ?
    engineState |> getComponent(gameObject) : _getNotAddedComponent();

let _operateSpecificComponent = (gameObject, componentName, engineState) =>
  switch componentName {
  | "basicCameraView" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasBasicCameraViewComponent,
         GameObjectComponentEngineService.getBasicCameraViewComponent
       )
  | "perspectiveCameraProjection" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent,
         GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent
       )
  | "transform" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasTransformComponent,
         GameObjectComponentEngineService.getTransformComponent
       )
  | "basicMaterial" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasBasicMaterialComponent,
         GameObjectComponentEngineService.getBasicMaterialComponent
       )
  | "boxGeometry" =>
    engineState
    |> _getComponent(
         gameObject,
         GameObjectComponentEngineService.hasBoxGeometryComponent,
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