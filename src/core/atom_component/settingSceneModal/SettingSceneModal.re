open ColorType;

open Color;

open NodeAssetType;

type state = {isShowCubemapGroup: bool};

type action =
  | SetCubemapTextureToSceneSkybox(Wonderjs.CubemapTextureType.cubemapTexture)
  | ShowCubemapGroup
  | HideCubemapGroup;

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

  let _showCubemapTextureImage = engineState =>
    switch (SceneEngineService.getCubemapTexture(engineState)) {
    | None => ReasonReact.null
    | Some(cubemapTexture) => <img src="./public/img/cubemap.png" />
    };

  let _showCubemapTextureName = engineState =>
    switch (SceneEngineService.getCubemapTexture(engineState)) {
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

  let _removeCubemap = engineState =>
    SceneEngineService.removeCubemapTexture(engineState);

  let _renderSkybox = (sendFunc, languageType) =>
    <>
      <div
        className="item-header"
        title={
          LanguageUtils.getHeaderLanguageDataByType(
            "setting-scene-skybox-cubemap-describe",
            languageType,
          )
        }>
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "setting-scene-skybox-cubemap",
              languageType,
            ),
          )
        }
      </div>
      <div className="item-content">
        <div
          className="cubemap-img" onClick={_e => sendFunc(ShowCubemapGroup)}>
          {
            _showCubemapTextureImage
            |> StateLogicService.getEngineStateToGetData
          }
        </div>
        {_showCubemapTextureName |> StateLogicService.getEngineStateToGetData}
        <button
          className="cubemap-remove"
          onClick={
            e => _removeCubemap |> StateLogicService.getAndSetEngineState
          }>
          {DomHelper.textEl("Remove")}
        </button>
      </div>
    </>;

  let renderContent = ((uiState, dispatchFunc), sendFunc, languageType) =>
    <div className="modal-item-content">
      <div className="setting-scene-ambient">
        {_renderAmbientLight((uiState, dispatchFunc), languageType)}
      </div>
      <div className="setting-scene-skybox">
        {_renderSkybox(sendFunc, languageType)}
      </div>
    </div>;

  let _sortByName = (engineState, allCubemapNodes) =>
    allCubemapNodes
    |> Js.Array.sortInPlaceWith((textureNode1, textureNode2) =>
         Js.String.localeCompare(
           NodeNameAssetLogicService.getCubemapNodeName(
             ~texture=
               CubemapNodeAssetService.getTextureComponent(textureNode2),
             ~engineState,
           )
           |> Js.String.charAt(0),
           NodeNameAssetLogicService.getCubemapNodeName(
             ~texture=
               CubemapNodeAssetService.getTextureComponent(textureNode1),
             ~engineState,
           )
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let _buildCubemapUIComponent =
      ((nodeId, cubemapTexture, className), send, engineState) =>
    <div
      className
      key={DomHelper.getRandomKey()}
      onClick={_e => send(SetCubemapTextureToSceneSkybox(cubemapTexture))}>
      <img src="./public/img/cubemap.png" className="imgContent-img" />
      <div className="imgContent-text">
        {
          DomHelper.textEl(
            NodeNameAssetLogicService.getCubemapNodeName(
              ~texture=cubemapTexture,
              ~engineState,
            ),
          )
        }
      </div>
    </div>;

  let showCubemapAssets = (state, send) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    CubemapNodeAssetEditorService.findAllCubemapNodes(editorState)
    |> _sortByName(engineState)
    |> Js.Array.map(cubemapNode => {
         let {textureComponent} =
           CubemapNodeAssetService.getNodeData(cubemapNode);
         let nodeId = NodeAssetService.getNodeId(~node=cubemapNode);

         switch (SceneEngineService.getCubemapTexture(engineState)) {
         | None =>
           _buildCubemapUIComponent(
             (nodeId, textureComponent, "select-item-imgContent"),
             send,
             engineState,
           )
         | Some(sceneSkyboxCubemapTexture) =>
           let className =
             sceneSkyboxCubemapTexture === textureComponent ?
               "select-item-imgContent select-item-active" :
               "select-item-imgContent";

           _buildCubemapUIComponent(
             (nodeId, textureComponent, className),
             send,
             engineState,
           );
         };
       });
  };

  let setCubemapTextureToSceneSkybox = SettingSceneModalSkyboxSetCubemapTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("SettingSceneModal");

let reducer = ((uiState, dispatchFunc), action, state) =>
  switch (action) {
  | ShowCubemapGroup =>
    ReasonReact.Update({...state, isShowCubemapGroup: true})
  | HideCubemapGroup =>
    ReasonReact.Update({...state, isShowCubemapGroup: false})
  | SetCubemapTextureToSceneSkybox(cubemapTexture) =>
    ReasonReactUtils.updateWithSideEffects(
      {...state, isShowCubemapGroup: false}, _state =>
      Method.setCubemapTextureToSceneSkybox(
        (uiState, dispatchFunc),
        (),
        cubemapTexture,
      )
    )
  };

let _renderCubemapGroup = (state, send) =>
  <div className="select-component-content">
    <div className="select-component-item">
      <div className="select-item-header">
        {DomHelper.textEl("Cubemap")}
      </div>
      <div className="select-item-imgBody">
        <div className="imgBody-content">
          {ReasonReact.array(Method.showCubemapAssets(state, send))}
        </div>
      </div>
    </div>
    <div
      className="select-component-bg"
      onClick={_e => send(HideCubemapGroup)}
    />
  </div>;

let render =
    (
      (uiState, dispatchFunc),
      title,
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
      {Method.renderContent((uiState, dispatchFunc), send, languageType)}
      {
        state.isShowCubemapGroup ?
          _renderCubemapGroup(state, send) : ReasonReact.null
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
  initialState: () => {isShowCubemapGroup: isShowCubemapGroup},
  reducer: reducer((uiState, dispatchFunc)),
  render: self => render((uiState, dispatchFunc), title, closeFunc, self),
};