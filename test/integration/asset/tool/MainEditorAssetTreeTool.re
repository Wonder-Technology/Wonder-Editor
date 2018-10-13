let _increaseIndex = editorState => {
  let editorState = AssetIndexEditorService.increaseIndex(editorState);
  let index = editorState |> AssetIndexEditorService.getIndex;
  (index, editorState);
};

module BuildAssetTree = {
  let buildEmptyAssetTree = () => {
    let (rootId, editorState) =
      StateEditorService.getState() |> _increaseIndex;
    let engineState = StateEngineService.unsafeGetState();

    editorState
    |> AssetTreeRootEditorService.setAssetTreeRoot({
         nodeId: rootId,
         type_: Folder,
         children: [||],
       })
    |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
         rootId,
         None,
         _,
         engineState,
       )
    |> StateEditorService.setState
    |> ignore;

    rootId;
  };

  module Texture = {
    type assetTreeData = {
      root: int,
      textureNodeIdArr: array(int),
    };

    let buildOneTextureAssetTree = () => {
      let (rootId, editorState) =
        StateEditorService.getState() |> _increaseIndex;
      let engineState = StateEngineService.unsafeGetState();

      let (id1, editorState) = editorState |> _increaseIndex;

      editorState
      |> AssetTreeRootEditorService.setAssetTreeRoot({
           nodeId: rootId,
           type_: Folder,
           children: [||],
         })
      |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
           rootId,
           None,
           _,
           engineState,
         )
      |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
           id1,
           rootId |. Some,
           _,
           engineState,
         )
      |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
           id1,
           rootId,
           "texture1",
         )
      |> AssetTreeRootEditorService.setAssetTreeRoot({
           nodeId: rootId,
           type_: Folder,
           children: [|{nodeId: id1, type_: Texture, children: [||]}|],
         })
      |> StateEditorService.setState
      |> ignore;

      {root: rootId, textureNodeIdArr: [|id1|]};
    };

    let buildTwoTextureAssetTree = () => {
      let (rootId, editorState) =
        StateEditorService.getState() |> _increaseIndex;
      let engineState = StateEngineService.unsafeGetState();

      let (id1, editorState) = editorState |> _increaseIndex;
      let (id2, editorState) = editorState |> _increaseIndex;

      editorState
      |> AssetTreeRootEditorService.setAssetTreeRoot({
           nodeId: rootId,
           type_: Folder,
           children: [||],
         })
      |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
           id1,
           rootId,
           "texture1",
         )
      |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
           id2,
           rootId,
           "texture2",
         )
      |> AssetTreeRootEditorService.setAssetTreeRoot({
           nodeId: rootId,
           type_: Folder,
           children: [|
             {nodeId: id1, type_: Texture, children: [||]},
             {nodeId: id2, type_: Texture, children: [||]},
           |],
         })
      |> StateEditorService.setState
      |> ignore;

      {root: rootId, textureNodeIdArr: [|id1, id2|]};
    };

    let getFirstTextureNodeId = ({root, textureNodeIdArr}) =>
      textureNodeIdArr |> ArrayService.unsafeGetFirst;

    let getSecondTextureNodeId = ({root, textureNodeIdArr}) =>
      textureNodeIdArr |> ArrayService.unsafeGetNth(1);
  };

  module Folder = {
    type layerData = {folderNodeIdArr: array(int)};

    module TwoLayer = {
      type assetTreeData = {
        root: int,
        folderNodeIdArr: array(int),
      };

      let buildOneFolderAssetTree = () => {
        let (rootId, editorState) =
          StateEditorService.getState() |> _increaseIndex;
        let engineState = StateEngineService.unsafeGetState();

        let (id1, editorState) = editorState |> _increaseIndex;

        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [||],
           })
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             rootId,
             None,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id1,
             rootId |. Some,
             _,
             engineState,
           )
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [|{nodeId: id1, type_: Folder, children: [||]}|],
           })
        |> StateEditorService.setState
        |> ignore;

        {root: rootId, folderNodeIdArr: [|id1|]};
      };

      let buildTwoFolderAssetTree = () => {
        let (rootId, editorState) =
          StateEditorService.getState() |> _increaseIndex;
        let engineState = StateEngineService.unsafeGetState();

        let (id1, editorState) = editorState |> _increaseIndex;
        let (id2, editorState) = editorState |> _increaseIndex;

        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [||],
           })
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             rootId,
             None,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id1,
             rootId |. Some,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id2,
             rootId |. Some,
             _,
             engineState,
           )
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [|
               {nodeId: id1, type_: Folder, children: [||]},
               {nodeId: id2, type_: Folder, children: [||]},
             |],
           })
        |> StateEditorService.setState
        |> ignore;

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
        let (rootId, editorState) =
          StateEditorService.getState() |> _increaseIndex;
        let engineState = StateEngineService.unsafeGetState();

        let (id1, editorState) = editorState |> _increaseIndex;
        let (id2, editorState) = editorState |> _increaseIndex;
        let (id3, editorState) = editorState |> _increaseIndex;
        let (id4, editorState) = editorState |> _increaseIndex;

        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [||],
           })
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             rootId,
             None,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id1,
             rootId |. Some,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id2,
             rootId |. Some,
             _,
             engineState,
           )
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [|
               {nodeId: id1, type_: Folder, children: [||]},
               {nodeId: id2, type_: Folder, children: [||]},
             |],
           })
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id3,
             id2 |. Some,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id4,
             id2 |. Some,
             _,
             engineState,
           )
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [|
               {nodeId: id1, type_: Folder, children: [||]},
               {
                 nodeId: id2,
                 type_: Folder,
                 children: [|
                   {nodeId: id3, type_: Folder, children: [||]},
                   {nodeId: id4, type_: Folder, children: [||]},
                 |],
               },
             |],
           })
        |> StateEditorService.setState
        |> ignore;

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

      let buildFolderAndTextureAssetTree = () => {
        let (rootId, editorState) =
          StateEditorService.getState() |> _increaseIndex;
        let engineState = StateEngineService.unsafeGetState();

        let (id1, editorState) = editorState |> _increaseIndex;
        let (id2, editorState) = editorState |> _increaseIndex;
        let (id3, editorState) = editorState |> _increaseIndex;
        let (id4, editorState) = editorState |> _increaseIndex;
        let (id5, editorState) = editorState |> _increaseIndex;

        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [||],
           })
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             rootId,
             None,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id1,
             rootId |. Some,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id2,
             rootId |. Some,
             _,
             engineState,
           )
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [|
               {nodeId: id1, type_: Folder, children: [||]},
               {nodeId: id2, type_: Folder, children: [||]},
             |],
           })
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id3,
             id2 |. Some,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
             id4,
             id2 |. Some,
             _,
             engineState,
           )
        |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
             id5,
             id2,
             "texture5",
           )
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             nodeId: rootId,
             type_: Folder,
             children: [|
               {nodeId: id1, type_: Folder, children: [||]},
               {
                 nodeId: id2,
                 type_: Folder,
                 children: [|
                   {nodeId: id3, type_: Folder, children: [||]},
                   {nodeId: id4, type_: Folder, children: [||]},
                   {nodeId: id5, type_: Texture, children: [||]},
                 |],
               },
             |],
           })
        |> StateEditorService.setState
        |> ignore;

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
  let selectNode =
      (~nodeType, ~nodeId, ~dispatchFunc=TestTool.getDispatch(), ()) =>
    AssetTreeUtils.onSelect(dispatchFunc, nodeType, nodeId);

  let selectTextureNode = (~nodeId, ~dispatchFunc=TestTool.getDispatch(), ()) =>
    selectNode(~nodeType=AssetNodeType.Texture, ~nodeId, ~dispatchFunc, ());

  let selectFolderNode = (~nodeId, ~dispatchFunc=TestTool.getDispatch(), ()) =>
    selectNode(~nodeType=AssetNodeType.Folder, ~nodeId, ~dispatchFunc, ());
};

