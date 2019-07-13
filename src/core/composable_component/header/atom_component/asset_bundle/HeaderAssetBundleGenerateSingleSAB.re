module Method = {
  let generateSingleSAB = ((editorState, engineState)) =>
    GenerateAssetBundleEngineService.generateSingleSAB(
      SceneEngineService.getSceneGameObject(engineState),
      Uint8ArrayAssetEditorService.buildBasicSourceTextureImageUint8ArrayMap(editorState),
      /* TODO fix? */
      false,
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
    inputText="name"
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