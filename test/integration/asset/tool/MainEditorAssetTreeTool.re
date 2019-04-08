let findNodeByName = OperateTreeAssetLogicService.findNodeByName;

let findNodeIdByName = OperateTreeAssetLogicService.findNodeIdByName;

let findNodesByName = OperateTreeAssetLogicService.findNodesByName;

let findNodeIdsByName = OperateTreeAssetLogicService.findNodeIdsByName;

let findNodeParent = OperateTreeAssetEditorService.findNodeParent;

let findNodeParentId = OperateTreeAssetEditorService.findNodeParentId;

let getRootNodeId = editorState =>
  RootTreeAssetEditorService.getRootNode(editorState)
  |> NodeAssetService.getNodeId(~node=_);

module BuildAssetTree = {
  let _buildRootNode = rootNodeId =>
    FolderNodeAssetService.buildNode(
      ~nodeId=rootNodeId,
      ~name=RootTreeAssetService.getAssetTreeRootName(),
      (),
    );

  let buildEmptyAssetTree = () => {
    let editorState = StateEditorService.getState();

    let editorState = TreeAssetEditorService.createTree(editorState);

    editorState |> StateEditorService.setState |> ignore;

    RootTreeAssetEditorService.getRootNode(editorState)
    |> NodeAssetService.getNodeId(~node=_);
  };

  module Texture = {
    type assetTreeData = {
      root: int,
      textureNodeIdArr: array(int),
    };

    let buildOneTextureAssetTree = () => {
      let rootId = buildEmptyAssetTree();

      let editorState = StateEditorService.getState();
      let engineState = StateEngineService.unsafeGetState();

      let (editorState, id1) =
        IdAssetEditorService.generateNodeId(editorState);

      (editorState, engineState)
      |> MainEditorAssetTreeNodeTool.insertTextureNode(
           id1,
           rootId,
           "texture1",
         )
      |> StateLogicService.setState;

      {root: rootId, textureNodeIdArr: [|id1|]};
    };

    let buildTwoTextureAssetTree = () => {
      let rootId = buildEmptyAssetTree();

      let editorState = StateEditorService.getState();
      let engineState = StateEngineService.unsafeGetState();

      let (editorState, id1) =
        IdAssetEditorService.generateNodeId(editorState);
      let (editorState, id2) =
        IdAssetEditorService.generateNodeId(editorState);

      (editorState, engineState)
      |> MainEditorAssetTreeNodeTool.insertTextureNode(
           id1,
           rootId,
           "texture1",
         )
      |> MainEditorAssetTreeNodeTool.insertTextureNode(
           id2,
           rootId,
           "texture2",
         )
      |> StateLogicService.setState;

      {root: rootId, textureNodeIdArr: [|id1, id2|]};
    };

    let getFirstTextureNodeId = ({root, textureNodeIdArr}) =>
      textureNodeIdArr |> ArrayService.unsafeGetFirst;

    let getSecondTextureNodeId = ({root, textureNodeIdArr}) =>
      textureNodeIdArr |> ArrayService.unsafeGetNth(1);
  };

  module Material = {
    type assetTreeData = {
      root: int,
      materialNodeIdArr: array(int),
    };

    let buildOneMaterialAssetTree = () => {
      let rootId = buildEmptyAssetTree();

      let editorState = StateEditorService.getState();
      let engineState = StateEngineService.unsafeGetState();

      let (editorState, id1) =
        IdAssetEditorService.generateNodeId(editorState);

      let (newMaterial, engineState) =
        LightMaterialEngineService.createLightMaterialAndSetName(
          "material1",
          engineState,
        );

      (editorState, engineState)
      |> MainEditorAssetTreeNodeTool.insertMaterialNode(
           id1,
           rootId,
           newMaterial,
         )
      |> StateLogicService.setState;

      {root: rootId, materialNodeIdArr: [|id1|]};
    };

    let getRootNodeId = ({root}) => root;

    let getFirstMaterialNodeId = ({root, materialNodeIdArr}) =>
      materialNodeIdArr |> ArrayService.unsafeGetFirst;
    /* let getSecondMaterialNodeId = ({root, materialNodeIdArr}) =>
       materialNodeIdArr |> ArrayService.unsafeGetNth(1); */
  };

