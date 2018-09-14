let addDirectionLightInBox = () => {
  let boxComponentCount = ComponentDomTool.getBoxComponentCount();
  let renderingCategoryDomIndex =
    ComponentDomTool.getRenderingCategoryDomIndex();
  let lightTypeDomIndex = ComponentDomTool.getLightTypeDomIndex();

  OperateComponentEventTool.addComponentIntoCurrentGameObject(
    boxComponentCount,
    renderingCategoryDomIndex,
    lightTypeDomIndex,
  );
};
let addArcballCameraInBox = () => {
  let boxComponentCount = ComponentDomTool.getBoxComponentCount();
  let cameraCategoryDomIndex = ComponentDomTool.getCameraCategoryDomIndex();
  let arcballCameraTypeDomIndex =
    ComponentDomTool.getArcballCameraControllerTypeDomIndex();

  OperateComponentEventTool.addComponentIntoCurrentGameObject(
    boxComponentCount,
    cameraCategoryDomIndex,
    arcballCameraTypeDomIndex,
  );
};

let addArcballCameraInCamera = () => {
  let cameraComponentCount = ComponentDomTool.getCameraComponentCount();
  let cameraCategoryDomIndex = ComponentDomTool.getCameraCategoryDomIndex();
  let arcballCameraTypeDomIndex =
    ComponentDomTool.getArcballCameraControllerTypeDomIndex();

  OperateComponentEventTool.addComponentIntoCurrentGameObject(
    cameraComponentCount,
    cameraCategoryDomIndex,
    arcballCameraTypeDomIndex,
  );
};

let addCameraGroupInBox = () => {
  let boxComponentCount = ComponentDomTool.getBoxComponentCount();
  let cameraCategoryDomIndex = ComponentDomTool.getCameraCategoryDomIndex();
  let cameraGroupTypeDomIndex = ComponentDomTool.getCameraGroupTypeDomIndex();

  OperateComponentEventTool.addComponentIntoCurrentGameObject(
    boxComponentCount,
    cameraCategoryDomIndex,
    cameraGroupTypeDomIndex,
  );
};

let addRenderGroupInCamera = () => {
  let cameraComponentCount = ComponentDomTool.getCameraComponentCount();
  let renderingCategoryDomIndex =
    ComponentDomTool.getRenderingCategoryDomIndex();
  let renderGroupTypeDomIndex = ComponentDomTool.getRenderGroupTypeDomIndex();

  OperateComponentEventTool.addComponentIntoCurrentGameObject(
    cameraComponentCount,
    renderingCategoryDomIndex,
    renderGroupTypeDomIndex,
  );
};

let addGeometryInCamera = () => {
  let cameraComponentCount = ComponentDomTool.getCameraComponentCount();
  let meshCategoryDomIndex =
    ComponentDomTool.getMeshCategoryDomIndex();
  let geometryTypeDomIndex = ComponentDomTool.getGeometryTypeDomIndex();

  OperateComponentEventTool.addComponentIntoCurrentGameObject(
    cameraComponentCount,
    meshCategoryDomIndex,
    geometryTypeDomIndex,
  );
};


let buildTwoAddedArcballCameraControllerCamera = sandbox => {
  let (camera1, camera2, box) =
    SceneTreeTool.buildTwoCameraSceneGraphToEngine(sandbox);

  SceneTreeNodeDomTool.OperateTwoCamera.getFirstCameraDomIndex()
  |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

  addArcballCameraInCamera();

  SceneTreeNodeDomTool.OperateTwoCamera.getSecondCameraDomIndex()
  |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

  addArcballCameraInCamera();

  (camera1, camera2);
};