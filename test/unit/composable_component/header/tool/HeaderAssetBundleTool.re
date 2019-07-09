open HeaderAssetBundleType;

module GenerateSingleRAB = {
  let buildSelectTreeForGenerateSingleRAB = HeaderAssetBundle.Method.buildSelectTreeForGenerateSingleRAB;

  let buildGenerateSingleRABModal =
      (
        ~selectTree,
        ~send,
        ~languageType=LanguageEditorService.unsafeGetType
                      |> StateLogicService.getEditorState,
        (),
      ) =>
    HeaderAssetBundleGenerateSingleRAB.Method.renderGenerateSingleRABModal(
      languageType,
      selectTree,
      send,
      (() => (), () => ()),
    );

  let generateSingleRABResourceData = HeaderAssetBundleGenerateSingleRAB.Method._generateSingleRABResourceData;

  let generateSingleRAB =
      (
        ~selectTree,
        ~editorState=StateEditorService.getState(),
        ~engineState=StateEngineService.unsafeGetState(),
        (),
      ) => {
    let (
      basicMaterials,
      lightMaterials,
      basicSourceTextures,
      cubemapTextures,
      geometrys,
      scriptEventFunctionDataArr,
      scriptAttributeDataArr,
      imageDataMap,
    ) =
      generateSingleRABResourceData(selectTree, (editorState, engineState));

    GenerateAssetBundleEngineService.generateSingleRAB(
      GenerateAssetBundleEngineService.buildResourceData(
        basicMaterials,
        lightMaterials,
        basicSourceTextures,
        cubemapTextures,
        geometrys,
        scriptEventFunctionDataArr,
        scriptAttributeDataArr,
        imageDataMap,
      ),
      engineState,
    );
  };

  let buildTextureData =
      (textureComponent, imageDataIndex): basicSourceTextureData => {
    textureComponent,
    imageDataIndex,
  };

  let buildWDBGeometryFolderName = HeaderAssetBundle.Method._buildWDBGeometryFolderName;
};

module GenerateSingleSAB = {
  let generateSingleSAB =
      (
        ~editorState=StateEditorService.getState(),
        ~engineState=StateEngineService.unsafeGetState(),
        (),
      ) =>
    HeaderAssetBundleGenerateSingleSAB.Method.generateSingleSAB((
      editorState,
      engineState,
    ));
};

module GenerateAllAB = {
  let buildSelectTreeForGenerateAllAB = HeaderAssetBundle.Method.buildSelectTreeForGenerateAllAB;

  let buildGenerateAllABModal =
      (
        ~selectTree,
        ~send,
        ~nameInputValue="WonderAllAB",
        ~dependencyRelationInputValue=HeaderAssetBundleGenerateAllAB.Method.buildDefaultDependencyRelationInputValue(),
        ~languageType=LanguageEditorService.unsafeGetType
                      |> StateLogicService.getEditorState,
        (),
      ) =>
    HeaderAssetBundleGenerateAllAB.Method.renderGenerateAllABModal(
      (
        {
          selectTreeForGenerateAllAB: selectTree,
          nameInputValue,
          dependencyRelationInputValue,
        }: HeaderAssetBundleGenerateAllAB.state,
        send,
      ),
      languageType,
      (() => (), () => ()),
    );

  let generateAllABZip =
      (
        ~selectTree,
        ~createZipFunc,
        ~editorState=StateEditorService.getState(),
        ~engineState=StateEngineService.unsafeGetState(),
        ~nameInputValue="WonderAllAB",
        ~dependencyRelationInputValue=HeaderAssetBundleGenerateAllAB.Method.buildDefaultDependencyRelationInputValue(),
        (),
      ) =>
    HeaderAssetBundleGenerateAllAB.Method.generateAllABZip(
      selectTree,
      (nameInputValue, dependencyRelationInputValue),
      createZipFunc,
      (editorState, engineState),
    );

  let prepareDigest = [%raw
    sandbox => {|
var digestStub = sandbox.stub();

digestStub.returns(
new Promise((resolve, reject) => {
resolve(new ArrayBuffer())
})
);


       window.crypto = {
subtle: {
digest: digestStub
}
       } ;

return digestStub;
        |}
  ];
};