  module ScriptEventFunction = {
    type assetTreeData = {
      root: int,
      scriptEventFunctionNodeIdArr: array(int),
    };

    let buildOneScriptEventFunctionAssetTree = () => {
      let rootId = buildEmptyAssetTree();

      let id1 = MainEditorAssetIdTool.getNewAssetId();
      MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

      {root: rootId, scriptEventFunctionNodeIdArr: [|id1|]};
    };

    let getRootNodeId = ({root}) => root;

    let getFirstScriptEventFunctionNodeId =
        ({root, scriptEventFunctionNodeIdArr}) =>
      scriptEventFunctionNodeIdArr |> ArrayService.unsafeGetFirst;
  };

  module ScriptAttribute = {
    type assetTreeData = {
      root: int,
      scriptAttributeNodeIdArr: array(int),
    };

    let buildOneScriptAttributeAssetTree = () => {
      let rootId = buildEmptyAssetTree();

      let id1 = MainEditorAssetIdTool.getNewAssetId();
      MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

      {root: rootId, scriptAttributeNodeIdArr: [|id1|]};
    };

    let getRootNodeId = ({root}) => root;

    let getFirstScriptAttributeNodeId = ({root, scriptAttributeNodeIdArr}) =>
      scriptAttributeNodeIdArr |> ArrayService.unsafeGetFirst;
  };

  module WDB = {
    type assetTreeData = {
      root: int,
      wdbNodeIdArr: array(int),
    };

    let buildOneWDBAssetTree = () => {
      let rootId = buildEmptyAssetTree();

      let editorState = StateEditorService.getState();
      let engineState = StateEngineService.unsafeGetState();

      let (editorState, id1) =
        IdAssetEditorService.generateNodeId(editorState);

      let (engineState, gameObject) =
        GameObjectEngineService.create(engineState);
      let name = "gameObject1";

      (editorState, engineState)
      |> MainEditorAssetTreeNodeTool.insertWDBNode(
           id1,
           rootId,
           gameObject,
           name,
         )
      |> StateLogicService.setState;

      {root: rootId, wdbNodeIdArr: [|id1|]};
    };

    let getRootNodeId = ({root}) => root;

    let getFirstWDBNodeId = ({root, wdbNodeIdArr}) =>
      wdbNodeIdArr |> ArrayService.unsafeGetFirst;
  };

  module Folder = {
    type layerData = {folderNodeIdArr: array(int)};

    module TwoLayer = {
      type assetTreeData = {
        root: int,
        folderNodeIdArr: array(int),
      };

      let buildOneFolderAssetTree = () => {
        let rootId = buildEmptyAssetTree();

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let (editorState, id1) =
          IdAssetEditorService.generateNodeId(editorState);

        (editorState, engineState)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id1, rootId)
        |> StateLogicService.setState;

        {root: rootId, folderNodeIdArr: [|id1|]};
      };

      let buildTwoFolderAssetTree = () => {
        let rootId = buildEmptyAssetTree();

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let (editorState, id1) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id2) =
          IdAssetEditorService.generateNodeId(editorState);

