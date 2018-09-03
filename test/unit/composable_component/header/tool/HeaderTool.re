let triggerAddBox = () => {
  let component =
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    );
  BaseEventTool.triggerComponentEvent(
    component,
    OperateGameObjectEventTool.triggerClickAddBox,
  );
};

let triggerDisposeBox = () => {
  let component =
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    );
  BaseEventTool.triggerComponentEvent(
    component,
    OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
  );
};

let triggerAddEmptyGameObject = () => {
  let component =
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    );
  BaseEventTool.triggerComponentEvent(
    component,
    OperateGameObjectEventTool.triggerClickAddEmptyGameObject,
  );
};

let fileLoad = HeaderLoadWdbUtils.loadSceneWDB;