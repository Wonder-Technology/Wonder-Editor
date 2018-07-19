let addComponentByType = (type_, currentSceneTreeNode, engineState) =>
  switch (type_) {
  | "sourceInstance" =>
    let (engineState, sourceInstanceComponent) =
      engineState |> SourceInstanceEngineService.create;
    engineState
    |> GameObjectComponentEngineService.addSourceInstanceComponent(
         currentSceneTreeNode,
         sourceInstanceComponent,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByType",
        ~description={j|the type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|type:$type_ , currentSceneTreeNode:$currentSceneTreeNode|j},
      ),
    )
  };

let getCurrentGameObjectTransform =
    (currentSceneTreeNode, engineStateToGetData) =>
  switch (currentSceneTreeNode) {
  | None => None
  | Some(gameObject) =>
    TransformUtils.getCurrentTransformData(
      GameObjectComponentEngineService.getTransformComponent(
        gameObject,
        engineStateToGetData,
      ),
    )
    |. Some
  };
let getCurrentGameObjectMap = (currentSceneTreeNode, engineStateToGetData) =>
  switch (currentSceneTreeNode) {
  | None => None
  | Some(gameObject) =>
    engineStateToGetData |> CameraEngineService.isCamera(gameObject) ?
      None :
      engineStateToGetData
      |> GameObjectComponentEngineService.getLightMaterialComponent(
           gameObject,
         )
      |. LightMaterialEngineService.getLightMaterialDiffuseMap(
           engineStateToGetData,
         )
  };
let getCurrentGameObjectColor = (currentSceneTreeNode, engineStateToGetData) =>
  switch (currentSceneTreeNode) {
  | None => None
  | Some(gameObject) =>
    engineStateToGetData |> CameraEngineService.isCamera(gameObject) ?
      None :
      engineStateToGetData
      |> GameObjectComponentEngineService.getLightMaterialComponent(
           gameObject,
         )
      |. LightMaterialEngineService.getLightMaterialDiffuseColor(
           engineStateToGetData,
         )
      |> Color.getHexString
  };

let getCurrentGameObjectName = (currentSceneTreeNode, engineStateToGetData) =>
  switch (currentSceneTreeNode) {
  | None => None
  | Some(gameObject) =>
    engineStateToGetData
    |> GameObjectEngineService.unsafeGetGameObjectName(gameObject)
    |. Some
  };