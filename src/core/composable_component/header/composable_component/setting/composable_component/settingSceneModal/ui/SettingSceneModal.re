open ColorType;

open Color;

open NodeAssetType;

module Method = {
  let _changeAmbientLightColor = value =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> SceneEngineService.setAmbientLightColor
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let _getAmbientLightColor = () =>
    SceneEngineService.getAmbientLightColor
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let _closeAmbientLightColorPick = SettingSceneModalAmbientLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let _renderAmbientLight = ((uiState, dispatchFunc), languageType) =>
    <div className="content-field">
      <PickColorComponent
        key={DomHelper.getRandomKey()}
        label={
          LanguageUtils.getHeaderLanguageDataByType(
            "setting-scene-ambient",
            languageType,
          )
        }
        title={
          LanguageUtils.getHeaderLanguageDataByType(
            "setting-scene-ambient-describe",
            languageType,
          )
        }
        getColorFunc=_getAmbientLightColor
        changeColorFunc=_changeAmbientLightColor
        closeColorPickFunc={
          _closeAmbientLightColorPick((uiState, dispatchFunc), ())
        }
      />
    </div>;

  let _showCubemapTextureName = (cubemapTextureOpt, engineState) =>
    switch (cubemapTextureOpt) {
    | None => ReasonReact.null
    | Some(cubemapTexture) =>
      <span>
        {
          DomHelper.textEl(
            NodeNameAssetLogicService.getCubemapNodeName(
              ~texture=cubemapTexture,
              ~engineState,
            ),
          )
        }
      </span>
    };

  let removeCubemap = SettingSceneModalSkyboxRemoveCubemapEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let setCubemapTextureToSceneSkybox =
      ((uiState, dispatchFunc), cubemapTexture) =>
    Console.tryCatch(
      () =>
        SettingSceneModalSkyboxSetCubemapTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
          (uiState, dispatchFunc),
          (),
          cubemapTexture,
        ),
      e => {
        let message = e##message;

        ConsoleUtils.error(
          LogUtils.buildErrorMessage(
            ~description={j|$message|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        )
        |> StateLogicService.getEditorState;
      },
    );

  let _renderSkybox =
      (isShowCubemapGroup, languageType, sendFunc, dispatchFunc) =>
    <SelectAssetNode
      label={
        LanguageUtils.getHeaderLanguageDataByType(
          "setting-scene-skybox-cubemap",
          languageType,
        )
      }
      assetGroupHeader="Cubemap"
      title={
        LanguageUtils.getHeaderLanguageDataByType(
          "setting-scene-skybox-cubemap-describe",
          languageType,
        )
      }
      currentAssetDataOpt={
        SceneEngineService.getCubemapTexture
        |> StateLogicService.getEngineStateToGetData
      }
      removeAssetFunc={
        removeCubemap((UIStateService.getState(), dispatchFunc), ())
      }
      findAllAssetNodesFunc=CubemapNodeAssetEditorService.findAllCubemapNodes
      onDropFunc={
        node =>
          setCubemapTextureToSceneSkybox(
            (UIStateService.getState(), dispatchFunc),
            CubemapNodeAssetService.getTextureComponent(node),
          )
      }
      getCurrentAssetDataFromNodeFunc={
        node => CubemapNodeAssetService.getTextureComponent(node)
      }
      getAssetImageSrcFromEngineFunc={
        (cubemapTexture, engineState) => "./public/img/cubemap.png"
      }
      getAssetImageSrcFromEditorFunc={
        (node, editorState) => "./public/img/cubemap.png"
      }
      isCurrentAssetFunc={
        (cubemapTexture, node) =>
          cubemapTexture === CubemapNodeAssetService.getTextureComponent(node)
      }
      getAssetNodeNameByNodeFunc={
        (node, engineState) =>
          NodeNameAssetLogicService.getCubemapNodeName(
            ~texture=CubemapNodeAssetService.getTextureComponent(node),
            ~engineState,
          )
      }
      renderAssetNameFunc=_showCubemapTextureName
      isShowAssetGroup=isShowCubemapGroup
    />;

  let renderContent =
      ((uiState, dispatchFunc), sendFunc, isShowCubemapGroup, languageType) =>
    <div className="modal-item-content">
      <div className="setting-scene-ambient">
        {_renderAmbientLight((uiState, dispatchFunc), languageType)}
      </div>
      <div className="setting-scene-skybox">
        {
          _renderSkybox(
            isShowCubemapGroup,
            languageType,
            sendFunc,
            dispatchFunc,
          )
        }
      </div>
    </div>;
};

let component = ReasonReact.statelessComponent("SettingSceneModal");

let render =
    (
      (uiState, dispatchFunc),
      title,
      isShowCubemapGroup,
      closeFunc,
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="wonder-settingScene-modal">
    <div className="modal-item">
      <div className="modal-item-header">
        {DomHelper.textEl(title)}
        <img src="./public/img/close.png" onClick={_e => closeFunc()} />
      </div>
      {
        Method.renderContent(
          (uiState, dispatchFunc),
          send,
          isShowCubemapGroup,
          languageType,
        )
      }
    </div>
  </article>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~closeFunc,
      ~title,
      ~isShowCubemapGroup,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      title,
      isShowCubemapGroup,
      closeFunc,
      self,
    ),
};