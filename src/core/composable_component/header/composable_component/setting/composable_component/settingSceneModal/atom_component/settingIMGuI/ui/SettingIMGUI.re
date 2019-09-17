module Method = {
  let removeFnt = SettingIMGUIAssetRemoveFntEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let setFntData = SettingIMGUIAssetSetFntDataEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let getBitmapCurrentAssetImageSrc =
      (currentAssetData, (editorState, engineState)) =>
    SelectAssetNodeUtils.getImageSrc(
      editorState
      |> BasicSourceTypeTextureNodeAssetEditorService.findAllBasicSourceTypeTextureNodes
      |> Js.Array.find(node =>
           NodeNameAssetLogicService.getNodeName(node, engineState)
           === (
                 currentAssetData
                 |> SelectAssetByImage.convertAssetDataTypeToString
               )
         )
      |> OptionService.unsafeGet
      |> TextureNodeAssetService.getTextureComponent,
      engineState,
    );

  let removeBitmap = SettingIMGUIAssetRemoveBitmapEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let setBitmapData = ((uiState, dispatchFunc), node) =>
    SettingIMGUIAssetSetBitmapDataEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
      (uiState, dispatchFunc),
      (),
      (
        NodeNameAssetLogicService.getNodeName(node)
        |> StateLogicService.getEngineStateToGetData,
        ImageDataAssetEditorService.getArrayBuffer(node)
        |> StateLogicService.getEditorState,
      ),
    );

  let _removeCustomImage = SettingIMGUIAssetRemoveCustomImageEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _replaceCustomImageData = SettingIMGUIAssetReplaceCustomImageDataEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _getCustomImageCurrentAssetImageSrc =
      (currentAssetData, (_, engineState)) =>
    SelectAssetNodeUtils.getImageSrc(
      currentAssetData |> SelectAssetByImage.convertAssetDataTypeToInt,
      engineState,
    );

  let renderCustomImage = (isShowCustomImageGroup, languageType, dispatchFunc) =>
    <>
      {
        ReasonReact.array(
          AssetIMGUIEngineService.getSettedAssetCustomImageDataArr
          |> StateLogicService.getEngineStateToGetData
          |> Js.Array.map(((_, id, _)) =>
               <SelectAssetByImage
                 label=id
                 assetGroupHeader="Custom Image"
                 title={
                   LanguageUtils.getHeaderLanguageDataByType(
                     "setting-imgui-asset-customImage-describe",
                     languageType,
                   )
                 }
                 currentAssetDataOpt={
                   IMGUICustomImageTypeTextureNodeAssetEditorService.findTextureComponentByCustomImageId(
                     IMGUICustomImageTypeTextureNodeAssetEditorService.findAllIMGUICustomImageTypeTextureNodes
                     |> StateLogicService.getEditorState,
                     id,
                   )
                   |> StateLogicService.getEditorState
                   |> Js.Option.map((. textureComponent) =>
                        textureComponent
                        |> SelectAssetByImage.convertIntToAssetDataType
                      )
                 }
                 removeAssetFunc={
                   () =>
                     _removeCustomImage(
                       (UIStateService.getState(), dispatchFunc),
                       (),
                       id,
                     )
                 }
                 findAllAssetRelatedDataFunc=IMGUICustomImageTypeTextureNodeAssetEditorService.findAllIMGUICustomImageTypeTextureNodes
                 onDropFunc={
                   node =>
                     _replaceCustomImageData(
                       (UIStateService.getState(), dispatchFunc),
                       (),
                       (id, node),
                     )
                 }
                 getCurrentAssetDataFromNodeFunc={
                   node =>
                     TextureNodeAssetService.getTextureComponent(node)
                     |> SelectAssetByImage.convertIntToAssetDataType
                 }
                 getCurrentAssetImageSrcFunc=_getCustomImageCurrentAssetImageSrc
                 getAssetGroupSingleAssetImageSrcFunc={
                   (node, (editorState, _)) =>
                     ImageDataMapUtils.getImgSrc(
                       TextureNodeAssetService.getImageDataIndex(node),
                       editorState,
                     )
                 }
                 isCurrentAssetFunc={
                   (currentTextureComponent, node) =>
                     currentTextureComponent
                     |> SelectAssetByImage.convertAssetDataTypeToInt
                     === TextureNodeAssetService.getTextureComponent(node)
                 }
                 renderAssetNameFunc={(_, _) => ReasonReact.null}
                 isShowAssetGroup=isShowCustomImageGroup
               />
             ),
        )
      }
      /* TODO add "add custom image" button */
    </>;
};

let component = ReasonReact.statelessComponent("SettingIMGUI");