        (editorState, engineState)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id1, rootId)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id2, rootId)
        |> StateLogicService.setState;

        {root: rootId, folderNodeIdArr: [|id1, id2|]};
      };

      let getRootNodeId = ({root}) => root;

      let getFirstFolderNodeId = ({root, folderNodeIdArr}) =>
        folderNodeIdArr |> ArrayService.unsafeGetFirst;

      let getSecondFolderNodeId = ({root, folderNodeIdArr}) =>
        folderNodeIdArr |> ArrayService.unsafeGetNth(1);
    };

    module ThreeLayer = {
      type assetTreeData = {
        root: int,
        secondLayer: layerData,
        thirdLayer: layerData,
      };

      let buildFourFolderAssetTree = () => {
        let rootId = buildEmptyAssetTree();

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let (editorState, id1) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id2) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id3) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id4) =
          IdAssetEditorService.generateNodeId(editorState);

        (editorState, engineState)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id1, rootId)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id2, rootId)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id3, id2)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id4, id2)
        |> StateLogicService.setState;

        {
          root: rootId,
          secondLayer: {
            folderNodeIdArr: [|id1, id2|],
          },
          thirdLayer: {
            folderNodeIdArr: [|id3, id4|],
          },
        };
      };

      let getRootNodeId = ({root}) => root;

      let getSecondLayerFirstFolderNodeId = ({secondLayer}) =>
        secondLayer.folderNodeIdArr |> ArrayService.unsafeGetNth(0);

      let getSecondLayerSecondFolderNodeId = ({secondLayer}) =>
        secondLayer.folderNodeIdArr |> ArrayService.unsafeGetNth(1);

      let getThirdLayerFirstFolderNodeId = ({thirdLayer}) =>
        thirdLayer.folderNodeIdArr |> ArrayService.unsafeGetNth(0);
    };
  };

  module All = {
    type layerData = {
      textureNodeIdArr: array(int),
      folderNodeIdArr: array(int),
    };

    module ThreeLayer = {
      type assetTreeData = {
        root: int,
        secondLayer: layerData,
        thirdLayer: layerData,
      };

      let buildFolderAndTextureAndMaterialAssetTree = () => {
        let rootId = buildEmptyAssetTree();

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let (editorState, id1) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id2) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id3) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id4) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id5) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id6) =
          IdAssetEditorService.generateNodeId(editorState);
        let (editorState, id7) =
          IdAssetEditorService.generateNodeId(editorState);

        let (newMaterial1, engineState) =
          LightMaterialEngineService.createLightMaterialAndSetName(
            "material1",
            engineState,
          );
        let (newMaterial2, engineState) =
          LightMaterialEngineService.createLightMaterialAndSetName(
            "material2",
            engineState,
          );

        (editorState, engineState)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id1, rootId)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id2, rootId)
        |> MainEditorAssetTreeNodeTool.insertMaterialNode(
             id6,
             id1,
             newMaterial1,
           )
        |> MainEditorAssetTreeNodeTool.insertMaterialNode(
             id7,
             id2,
             newMaterial2,
           )
        |> MainEditorAssetTreeNodeTool.insertTextureNode(
             id5,
             id2,
             "texture5",
           )
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id3, id2)
        |> MainEditorAssetTreeNodeTool.insertFolderNode(id4, id2)
        |> StateLogicService.setState;

        {
          root: rootId,
          secondLayer: {
            textureNodeIdArr: [||],
            folderNodeIdArr: [|id1, id2|],
          },
          thirdLayer: {
            textureNodeIdArr: [|id5|],
            folderNodeIdArr: [|id3, id4|],
          },
        };
      };

      let getRootNodeId = ({root}) => root;

      let getSecondLayerFirstFolderNodeId = ({secondLayer}) =>
        secondLayer.folderNodeIdArr |> ArrayService.unsafeGetNth(0);

      let getSecondLayerSecondFolderNodeId = ({secondLayer}) =>
        secondLayer.folderNodeIdArr |> ArrayService.unsafeGetNth(1);

      let getThirdLayerFirstFolderNodeId = ({thirdLayer}) =>
        thirdLayer.folderNodeIdArr |> ArrayService.unsafeGetNth(0);

      let getThirdLayerFirstTextureNodeId = ({thirdLayer}) =>
        thirdLayer.textureNodeIdArr |> ArrayService.unsafeGetNth(0);
    };
  };
};

module Select = {
  let selectNode = (~nodeId, ~dispatchFunc=TestTool.getDispatch(), ()) =>
    FolderNodeUtils.enterFolder(dispatchFunc, nodeId);

  let selectFolderNode = (~nodeId, ~dispatchFunc=TestTool.getDispatch(), ()) =>
    selectNode(~nodeId, ~dispatchFunc, ());
};

module Drag = {
  let dragAssetTreeNode =
      (
        ~startNodeId,
        ~targetNodeId,
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        (),
      ) =>
    AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
      (uiState, dispatchFunc),
      (),
      (targetNodeId, startNodeId),
    );

  let dragAssetChildrenNodeIntoAssetTreeNode =
      (
        ~startNodeId,
        ~targetNodeId,
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        (),
      ) =>
    AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
      (uiState, dispatchFunc),
      (),
      (targetNodeId, startNodeId),
    );
};