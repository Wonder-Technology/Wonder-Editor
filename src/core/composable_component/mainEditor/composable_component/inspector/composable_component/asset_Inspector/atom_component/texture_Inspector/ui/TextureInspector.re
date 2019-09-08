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

  let _updateEngineData = (node, editorState, engineState) =>
    engineState
    |> IMGUIAssetLogicService.removeSettedAssets(
         (
           TextureNodeAssetService.getType(node),
           TextureNodeAssetService.getTextureContentIndex(node),
           TextureNodeAssetService.getTextureComponent(node),
         ),
         editorState,
         StateLogicService.renderEngineStateAndReturnEngineState,
       );

  let _removeOldTextureContent = (nodeId, editorState) =>
    TextureContentTextureNodeAssetEditorService.removeTextureContent(
      IMGUICustomImageTypeTextureNodeAssetEditorService.getTextureContentIndex(
        nodeId,
        editorState,
      ),
      editorState,
    );

  let _updateEditorData = (nodeId, newType, editorState) =>
    switch (newType) {
    | NodeAssetType.BasicSource =>
      let nodeData =
        TextureNodeAssetEditorService.unsafeGetNodeData(nodeId, editorState);

      editorState
      |> _removeOldTextureContent(nodeId)
      |> TextureNodeAssetEditorService.setNodeData(
           nodeId,
           {...nodeData, type_: newType, textureContentIndex: None},
         );
    | NodeAssetType.IMGUICustomImage =>
      let (editorState, newTextureContentIndex) =
        IndexAssetEditorService.generateIMGUICustomImageTextureContentIndex(
          editorState,
        );

      let nodeData =
        TextureNodeAssetEditorService.unsafeGetNodeData(nodeId, editorState);

      editorState
      |> _removeOldTextureContent(nodeId)
      |> TextureNodeAssetEditorService.setNodeData(
           nodeId,
           {
             ...nodeData,
             type_: newType,
             textureContentIndex: Some(newTextureContentIndex),
           },
         )
      |> IMGUICustomImageTextureContentMapAssetEditorService.setContent(
           newTextureContentIndex,
           IMGUICustomImageTextureContentMapAssetEditorService.generateEmptyContent(),
         );
    };

  /* TODO add to redo/undo */
  let changeTextureType = (dispatchFunc, nodeId, value) => {
    let editorState = StateEditorService.getState();

    let node =
      OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState);

    _updateEngineData(node, editorState)
    |> StateLogicService.getAndSetEngineState;

    editorState
    |> _updateEditorData(
         nodeId,
         value |> NodeAssetType.convertIntToTextureType,
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };

  let _getCustomImageId = (textureContentIndex, editorState) =>
    IMGUICustomImageTextureContentMapAssetEditorService.getId(
      textureContentIndex,
      editorState,
    );

  let _updateEngineDataByCustomImageId =
      (nodeId, oldCustomImageId, newCustomImageId, editorState, engineState) =>
    AssetIMGUIEngineService.hasSettedAssetCustomImageData(
      oldCustomImageId,
      engineState,
    ) ?
      {
        let imageData =
          BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
            TextureNodeAssetEditorService.getImageDataIndex(
              nodeId,
              editorState,
            ),
            editorState,
          );

        AssetIMGUIEngineService.removeSettedAssetCustomImageData(
          oldCustomImageId,
          engineState,
        )
        |> AssetIMGUIEngineService.addSettedAssetCustomImageData((
             imageData
             |> ImageDataAssetService.getUint8Array(_, () =>
                  WonderLog.Log.fatal(
                    WonderLog.Log.buildFatalMessage(
                      ~title="_updateEngineDataByCustomImageId",
                      ~description=
                        {j|image should has uint8Array or base64 data|j},
                      ~reason="",
                      ~solution={j||j},
                      ~params={j||j},
                    ),
                  )
                )
             |> Js.Typed_array.Uint8Array.buffer,
             newCustomImageId,
             ImageDataAssetService.getMimeType(imageData),
           ))
        |> StateLogicService.renderEngineStateAndReturnEngineState;
      } :
      engineState;

  let _setCustomImageId =
      (
        nodeId,
        textureContentIndex,
        newCustomImageId,
        (editorState, engineState),
      ) =>
    IMGUICustomImageTypeTextureNodeAssetEditorService.hasId(
      newCustomImageId,
      editorState,
    ) ?
      {
        ConsoleUtils.warn(
          LanguageUtils.getMessageLanguageDataByType(
            "texture-inspector-customImageId-exist",
            LanguageEditorService.unsafeGetType(editorState),
          ),
          editorState,
        )
        |> ignore;

        (editorState, engineState);
      } :
      {
        let engineState =
          _updateEngineDataByCustomImageId(
            nodeId,
            editorState
            |> IMGUICustomImageTextureContentMapAssetEditorService.getId(
                 textureContentIndex,
               ),
            newCustomImageId,
            editorState,
            engineState,
          );

        let editorState =
          editorState
          |> IMGUICustomImageTextureContentMapAssetEditorService.setId(
               textureContentIndex,
               newCustomImageId,
             );

        (editorState, engineState);
      };

  let renderTextureContent = (nodeId, languageType) => {
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
            defaultValue={_getCustomImageId(textureContentIndex, editorState)}
            onBlur=(
              value =>
                _setCustomImageId(nodeId, textureContentIndex, value)
                |> StateLogicService.getAndSetState
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
        value => Method.changeTextureType(dispatchFunc, nodeId, value)
      }
    />
    {Method.renderTextureContent(nodeId, languageType)}
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