module Drag = {
  let handleDragStart =
      (
        ~folderNodeId,
        ~widget=AssetUtils.getWidget(),
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        (),
      ) =>
    DragEventUtils.handleDragStart(folderNodeId, widget, dragImg, event);

  let handleDragEnter =
      (
        ~folderNodeId,
        ~handleWidgetFunc=AssetUtils.isWidget,
        ~handleRelationErrorFunc=AssetUtils.isTreeNodeRelationError,
        ~event=BaseEventTool.buildDragEvent(.),
        (),
      ) =>
    DragEventUtils.handleDragEnter(
      folderNodeId,
      handleWidgetFunc,
      handleRelationErrorFunc,
      event,
    );

  let handleDrop =
      (
        ~folderNodeId,
        ~handleWidgetFunc=AssetUtils.isWidget,
        ~handleRelationErrorFunc=AssetUtils.isTreeNodeRelationError,
        ~event=BaseEventTool.buildDragEvent(.),
        (),
      ) =>
    DragEventUtils.handleDrop(
      folderNodeId,
      handleWidgetFunc,
      handleRelationErrorFunc,
      event,
    );

  let handleDragEnd = (~event=BaseEventTool.buildDragEvent(.), ()) =>
    DragEventUtils.handleDrageEnd(event);

  let dragAssetTreeNode = (startNodeId, targetNodeId) => {
    let event = BaseEventTool.buildDragEvent(.);

    handleDragStart(~folderNodeId=startNodeId, ~event, ());
    handleDragEnter(~folderNodeId=targetNodeId, ~event, ());
    handleDrop(~folderNodeId=targetNodeId, ~event, ());
    handleDragEnd(~event, ());
  };

  let dragAssetChildrenNodeIntoAssetTreeNode =
      (startAssetChildrenNodeId, targetAssetTreeNodeId) => {
    let event = BaseEventTool.buildDragEvent(.);

    handleDragStart(~folderNodeId=startAssetChildrenNodeId, ~event, ());
    handleDragEnter(~folderNodeId=targetAssetTreeNodeId, ~event, ());
    handleDrop(~folderNodeId=targetAssetTreeNodeId, ~event, ());
    handleDragEnd(~event, ());
  };
};