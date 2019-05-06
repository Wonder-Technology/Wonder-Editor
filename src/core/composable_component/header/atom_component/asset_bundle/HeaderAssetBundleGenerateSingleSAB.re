module Method = {
  let generateSingleSAB = ((editorState, engineState)) =>
    GenerateAssetBundleEngineService.generateSingleSAB(
      SceneEngineService.getSceneGameObject(engineState),
      Uint8ArrayAssetEditorService.buildImageUint8ArrayMap(editorState),
      engineState,
    );
};

let component =
  ReasonReact.statelessComponent("HeaderAssetBundleGenerateSingleSAB");

let render =
    ({state, send}: ReasonReact.self('a, 'b, 'c), (closeFunc, submitFunc)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <SingleInputModal
    title={
      LanguageUtils.getHeaderLanguageDataByType(
        "generate-single-sab",
        languageType,
      )
    }
    defaultValue="WonderSingleSAB"
    closeFunc={() => closeFunc()}
    submitFunc={
      baseName => {
        Method.generateSingleSAB
        |> StateLogicService.getStateToGetData
        |> HeaderAssetBundleUtils.downloadAB({j|$(baseName).sab|j});

        submitFunc();
      }
    }
  />;
};

let make = (~closeFunc, ~submitFunc, _children) => {
  ...component,
  render: self => render(self, (closeFunc, submitFunc)),
};