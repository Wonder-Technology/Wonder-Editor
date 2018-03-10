open SceneGraphType;

let _removeDragedTreeNodeFromSceneGrahph = (dragedUid, sceneGraphArrayData) => {
  let rec _iterateSceneGraph = (dragedUid, sceneGraphArray, newSceneGraphArray, dragedTreeNode) =>
    sceneGraphArray
    |> Js.Array.reduce(
         ((newSceneGraphArray, dragedTreeNode), {uid, children} as treeNode) =>
           uid === dragedUid ?
             (newSceneGraphArray, Some(treeNode)) :
             {
               let (newChildrenSceneGraphArray, dragedTreeNode) =
                 _iterateSceneGraph(dragedUid, children, [||], dragedTreeNode);
               (
                 newSceneGraphArray
                 |> ArrayService.push({...treeNode, children: newChildrenSceneGraphArray}),
                 dragedTreeNode
               )
             },
         (newSceneGraphArray, dragedTreeNode)
       );
  switch (_iterateSceneGraph(dragedUid, sceneGraphArrayData, [||], None)) {
  | (_, None) =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_removeDragedTreeNodeFromSceneGrahph",
        ~description={j|the draged treeNode $dragedUid is not exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|dragedUid:$dragedUid|j}
      )
    )
  | (newSceneGraphArray, Some(dragedTreeNode)) => (newSceneGraphArray, dragedTreeNode)
  }
};

let rec _insertRemovedTreeNodeToTargetTreeNode = (targetUid, (sceneGraphArrayData, dragedTreeNode)) =>
  sceneGraphArrayData
  |> Js.Array.map(
       ({uid, children} as treeNode) =>
         uid === targetUid ?
           {...treeNode, children: children |> ArrayService.push(dragedTreeNode)} :
           {
             ...treeNode,
             children:
               _insertRemovedTreeNodeToTargetTreeNode(targetUid, (children, dragedTreeNode))
           }
     );

let getDragedSceneGraphData =
    (targetUid: int, dragedUid: int, sceneGraphArrayData: array(treeNode)) =>
  _removeDragedTreeNodeFromSceneGrahph(dragedUid, sceneGraphArrayData)
  |> _insertRemovedTreeNodeToTargetTreeNode(targetUid)
  |> WonderLog.Contract.ensureCheck(
       (dragedSceneGraph) =>
         WonderLog.(
           Contract.(
             test(
               Log.buildAssertMessage(
                 ~expect={j|the draged scene graph data == scene data from engine|j},
                 ~actual={j|not|j}
               ),
               () =>
                 SceneGraphEngineService.getSceneGraphDataFromEngine
                 |> StateLogicService.getState == dragedSceneGraph
                 |> assertTrue
             )
           )
         ),
       StateEditorService.getStateIsDebug()
     );