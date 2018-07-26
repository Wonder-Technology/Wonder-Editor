open DiffType;

module Method = {
  let blurPositionEvent = PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let blurScaleEvent = ScaleBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let _setCurrentSceneTreeNodeLocalPosition = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalPosition((x, y, z))
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|transformComponent|], type_: Transform},
       |]);

  let changePositionX = (transformComponent, value) => {
    let (_x, y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);

    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (value, y, z));
  };

  let changePositionY = (transformComponent, value) => {
    let (x, _y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);

    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (x, value, z));
  };

  let changePositionZ = (transformComponent, value) => {
    let (x, y, _z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);

    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (x, y, value));
  };

  let _setCurrentSceneTreeNodeLocalScale = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalScale((x, y, z))
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|transformComponent|], type_: Transform},
       |]);

  let changeScaleX = (transformComponent, value) => {
    let (_x, y, z) =
      TransformEngineService.getLocalScale(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalScale(transformComponent, (value, y, z));
  };

  let changeScaleY = (transformComponent, value) => {
    let (x, _y, z) =
      TransformEngineService.getLocalScale(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalScale(transformComponent, (x, value, z));
  };

  let changeScaleZ = (transformComponent, value) => {
    let (x, y, _z) =
      TransformEngineService.getLocalScale(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalScale(transformComponent, (x, y, value));
  };
};

let component = ReasonReact.statelessComponent("MainEditorTransformTest");

let render = ((store, dispatchFunc), transformComponent, _self) =>
  <article className="wonder-inspector-transform">
    <div className="transform-item">
      <div className=""> (DomHelper.textEl("position : ")) </div>
      <TransformTemplate
        store
        dispatchFunc
        transformComponent
        changeXFunc=Method.changePositionX
        changeYFunc=Method.changePositionY
        changeZFunc=Method.changePositionZ
        getDataFunc=TransformUtils.getTransformPositionData
        blurEventFunc=Method.blurPositionEvent
      />
    </div>
    <div className="transform-item">
      <div className=""> (DomHelper.textEl("scale : ")) </div>
      <TransformTemplate
        store
        dispatchFunc
        transformComponent
        changeXFunc=Method.changeScaleX
        changeYFunc=Method.changeScaleY
        changeZFunc=Method.changeScaleZ
        getDataFunc=TransformUtils.getTransformScaleData
        blurEventFunc=Method.blurScaleEvent
      />
    </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~transformComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), transformComponent, self),
};