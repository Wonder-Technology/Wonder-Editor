let setViewRect = (~width=10, ~height=20, ()) =>
  MainEditor.Method._updateViewRect(width, height);

let prepare = prepareStateFunc => {
  prepareStateFunc();
  StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);

  IMGUITool.prepareImgui();

  setViewRect();
};