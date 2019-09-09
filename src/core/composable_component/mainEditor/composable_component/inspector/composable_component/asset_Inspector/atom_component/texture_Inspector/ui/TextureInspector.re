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

  let getTextureTypeOptions = (): array(SelectType.optionItem) => [|
    {
      key: NodeAssetType.BasicSource |> NodeAssetType.convertTextureTypeToInt,
      value: "basic_source",
    },
    {
      key:
        NodeAssetType.IMGUICustomImage |> NodeAssetType.convertTextureTypeToInt,
      value: "imgui_custom_image",
    },
  |];

  let _getTextureNode = (nodeId, editorState) =>
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState);

  let getCurrentTextureType = nodeId => {
    let editorState = StateEditorService.getState();

    _getTextureNode(nodeId, editorState) |> TextureNodeAssetService.getType;
  };

  let changeTextureType = InspectorChangeTextureTypeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _unsafeGetCustomImageId = (textureContentIndex, editorState) =>
    IMGUICustomImageTextureContentMapAssetEditorService.unsafeGetId(
      textureContentIndex,
      editorState,
    );

  let _setCustomImageId = InspectorTextureContentSetIdEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let renderTextureContent = (nodeId, languageType, dispatchFunc) => {
    let editorState = StateEditorService.getState();

    let node = _getTextureNode(nodeId, editorState);

    <div className="content-imgui-custom-image">
      {
        switch (node |> TextureNodeAssetService.getType) {
        | NodeAssetType.BasicSource => ReasonReact.null
        | NodeAssetType.IMGUICustomImage =>
          let textureContentIndex =
            TextureNodeAssetService.unsafeGetTextureContentIndex(node);

          <StringInput
            label="Custom Image Id"
            title={
              LanguageUtils.getInspectorLanguageDataByType(
                "texture-content-imguiCustomImage-id-describe",
                languageType,
              )
            }
            defaultValue={
              _unsafeGetCustomImageId(textureContentIndex, editorState)
            }
            onBlur=(
              value =>
                _setCustomImageId(
                  (UIStateService.getState(), dispatchFunc),
                  (),
                  (nodeId, textureContentIndex, value),
                )
            )
            canBeNull=false
          />;
        }
      }
    </div>;
  };
};

let component = ReasonReact.statelessComponent("TextureInspector");

let render =
    ((dispatchFunc, renameFunc), (nodeId, name, textureComponent), _self) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="TextureInspector" className="wonder-texture-inspector">
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
    <Select
      label="Texture Type"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "texture-type-describe",
          languageType,
        )
      }
      options={Method.getTextureTypeOptions()}
      selectedKey={
        Method.getCurrentTextureType(nodeId)
        |> NodeAssetType.convertTextureTypeToInt
      }
      onChange={
        value =>
          Method.changeTextureType(
            (UIStateService.getState(), dispatchFunc),
            (),
            (nodeId, value),
          )
      }
    />
    {Method.renderTextureContent(nodeId, languageType, dispatchFunc)}
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
      ~nodeId,
      ~textureComponent,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (dispatchFunc, renameFunc),
      (nodeId, name, textureComponent),
      self,
    ),
};