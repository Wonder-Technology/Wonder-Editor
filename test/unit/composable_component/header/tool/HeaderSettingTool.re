module Scene = {
  module Ambient = {
    let getColor = () => SettingSceneModal.Method._getAmbientLightColor();

    let changeColor = color =>
      SettingSceneModal.Method._changeAmbientLightColor(color);

    let closeColorPicker =
        (
          ~color,
          ~dispatchFunc=_ => (),
          ~uiState=TestTool.buildEmptyAppState(),
          (),
        ) =>
      SettingSceneModal.Method._closeAmbientLightColorPick(
        (uiState, dispatchFunc),
        (),
        color,
      );
  };

  module Skybox = {
    let setCubemapTextureToSceneSkybox = cubemapTexture =>
      SettingSceneModal.Method.setCubemapTextureToSceneSkybox(
        (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
        (),
        cubemapTexture,
      );

    let removeCubemap = () =>
      SettingSceneModal.Method.removeCubemap(
        (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
        (),
        (),
      );
  };
};

module UI = {
  let buildSetting =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~isSettingNav=false,
        ~isShowSceneModal=false,
        ~toggleShowNavFunc=() => (),
        ~hoverNavFunc=() => (),
        (),
      ) =>
    ReactTestRenderer.create(
      <HeaderSetting
        uiState
        dispatchFunc
        isSettingNav
        isShowSceneModal
        toggleShowNavFunc
        hoverNavFunc
      />,
    );

  let buildSettingSceneModal =
      (
        ~title="SettingSceneModal",
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~isShowCubemapGroup=false,
        ~closeFunc=() => (),
        (),
      ) =>
    ReactTestRenderer.create(
      <SettingSceneModal
        title
        uiState
        dispatchFunc
        isShowCubemapGroup
        closeFunc
      />,
    );
};