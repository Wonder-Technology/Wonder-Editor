let prepareScaleGlState = engineState =>
  RenderTranslationGizmosUtils.prepareTranslationAxisGlState(engineState);

let restoreScaleGlState = engineState =>
  RenderTranslationGizmosUtils.restoreTranslationAxisGlState(engineState);

let getRenderDataArr = (gameObjects, engineState) =>
  RenderTranslationGizmosUtils.getRenderDataArr(gameObjects, engineState);

let render = (renderDataArr, gl, engineState) =>
  RenderTranslationGizmosUtils.render(renderDataArr, gl, engineState);