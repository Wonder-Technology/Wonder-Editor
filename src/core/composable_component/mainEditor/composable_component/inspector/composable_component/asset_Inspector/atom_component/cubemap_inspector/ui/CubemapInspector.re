module Method = {
  let renderWrapSSelect = (dispatchFunc, textureComponent, languageType) =>
    <Select
      label="WrapS"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-wraps-describe",
          languageType,
        )
      }
      options={TextureWrapUtils.getWrapOptions()}
      selectedKey={
        CubemapTextureEngineService.getWrapS(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      }
      onChange={
        value =>
          InspectorChangeCubemapWrapSEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
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
          "cubemap-wrapt-describe",
          languageType,
        )
      }
      options={TextureWrapUtils.getWrapOptions()}
      selectedKey={
        CubemapTextureEngineService.getWrapT(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      }
      onChange={
        value =>
          InspectorChangeCubemapWrapTEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
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
          "cubemap-mag-filter-describe",
          languageType,
        )
      }
      options={TextureFilterUtils.getMagFilterOptions()}
      selectedKey={
        CubemapTextureEngineService.getMagFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      }
      onChange={
        value =>
          InspectorChangeCubemapMagFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
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
          "cubemap-min-filter-describe",
          languageType,
        )
      }
      options={TextureFilterUtils.getMinFilterOptions()}
      selectedKey={
        CubemapTextureEngineService.getMinFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      }
      onChange={
        value =>
          InspectorChangeCubemapMinFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
            (UIStateService.getState(), dispatchFunc),
            (),
            (textureComponent, value),
          )
      }
    />;
  /* let removeSource = (removeSourceFunc, cubemapTextureComponent) => {
       let engineState = StateEngineService.unsafeGetState();

       let engineState = removeSourceFunc(cubemapTextureComponent, engineState);

       engineState |> StateEngineService.setState |> ignore;
     }; */
  /* let getFaceSource = (cubemapTextureComponent, getSourceFunc) =>
     getSourceFunc(cubemapTextureComponent)
     |> StateLogicService.getEngineStateToGetData; */
  /* let setFaceSource = (cubemapTextureComponent, setSourceFunc, source) =>
     setSourceFunc(cubemapTextureComponent, source)
     |> StateLogicService.getAndSetEngineState; */
};

let component = ReasonReact.statelessComponent("CubemapInspector");

let render =
    ((uiState, dispatchFunc), name, textureComponent, renameFunc, _self) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="CubemapInspector" className="wonder-cubemap-inspector">
    <h1> {DomHelper.textEl("Cubemap")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-name-describe",
          languageType,
        )
      }
      defaultValue=name
      onBlur=renameFunc
      canBeNull=false
    />
    <CubemapInspectorFaceSource
      uiState
      dispatchFunc
      cubemapTexture=textureComponent
      label="Right(+ X)"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-right-describe",
          languageType,
        )
      }
      currentSource={
        CubemapTextureEngineService.getPXSource(textureComponent)
        |> StateLogicService.getEngineStateToGetData
      }
      setSourceFunc=CubemapTextureEngineService.setPXSource
      setFormatFunc=CubemapTextureEngineService.setPXFormat
    />
    <CubemapInspectorFaceSource
      uiState
      dispatchFunc
      cubemapTexture=textureComponent
      label="Left(- X)"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-left-describe",
          languageType,
        )
      }
      currentSource={
        CubemapTextureEngineService.getNXSource(textureComponent)
        |> StateLogicService.getEngineStateToGetData
      }
      setSourceFunc=CubemapTextureEngineService.setNXSource
      setFormatFunc=CubemapTextureEngineService.setNXFormat
    />
    <CubemapInspectorFaceSource
      uiState
      dispatchFunc
      cubemapTexture=textureComponent
      label="Top(+ Y)"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-top-describe",
          languageType,
        )
      }
      currentSource={
        CubemapTextureEngineService.getPYSource(textureComponent)
        |> StateLogicService.getEngineStateToGetData
      }
      setSourceFunc=CubemapTextureEngineService.setPYSource
      setFormatFunc=CubemapTextureEngineService.setPYFormat
    />
    <CubemapInspectorFaceSource
      uiState
      dispatchFunc
      cubemapTexture=textureComponent
      label="Bottom(- Y)"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-bottom-describe",
          languageType,
        )
      }
      currentSource={
        CubemapTextureEngineService.getNYSource(textureComponent)
        |> StateLogicService.getEngineStateToGetData
      }
      setSourceFunc=CubemapTextureEngineService.setNYSource
      setFormatFunc=CubemapTextureEngineService.setNYFormat
    />
    <CubemapInspectorFaceSource
      uiState
      dispatchFunc
      cubemapTexture=textureComponent
      label="Front(+ Z)"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-front-describe",
          languageType,
        )
      }
      currentSource={
        CubemapTextureEngineService.getPZSource(textureComponent)
        |> StateLogicService.getEngineStateToGetData
      }
      setSourceFunc=CubemapTextureEngineService.setPZSource
      setFormatFunc=CubemapTextureEngineService.setPZFormat
    />
    <CubemapInspectorFaceSource
      uiState
      dispatchFunc
      cubemapTexture=textureComponent
      label="Back(- Z)"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "cubemap-back-describe",
          languageType,
        )
      }
      currentSource={
        CubemapTextureEngineService.getNZSource(textureComponent)
        |> StateLogicService.getEngineStateToGetData
      }
      setSourceFunc=CubemapTextureEngineService.setNZSource
      setFormatFunc=CubemapTextureEngineService.setNZFormat
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
    render(
      (uiState, dispatchFunc),
      name,
      textureComponent,
      renameFunc,
      self,
    ),
};