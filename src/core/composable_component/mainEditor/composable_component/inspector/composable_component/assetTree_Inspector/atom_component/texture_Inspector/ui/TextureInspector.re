module Method = {
  let renderWrapSSelect = (dispatchFunc, textureComponent) =>
    <Select
      label="WrapS"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapS(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(
        value =>
          InspectorChangeTextureWrapSEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      )
    />;

  let renderWrapTSelect = (dispatchFunc, textureComponent) =>
    <Select
      label="WrapT"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapT(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(
        value =>
          InspectorChangeTextureWrapTEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      )
    />;
  let renderMagFilterSelect = (dispatchFunc, textureComponent) =>
    <Select
      label="Mag Filter"
      options=(TextureFilterUtils.getMagFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(
        value =>
          InspectorChangeTextureMagFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      )
    />;

  let renderMinFilterSelect = (dispatchFunc, textureComponent) =>
    <Select
      label="Min Filter"
      options=(TextureFilterUtils.getMinFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMinFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(
        value =>
          InspectorChangeTextureMinFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      )
    />;
};

let component = ReasonReact.statelessComponent("TextureInspector");

let render = ((dispatchFunc, renameFunc), name, textureComponent, _self) =>
  <article key="TextureInspector" className="wonder-texture-assetTree">
    <h1> (DomHelper.textEl("Texture")) </h1>
    <hr />
    <StringInput
      label="Name"
      defaultValue=name
      onBlur=renameFunc
      canBeNull=false
    />
    (Method.renderWrapSSelect(dispatchFunc, textureComponent))
    (Method.renderWrapTSelect(dispatchFunc, textureComponent))
    (Method.renderMagFilterSelect(dispatchFunc, textureComponent))
    (Method.renderMinFilterSelect(dispatchFunc, textureComponent))
  </article>;

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~name,
      ~textureComponent,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  render: self =>
    render((dispatchFunc, renameFunc), name, textureComponent, self),
};