let getOutlineColor = SetOutlineDataJob._getOutlineColor;

let getGameObjectsNeedDrawOutline =
    (engineState: Wonderjs.StateDataMainType.state) =>
  Wonderjs.OperateOutlineDataJobDataService.getGameObjectsNeedDrawOutline(
    engineState.jobDataRecord,
  );