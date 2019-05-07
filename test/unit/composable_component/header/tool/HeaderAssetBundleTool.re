open HeaderAssetBundleType;

let filter =
    (
      ~tree,
      ~acc,
      ~pushNodeFunc,
      ~predValueNodeFunc=node => false,
      ~predFolderNodeFunc=node => false,
      (),
    )
    : 'r => {
  let _nodeFunc = (acc, node, predNodeFunc) =>
    predNodeFunc(node) ? pushNodeFunc(node, acc) : acc;
  let _valueNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      ValueNodeSelectTreeService.buildNodeByNodeData(~nodeId, ~nodeData),
      predValueNodeFunc,
    );
  let _folderNodeFunc = (acc, nodeId, nodeData, children) =>
    _nodeFunc(
      acc,
      FolderNodeSelectTreeService.buildNodeByNodeData(
        ~nodeId,
        ~nodeData,
        ~children,
      ),
      predFolderNodeFunc,
    );

  IterateTreeSelectTreeService.fold(
    ~acc,
    ~tree,
    ~valueNodeFunc=_valueNodeFunc,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
};

let find =
    (
      ~tree,
      ~predValueNodeFunc=node => false,
      ~predFolderNodeFunc=node => false,
      (),
    )
    : 'r =>
  switch (
    filter(
      ~acc=[],
      ~pushNodeFunc=(node, acc) => [node, ...acc],
      ~tree,
      ~predValueNodeFunc,
      ~predFolderNodeFunc,
      (),
    )
  ) {
  | list when List.length(list) === 0 => None
  | list => Some(list)
  };

let findOne =
    (
      ~tree,
      ~predValueNodeFunc=node => false,
      ~predFolderNodeFunc=node => false,
      (),
    )
    : 'r =>
  find(~tree, ~predValueNodeFunc, ~predFolderNodeFunc, ())
  |> Js.Option.map((. list) => list |> List.hd);

let findNodeByName = (targetNodeName, tree) => {
  let predNodeFunc = node =>
    NodeSelectTreeService.getNodeName(node) === targetNodeName;

  findOne(
    ~tree,
    ~predValueNodeFunc=predNodeFunc,
    ~predFolderNodeFunc=predNodeFunc,
    (),
  );
};

let setSelectForSelectTree = (isSelect, nodeName, tree) =>
  HeaderAssetBundleGenerateSingleRAB.Method._setSelectForSelectTree(
    tree,
    isSelect,
    findNodeByName(nodeName, tree) |> OptionService.unsafeGet,
  );

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
      textures,
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
        textures,
        geometrys,
        scriptEventFunctionDataArr,
        scriptAttributeDataArr,
        imageDataMap,
      ),
      engineState,
    );
  };

  let buildTextureData = (textureComponent, imageDataIndex): textureData => {
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
      nameInputValue,
      dependencyRelationInputValue,
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