let render =
    (
      (uiState, dispatchFunc),
      (isShowFntGroup, isShowBitmapGroup, isShowCustomImageGroup),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="setting-imgui">
    <div className="item">
      <div className="item-header">
        <h1> {DomHelper.textEl("IMGUI Setting")} </h1>
        <hr />
      </div>
      <div className="item-content">
        <div className="setting-imgui-asset">
          <h2> {DomHelper.textEl("Asset")} </h2>
          <hr />
          <SelectAssetByText
            label={
              LanguageUtils.getHeaderLanguageDataByType(
                "setting-imgui-asset-fnt",
                languageType,
              )
            }
            assetGroupHeader="Fnt"
            isShowAssetGroup=isShowFntGroup
            title={
              LanguageUtils.getHeaderLanguageDataByType(
                "setting-imgui-asset-fnt-describe",
                languageType,
              )
            }
            currentAssetDataOpt={
              AssetIMGUIEngineService.getSettedAssetFntName
              |> StateLogicService.getEngineStateToGetData
              |> Js.Option.map((. fntName) =>
                   fntName |> SelectAssetByText.convertStringToAssetDataType
                 )
            }
            getCurrentAssetDataFromAssetRelatedDataFunc={
              assetRelatedData =>
                assetRelatedData
                |> SelectAssetByText.convertAssetRelatedDataTypeToNode
                |> FntNodeAssetService.getNodeName
                |> SelectAssetByText.convertStringToAssetDataType
            }
            getAssetTextFunc={
              (currentAssetDataOpt, engineState) =>
                switch (currentAssetDataOpt) {
                | None => ""
                | Some(currentAssetData) =>
                  currentAssetData
                  |> SelectAssetByText.convertAssetDataTypeToString
                }
            }
            isCurrentAssetFunc={
              (currentAssetData, assetRelatedData) =>
                currentAssetData
                |> SelectAssetByText.convertAssetDataTypeToString
                === (
                      assetRelatedData
                      |> SelectAssetByText.convertAssetRelatedDataTypeToNode
                      |> FntNodeAssetService.getNodeName
                    )
            }
            findAllAssetRelatedDataFunc={
              () =>
                FntNodeAssetEditorService.findAllFnts
                |> StateLogicService.getEditorState
                |> Js.Array.map(node =>
                     node
                     |> SelectAssetByText.convertNodeToAssetRelatedDataType
                   )
            }
            changeAssetFunc={
              (sourceAssetDataOpt, assetRelatedData) => {
                let node =
                  assetRelatedData
                  |> SelectAssetByText.convertAssetRelatedDataTypeToNode;

                Method.setFntData(
                  (UIStateService.getState(), dispatchFunc),
                  (),
                  (
                    FntNodeAssetService.getNodeName(node),
                    FntNodeAssetService.getFntContent(
                      FntNodeAssetService.getNodeData(node),
                    ),
                  ),
                );
              }
            }
            getTextFunc={
              assetRelatedData =>
                FntNodeAssetService.getNodeName(
                  assetRelatedData
                  |> SelectAssetByText.convertAssetRelatedDataTypeToNode,
                )
            }
            removeAssetFuncOpt={
              Some(
                Method.removeFnt(
                  (UIStateService.getState(), dispatchFunc),
                  (),
                ),
              )
            }
          />
          <SelectAssetByImage
            label={
              LanguageUtils.getHeaderLanguageDataByType(
                "setting-imgui-asset-bitmap",
                languageType,
              )
            }
            assetGroupHeader="Bitmap"
            title={
              LanguageUtils.getHeaderLanguageDataByType(
                "setting-imgui-asset-bitmap-describe",
                languageType,
              )
            }
            currentAssetDataOpt={
              AssetIMGUIEngineService.getSettedAssetBitmapName
              |> StateLogicService.getEngineStateToGetData
              |> Js.Option.map((. bitmapName) =>
                   bitmapName
                   |> SelectAssetByImage.convertStringToAssetDataType
                 )
            }
            removeAssetFunc={
              Method.removeBitmap(
                (UIStateService.getState(), dispatchFunc),
                (),
              )
            }
            findAllAssetRelatedDataFunc=BasicSourceTypeTextureNodeAssetEditorService.findAllBasicSourceTypeTextureNodes
            onDropFunc={
              node =>
                Method.setBitmapData(
                  (UIStateService.getState(), dispatchFunc),
                  node,
                )
            }
            getCurrentAssetDataFromNodeFunc={
              node =>
                NodeNameAssetLogicService.getNodeName(node)
                |> StateLogicService.getEngineStateToGetData
                |> SelectAssetByImage.convertStringToAssetDataType
            }
            getCurrentAssetImageSrcFunc=Method.getBitmapCurrentAssetImageSrc
            getAssetGroupSingleAssetImageSrcFunc={
              (node, (editorState, _)) =>
                ImageDataMapUtils.getImgSrc(
                  TextureNodeAssetService.getImageDataIndex(node),
                  editorState,
                )
            }
            isCurrentAssetFunc={
              (currentBitmapName, node) =>
                currentBitmapName
                |> SelectAssetByImage.convertAssetDataTypeToString
                === (
                      NodeNameAssetLogicService.getNodeName(node)
                      |> StateLogicService.getEngineStateToGetData
                    )
            }
            renderAssetNameFunc={(_, _) => ReasonReact.null}
            isShowAssetGroup=isShowBitmapGroup
          />
          <h3> {DomHelper.textEl("Custom Image")} </h3>
          <hr />
          {
            Method.renderCustomImage(
              isShowCustomImageGroup,
              languageType,
              dispatchFunc,
            )
          }
        </div>
      </div>
    </div>
  </article>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~isShowFntGroup,
      ~isShowBitmapGroup,
      ~isShowCustomImageGroup,
      _children,
    ) => {
  ...component,
  render: _ =>
    render(
      (uiState, dispatchFunc),
      (isShowFntGroup, isShowBitmapGroup, isShowCustomImageGroup),
    ),
};