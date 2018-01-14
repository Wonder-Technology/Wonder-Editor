let getGameObjectAllShowInspectorComponent = MainEditorGameObjectBuss.getGameObjectAllShowInspectorComponent;

let _buildSpecificComponentTuple =
    (name, gameObject, hasComponentFunc, getComponentFunc, stateTuple, componentList) =>
  stateTuple |> hasComponentFunc(gameObject) ?
    componentList @ [(name, stateTuple |> getComponentFunc(gameObject))] : componentList;

let getCurrentGameObjectAllComponentsList = (gameObject, stateTuple) =>
  []
  |> _buildSpecificComponentTuple(
       "transform",
       gameObject,
       MainEditorGameObjectBuss.hasTransformComponent,
       MainEditorGameObjectBuss.getTransformComponent,
       stateTuple
     )
  |> _buildSpecificComponentTuple(
       "material",
       gameObject,
       MainEditorGameObjectBuss.hasMaterialComponent,
       MainEditorGameObjectBuss.getMaterialComponent,
       stateTuple
     )
  |> _buildSpecificComponentTuple(
       "cameraController",
       gameObject,
       MainEditorGameObjectBuss.hasCameraControllerComponent,
       MainEditorGameObjectBuss.getCameraControllerComponent,
       stateTuple
     );