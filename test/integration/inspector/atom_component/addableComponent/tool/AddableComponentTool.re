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