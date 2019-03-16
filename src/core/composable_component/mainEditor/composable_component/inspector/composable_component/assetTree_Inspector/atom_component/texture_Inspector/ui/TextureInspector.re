module Method = {
  let renderWrapSSelect = (dispatchFunc, textureComponent, languageType) =>
    <Select
      label="WrapS"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "texture-wraps-describe",
          languageType,
        )
      }
      options={TextureWrapUtils.getWrapOptions()}
      selectedKey={
        BasicSourceTextureEngineService.getWrapS(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      }
      onChange={
        value =>
          InspectorChangeTextureWrapSEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      }
    />;

  let renderWrapTSelect = (dispatchFunc, textureComponent, languageType) =>
    <Select
      label="WrapT"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "texture-wrapt-describe",
          languageType,
        )
      }
      options={TextureWrapUtils.getWrapOptions()}
      selectedKey={
        BasicSourceTextureEngineService.getWrapT(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      }
      onChange={
        value =>
          InspectorChangeTextureWrapTEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      }
    />;
  let renderMagFilterSelect = (dispatchFunc, textureComponent, languageType) =>
    <Select
      label="Mag Filter"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "texture-mag-filter-describe",
          languageType,
        )
      }
      options={TextureFilterUtils.getMagFilterOptions()}
      selectedKey={
        BasicSourceTextureEngineService.getMagFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      }
      onChange={
        value =>
          InspectorChangeTextureMagFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      }
    />;

  let renderMinFilterSelect = (dispatchFunc, textureComponent, languageType) =>
    <Select
      label="Min Filter"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "texture-min-filter-describe",
          languageType,
        )
      }
      options={TextureFilterUtils.getMinFilterOptions()}
      selectedKey={
        BasicSourceTextureEngineService.getMinFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      }
      onChange={
        value =>
          InspectorChangeTextureMinFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      }
    />;
};

let component = ReasonReact.statelessComponent("TextureInspector");

let render = ((dispatchFunc, renameFunc), name, textureComponent, _self) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="TextureInspector" className="wonder-texture-assetTree">
    <h1> {DomHelper.textEl("Texture")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "texture-name-describe",
          languageType,
        )
      }
      defaultValue=name
      onBlur=renameFunc
      canBeNull=false
    />
    {Method.renderWrapSSelect(dispatchFunc, textureComponent, languageType)}
    {Method.renderWrapTSelect(dispatchFunc, textureComponent, languageType)}
    {
      Method.renderMagFilterSelect(
        dispatchFunc,
        textureComponent,
        languageType,
      )
    }
    {
      Method.renderMinFilterSelect(
        dispatchFunc,
        textureComponent,
        languageType,
      )
    }
  </article>;
};

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