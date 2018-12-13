module AssetTree = {
  /* type wrong =
       | SameNode
       /* | Warn(list(string))
          | Fatal(string); */
       | SameName(string);
     | Fatal(string); */

  /* type relationResult =
     | Success
     | FailAndDoNothing
     | FailAndWarn(list(string))
     | FailAndFatal(string); */

  module UIState = {
    type t('children) =
      | Show('children)
      | Hide('children);

    type changeState =
      | NotChange
      | ChangeToShow
      | ChangeToHide;

    let get = uiState =>
      switch (uiState) {
      | Show(children) => children
      | Hide(children) => children
      };

    let map = (func, uiState) =>
      switch (uiState) {
      | Show(children) => Show(children |> func)
      | Hide(children) => Hide(children |> func)
      };

    let mapChildren = (seqMapFunc, func, uiState) =>
      map(seqMapFunc(func), uiState);

    let build = (~children=[||], ~isShowChildren=true, ()) =>
      isShowChildren ? Show(children) : Hide(children);

    let buildByChangeStateType = (changeStateType, children) =>
      switch (changeStateType) {
      | NotChange => children
      | ChangeToShow => get(children) |. Show
      | ChangeToHide => get(children) |. Hide
      };

    let getIsShowChildrenByState = uiState =>
      switch (uiState) {
      | Show(_) => true
      | Hide(_) => false
      };

    /* _handle(seqMapFunc(func)); */

    /* switch (uiState) {
       | Show(children) => Show(children |> seqMapFunc(func))
       | Hide(children) => Hide(children |> seqMapFunc(func))
       }; */

    let fold = (seqFoldFunc, func, acc, uiState) =>
      switch (uiState) {
      | Show(children)
      | Hide(children) =>
        seqFoldFunc((. acc, children) => func(acc, children), acc, children)
      };
  };

  type nodeId = int;

  type wdbNodeSpecificData = {
    name: string,
    /* parentFolderNodeId: option(nodeId), */
    wdbGameObject: int,
  };

  /* type wdbNodeData = nodeData(a) ; */
  type wdbNodeData = (nodeId, wdbNodeSpecificData);

  type folderNodeSpecificData = {name: string};

  type folderNodeData = (nodeId, folderNodeSpecificData);

  type tree =
    | WDBNode(wdbNodeData)
    | FolderNode(folderNodeData, UIState.t(array(tree)));

  type relationResult =
    | Success
    | Fail(string);

  /* type handleTreeResult('tree) =
     | Success('tree)
     | Fail((string, 'tree)); */

  module HandleTreeResult = {
    type t =
      | Success(tree)
      | Fail((string, tree));

    let getTree = result =>
      switch (result) {
      | Success(tree) => tree
      | Fail((_, tree)) => tree
      };

    let isFail = result =>
      switch (result) {
      | Fail(_) => true
      | Success(_) => false
      };
  };

  let buildFolderNode = (nodeId, name, children) =>
    FolderNode((nodeId, {name: name}), children);

  let buildFolderNodeByNodeData = (children, nodeData) =>
    FolderNode(nodeData, children);

  let buildWDBNode = (nodeId, name, wdbGameObject) =>
    WDBNode((nodeId, {name, wdbGameObject}));

  let buildWDBNodeByNodeData = nodeData => WDBNode(nodeData);

  let _buildNodeData = (nodeId, nodeSpecificData) => (
    nodeId,
    nodeSpecificData,
  );

  let _getNodeId = ((nodeId, _)) => nodeId;

  let _getSpecificNodeData = ((_, specificNodeData)) => specificNodeData;

  let getWDBNodeData = wdbNode =>
    switch (wdbNode) {
    | WDBNode(nodeData) => nodeData
    | _ =>
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          ~description={j|should be wdb node|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    };

  let getFolderNodeData = folderNode =>
    switch (folderNode) {
    | FolderNode(nodeData, _children) => nodeData
    | _ =>
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          ~description={j|should be folder node|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    };

  let getWDBNodeId = wdbNode => getWDBNodeData(wdbNode) |> _getNodeId;

  let getFolderNodeId = folderNode =>
    getFolderNodeData(folderNode) |> _getNodeId;

  let isFolderNode = node =>
    switch (node) {
    | FolderNode(_) => true
    | _ => false
    };

  let getFolderChildren = folderNode =>
    switch (folderNode) {
    | FolderNode(_, children) => children
    | _ =>
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          ~description={j|should be folder node|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    };

  /* let renameWDB = (name, wdbNode) => {
       let (nodeId, data) = getWDBNodeData(wdbNode);

       buildWDBNodeByNodeData((nodeId, {...data, name}: wdbNodeSpecificData));
     };

     let renameFolder = (name, folderNode) => {
       let (nodeId, data) = getFolderNodeData(folderNode);

       buildFolderNodeByNodeData(
         (nodeId, {...data, name}: folderNodeSpecificData),
         getFolderChildren(folderNode),
       );
     }; */

  let renameWDB = (name, wdbNodeSpecificData) : wdbNodeSpecificData => {
    ...wdbNodeSpecificData,
    name,
  };

  let renameFolder = (name, folderNodeSpecificData) : folderNodeSpecificData => {
    ...folderNodeSpecificData,
    name,
  };

  let getFolderNodeName = ({name}: folderNodeSpecificData) => name;

  let _getNodeName = node =>
    switch (node) {
    | WDBNode(nodeData) =>
      let {name}: wdbNodeSpecificData = nodeData |> _getSpecificNodeData;

      name;
    | FolderNode(nodeData, _) =>
      getFolderNodeName(nodeData |> _getSpecificNodeData)
    /* let {name}: folderNodeSpecificData = nodeData |> _getSpecificNodeData;

       name; */
    };

  let rec cata = (wdbNodeFunc, folderNodeFunc, tree) : 'r => {
    let recurse = cata(wdbNodeFunc, folderNodeFunc);

    switch (tree) {
    | WDBNode(wdbNodeData) => wdbNodeFunc(wdbNodeData)
    | FolderNode(folderNodeData, children) =>
      folderNodeFunc(
        folderNodeData,
        children |> UIState.mapChildren(Js.Array.map, recurse),
      )
    };
  };

  let rec fold = (wdbNodeFunc, folderNodeFunc, acc, tree) : 'r => {
    let recurse = fold(wdbNodeFunc, folderNodeFunc);

    switch (tree) {
    | WDBNode(wdbNodeData) => wdbNodeFunc(acc, wdbNodeData)
    | FolderNode(folderNodeData, children) =>
      let localAccum = folderNodeFunc(acc, folderNodeData, children);

      UIState.fold(
        WonderCommonlib.ArrayService.reduceOneParam,
        recurse,
        localAccum,
        children,
      );
    };
  };

  let filter = (acc, predWDBNodeFunc, predFolderNodeFunc, tree) : 'r => {
    let _wdbNodeFunc = (acc, nodeData) => {
      let node = buildWDBNodeByNodeData(nodeData);

      predWDBNodeFunc(node) ? [node, ...acc] : acc;
    };
    let _folderNodeFunc = (acc, nodeData, children) => {
      let node = buildFolderNodeByNodeData(children, nodeData);

      predFolderNodeFunc(node) ? [node, ...acc] : acc;
    };

    fold(_wdbNodeFunc, _folderNodeFunc, [], tree);
  };

  let filterNodeId = (acc, predFunc, tree) : 'r =>
    filter(
      acc,
      wdbNode => getWDBNodeId(wdbNode) |> predFunc,
      folderNode => getFolderNodeId(folderNode) |> predFunc,
      tree,
    );

  /* let rec map = (_wdbNodeFunc, _folderNodeFunc, tree) : 'r => {
       let recurse = map(_wdbNodeFunc, _folderNodeFunc);

       switch (tree) {
       | WDBNode(wdbNodeData) => WDBNode(wdbNodeFunc(wdbNodeData))
       | FolderNode(folderNodeData, children) =>
         FolderNode(
           folderNodeFunc(folderNodeData),
           children |> UIState.map(Js.Array.map, recurse),
         )
       };
     }; */

  let rec mapWithState = (wdbNodeFunc, folderNodeFunc, tree) : 'r => {
    let recurse = mapWithState(wdbNodeFunc, folderNodeFunc);

    switch (tree) {
    | WDBNode(wdbNodeData) => WDBNode(wdbNodeFunc(wdbNodeData))
    | FolderNode(folderNodeData, children) =>
      let (changeStateType, nodeData) = folderNodeFunc(folderNodeData);

      FolderNode(
        nodeData,
        UIState.buildByChangeStateType(changeStateType, children)
        |> UIState.mapChildren(Js.Array.map, recurse),
      );
    };
  };

  /* let rec mapWithoutState = (_wdbNodeFunc, _folderNodeFunc, tree) : 'r => {
       let recurse = mapWithoutState(_wdbNodeFunc, _folderNodeFunc);

       switch (tree) {
       | WDBNode(wdbNodeData) => WDBNode(wdbNodeFunc(wdbNodeData))
       | FolderNode(folderNodeData, children) =>
         FolderNode(
           folderNodeFunc(folderNodeData),
           children |> UIState.mapChildren(Js.Array.map, recurse),
         )
       };
     }; */

  let mapWithParentNode = (wdbNodeFunc, folderNodeFunc, tree) : 'r => {
    let rec _map = (wdbNodeFunc, folderNodeFunc, parentNode, tree) : 'r => {
      let recurse = _map(wdbNodeFunc, folderNodeFunc);

      switch (tree) {
      | WDBNode(wdbNodeData) =>
        WDBNode(wdbNodeFunc(wdbNodeData, parentNode))
      | FolderNode(folderNodeData, children) =>
        FolderNode(
          folderNodeFunc(folderNodeData, children, parentNode),
          children |> UIState.mapChildren(Js.Array.map, recurse(Some(tree))),
        )
      };
    };

    _map(wdbNodeFunc, folderNodeFunc, None, tree);
  };

  /* let initRootAssetTree = (editorState, engineState) =>{

     }; */

  let isEqual = (value1, value2) => value1 === value2;

  let isIdEqual = isEqual;

  let _getNodeJudgeData =
      (node, (getWDBNodeJudgeDataFunc, getFolderNodeJudgeDataFunc)) =>
    switch (node) {
    | WDBNode(_) => node |> getWDBNodeData |> getWDBNodeJudgeDataFunc
    | FolderNode(_) => node |> getFolderNodeData |> getFolderNodeJudgeDataFunc
    };

  let isNodeEqual =
      (
        (isEqualFunc, (getWDBNodeJudgeDataFunc, getFolderNodeJudgeDataFunc)),
        sourceNode,
        targetNode,
      ) =>
    /* switch (sourceNode, targetNode) {
       | (WDBNode(nodeData1), WDBNode(nodeData2)) =>
         isEqualFunc(
           getWDBNodeJudgeDataFunc(nodeData1),
           getWDBNodeJudgeDataFunc(nodeData2),
         )
       | (FolderNode(nodeData1, _), FolderNode(nodeData2, _)) =>
         isEqualFunc(
           getFolderNodeJudgeDataFunc(nodeData1),
           getFolderNodeJudgeDataFunc(nodeData2),
         )
       | _ => false
       }; */
    isEqualFunc(
      _getNodeJudgeData(
        sourceNode,
        (getWDBNodeJudgeDataFunc, getFolderNodeJudgeDataFunc),
      ),
      _getNodeJudgeData(
        targetNode,
        (getWDBNodeJudgeDataFunc, getFolderNodeJudgeDataFunc),
      ),
    );

  let isNodeEqualById = (sourceNode, targetNode) =>
    isNodeEqual(
      (isIdEqual, (_getNodeId, _getNodeId)),
      sourceNode,
      targetNode,
    );

  let isNodeEqualByName = (sourceNode, targetNode) =>
    isNodeEqual(
      (
        isEqual,
        (
          wdbNodeData => {
            let {name}: wdbNodeSpecificData =
              _getSpecificNodeData(wdbNodeData);

            name;
          },
          folderNodeData => {
            let {name}: folderNodeSpecificData =
              _getSpecificNodeData(folderNodeData);

            name;
          },
        ),
      ),
      sourceNode,
      targetNode,
    );

  let isShowChildren = folderNode =>
    switch (folderNode) {
    | FolderNode(_folderNodeData, children) =>
      UIState.getIsShowChildrenByState(children)
    | _ =>
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          ~description={j|should be folder node|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    };

  let setNodeIsShowChildren = (targetNodeId, isShowChildren, tree) => {
    let _wdbNodeFunc = ((nodeId, {name, wdbGameObject})) => (
      nodeId,
      {name, wdbGameObject},
    );
    let _folderNodeFunc = ((nodeId, {name}) as nodeData) =>
      isIdEqual(nodeId, targetNodeId) ?
        (
          isShowChildren ? UIState.ChangeToShow : UIState.ChangeToHide,
          nodeData,
        ) :
        (UIState.NotChange, nodeData);

    mapWithState(_wdbNodeFunc, _folderNodeFunc, tree);
  };

  /* let findNode = (targetNode, tree, isEqualFunc) => {
       let _predFunc = node => isEqualFunc(node, targetNode);

       switch (
         filter(
           [],
           wdbNode => wdbNode |> predFunc,
           folderNode => folderNode |> predFunc,
           tree,
           /* filterNodeId([], nodeId => isEqualFunc(nodeId, targetNodeId), tree) */
         )
       ) {
       | list when List.length(list) === 0 => None
       | list => Some(list |> List.hd)
       };
     }; */

  let findNodeById = (targetNodeId, tree) =>
    switch (
      filterNodeId([], nodeId => isIdEqual(nodeId, targetNodeId), tree)
    ) {
    | list when List.length(list) === 0 => None
    | list => Some(list |> List.hd)
    };

  let unsafeFindNodeById = (targetNodeId, tree) =>
    findNodeById(targetNodeId, tree) |> OptionService.unsafeGet;

  let canFindOne = (predWDBNodeFunc, predFolderNodeFunc, tree) =>
    filter([], predWDBNodeFunc, predFolderNodeFunc, tree) |> List.length > 0;

  let insertNode = (targetNodeId, newTreeNode, tree) => {
    let _wdbNodeFunc = ((nodeId, {name, wdbGameObject})) =>
      buildWDBNode(nodeId, name, wdbGameObject);
    let _folderNodeFunc = ((nodeId, {name}) as nodeData, children) =>
      buildFolderNode(
        nodeId,
        name,
        isIdEqual(nodeId, targetNodeId) ?
          children
          |> UIState.map(children =>
               children |> Js.Array.copy |> ArrayService.push(newTreeNode)
             ) :
          children,
      );

    cata(_wdbNodeFunc, _folderNodeFunc, tree);
  };

  /* let insertNodeMutable = (targetNodeId, newTreeNode, tree) => {
       let _wdbNodeFunc = (targetNodeInTree, _) => targetNodeInTree;
       let _folderNodeFunc =
           (targetNodeInTree, (nodeId, {name}) as nodeData, children) =>
         isIdEqual(nodeId, targetNodeId) ?
           buildFolderNodeByNodeData(
             children
             |> UIState.map(children =>
                  children |> ArrayService.push(newTreeNode)
                ),
             nodeData,
           ) :
           targetNodeInTree;

       fold(_wdbNodeFunc, _folderNodeFunc, getRootNode(tree), tree);
     }; */

  let getAssetTreeRootName = () => "Assets";

  let hasRootNode = tree =>
    tree |> isFolderNode && _getNodeName(tree) === getAssetTreeRootName();

  let getRootNode = tree => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|tree has root node|j},
                  ~actual={j|not|j},
                ),
                () =>
                hasRootNode(tree) |> assertTrue
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );
    tree;
  };

  let _isSourceNodeBeOneOfAllParentsOfTargetNode = (sourceNode, targetNode) =>
    /* isFolderNode(sourceNode) ?
       filter(
         [],
         wdbNode => isIdEqual(targetNodeId, getWDBNodeId(wdbNode)),
         folderNode =>
           isIdEqual(targetNodeId, getFolderNodeId(folderNode)),
         sourceNode,
       )
       |> List.length > 0 :
       false; */
    isFolderNode(sourceNode) ?
      /* filter(
           [],
           wdbNode => isNodeEqualById(targetNode, wdbNode),
           folderNode => isNodeEqualById(targetNode, folderNode),
           sourceNode,
         )
         |> List.length > 0  */
      canFindOne(
        wdbNode => isNodeEqualById(targetNode, wdbNode),
        folderNode => isNodeEqualById(targetNode, folderNode),
        sourceNode,
      ) :
      false;

  let _findTargetChild = (folderNode, targetChild, isNodeEqualFunc) =>
    getFolderChildren(folderNode)
    |> UIState.get
    |> Js.Array.find(child => isNodeEqualFunc(child, targetChild));

  let _includeTargetChild = (folderNode, targetChild, isNodeEqualFunc) =>
    _findTargetChild(folderNode, targetChild, isNodeEqualFunc)
    |> Js.Option.isSome;

  let _isTargetNodeBeSourceNodeParent = (sourceNode, targetNode) =>
    isFolderNode(targetNode) ?
      _includeTargetChild(targetNode, sourceNode, isNodeEqualById) : false;

  let _isTargetNodeHasSameNameChild = (sourceNode, targetNode) =>
    _includeTargetChild(targetNode, sourceNode, isNodeEqualByName);
  /* canFindOne(
       wdbNode => isNodeEqualByName(sourceNode, wdbNode),
       folderNode => isNodeEqualByName(sourceNode, folderNode),
       targetNode,
     ); */

  /* TODO add more node */
  /* let isNodeRelationError = */
  let checkNodeRelation =
      /* (targetNodeId, sourceNodeId, (editorState, engineState)) */
      /* (sourceNode, targetNode, (editorState, engineState)) */
      (sourceNode, targetNode)
      : relationResult =>
    ! isFolderNode(targetNode) ?
      Fail("target node should be folder") :
      isNodeEqualById(sourceNode, targetNode) ?
        Fail("source and target node shouldn't be the same") :
        _isSourceNodeBeOneOfAllParentsOfTargetNode(sourceNode, targetNode) ?
          Fail(
            "source node shouldn't be one of all parents of the target node",
          ) :
          _isTargetNodeBeSourceNodeParent(sourceNode, targetNode) ?
            Fail("target node shouldn't be the parent of the source node") :
            _isTargetNodeHasSameNameChild(sourceNode, targetNode) ?
              Fail(
                "target node shouldn't has the child with the same name of the source node",
              ) :
              Success;

  let renameNode = (targetNodeId, name, tree) : HandleTreeResult.t => {
    let isSuccess = ref(true);

    let _func = ((nodeId, data), parentNode, renameFunc, buildNodeFunc) => (
      nodeId,
      isSuccess^ && isIdEqual(nodeId, targetNodeId) ?
        {
          let updatedSpecificData = renameFunc(name, data);

          isSuccess :=
            (
              switch (parentNode) {
              | None => true
              | Some(parentNode) =>
                _isTargetNodeHasSameNameChild(
                  buildNodeFunc((nodeId, updatedSpecificData)),
                  parentNode,
                ) ?
                  false : true
              }
            );

          updatedSpecificData;
        } :
        data,
    );
    let _wdbNodeFunc = ((nodeId, data), parentNode) =>
      _func((nodeId, data), parentNode, renameWDB, buildWDBNodeByNodeData);
    let _folderNodeFunc = ((nodeId, data), children, parentNode) =>
      _func(
        (nodeId, data),
        parentNode,
        renameFolder,
        buildFolderNodeByNodeData(children),
      );

    let updatedTree = mapWithParentNode(_wdbNodeFunc, _folderNodeFunc, tree);

    isSuccess^ ?
      Success(updatedTree) :
      Fail(("parent node shouldn't has the child with the same name", tree));
  };

  /* let getAssetNodeTotalName = (nodeId, tree) => */
  let getNodeName = (nodeId, tree) =>
    findNodeById(nodeId, tree)
    |> Js.Option.map((. node) => _getNodeName(node));

  let _getFolderPathArr = folderPath =>
    folderPath
    |> FileNameService.removePathPostfix
    |> Js.String.split("/")
    |> WonderLog.Contract.ensureCheck(
         pathArr =>
           WonderLog.(
             Contract.(
               Operators.(
                 test(
                   Log.buildAssertMessage(
                     ~expect={j|contain root node|j},
                     ~actual={j|not|j},
                   ),
                   () => {
                     pathArr |> Js.Array.length >= 1;
                     pathArr[0] ==^ getAssetTreeRootName();
                   },
                 )
               )
             )
           ),
         StateEditorService.getStateIsDebug(),
       );

  let _buildRootNode = editorState => {
    let (editorState, id) = AssetIdUtils.generateAssetId(editorState);

    (
      id,
      buildFolderNode(id, getAssetTreeRootName(), UIState.build()),
      editorState,
    );
  };

  let _buildTreeByFolderPath = (folderPath, editorState) => {
    let (rootNodeId, rootNode, editorState) = _buildRootNode(editorState);

    let (_, tree, editorState) =
      folderPath
      |> _getFolderPathArr
      |> Js.Array.sliceFrom(1)
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. (parentFolderNodeId, tree, editorState), folderNodeName) => {
             let (editorState, id) =
               AssetIdUtils.generateAssetId(editorState);

             (
               id,
               buildFolderNode(id, folderNodeName, UIState.build())
               |> insertNode(parentFolderNodeId, _, tree),
               editorState,
             );
           },
           (rootNodeId, rootNode, editorState),
         );

    (tree, editorState);
  };

  let _mergeTreeByFolderNodeName = (tree1, onlyFolderNodeTree) => {
    let _wdbNodeFunc = ((parentFolderNodeInNewTree, newTree), _) => (
      parentFolderNodeInNewTree,
      newTree,
    );
    let _folderNodeFunc =
        (
          (parentFolderNodeInNewTree, newTree),
          (nodeId, data) as nodeData,
          children,
        ) =>
      switch (parentFolderNodeInNewTree) {
      | None => (getRootNode(newTree) |. Some, newTree)
      | Some(parentFolderNodeInNewTree) =>
        let node = buildFolderNodeByNodeData(children, nodeData);

        let targetChildFolderNodeInNewTree =
          _findTargetChild(
            parentFolderNodeInNewTree,
            node,
            isNodeEqualByName,
          );

        switch (targetChildFolderNodeInNewTree) {
        | Some(targetChildFolderNodeInNewTree) => (
            Some(targetChildFolderNodeInNewTree),
            newTree,
          )
        | None => (
            node |. Some,
            insertNode(
              getFolderNodeId(parentFolderNodeInNewTree),
              node,
              newTree,
            ),
          )
        };
      };

    let (_, newTree) =
      fold(_wdbNodeFunc, _folderNodeFunc, (None, tree1), onlyFolderNodeTree);

    newTree;
  };

  let addFolderNodesToTreeByPath = (path, tree, editorState) => {
    let (newTree, editorState) = _buildTreeByFolderPath(path, editorState);

    (_mergeTreeByFolderNodeName(tree, newTree), editorState);
  };
};