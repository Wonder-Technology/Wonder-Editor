let getGameObjectAllShowInspectorComponent = MainEditorGameObjectBuss.getGameObjectAllShowInspectorComponent;

let _buildSpecificComponentTuple =
    ((type_, gameObject), (hasComponentFunc, getComponentFunc), stateTuple, componentList) =>
  stateTuple |> hasComponentFunc(gameObject) ?
    componentList @ [(type_, stateTuple |> getComponentFunc(gameObject))] : componentList;

let getCurrentGameObjectAllComponentList = (gameObject, stateTuple) =>
  []
  |> _buildSpecificComponentTuple(
       ("transform", gameObject),
       (
         MainEditorGameObjectBuss.hasTransformComponent,
         MainEditorGameObjectBuss.getTransformComponent
       ),
       stateTuple
     )
  |> _buildSpecificComponentTuple(
       ("material", gameObject),
       (
         MainEditorGameObjectBuss.hasMaterialComponent,
         MainEditorGameObjectBuss.getMaterialComponent
       ),
       stateTuple
     );
/* |> _buildSpecificComponentTuple(
     ("cameraController", gameObject),
     (
       MainEditorGameObjectBuss.hasCameraControllerComponent,
       MainEditorGameObjectBuss.getCameraControllerComponent
     ),
     stateTuple
   ); */