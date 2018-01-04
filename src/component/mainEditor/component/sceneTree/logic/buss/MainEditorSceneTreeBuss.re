open Contract;

open MainEditorSceneTreeType;

let rec _iterateDragedObject = (targetGameObject, dragedGameObject, engineState) =>
  engineState |> MainEditorGameObjectOper.hasChildren(dragedGameObject) ?
    engineState
    |> MainEditorGameObjectOper.getChildren(dragedGameObject)
    |> Js.Array.filter(
         (child) =>
           child == targetGameObject ?
             true : _iterateDragedObject(targetGameObject, child, engineState)
       )
    |> Js.Array.length > 0 ?
      true : false :
    false;

let isObjectAssociateError = (targetGameObject, dragedGameObject, (editorState, engineState)) =>
  targetGameObject == dragedGameObject ?
    true : _iterateDragedObject(targetGameObject, dragedGameObject, engineState);

let setParent = (parentGameObject, childGameObject, (editorState, engineState)) => (
  editorState,
  MainEditorTransformOper.setParent(
    MainEditorGameObjectOper.getTransformComponent(parentGameObject, engineState),
    MainEditorGameObjectOper.getTransformComponent(childGameObject, engineState),
    engineState
  )
);

let _getGameObjectName = (gameObject, engineState) =>
  MainEditorCameraOper.isCamera(gameObject, engineState) ? "camera" : {j|gameObject$gameObject|j};

let _buildTreeNode = (gameObject, engineState) => {
  name: _getGameObjectName(gameObject, engineState),
  uid: gameObject,
  children: [||]
};

let _buildSceneGraphData = (gameObject, engineState) => {
  let rec _buildSceneGraphDataRec = (gameObject, treeNode, engineState) =>
    MainEditorGameObjectOper.hasChildren(gameObject, engineState) ?
      engineState
      |> MainEditorGameObjectOper.getChildren(gameObject)
      |> Js.Array.reduce(
           ({children} as treeNode, child) => {
             ...treeNode,
             children:
               children
               |> Js.Array.copy
               |> OperateArrayUtils.push(
                    _buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState)
                  )
           },
           treeNode
         ) :
      treeNode;
  _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState)
};

let getSceneGraphDataFromEngine = ((editorState, engineState)) => [|
  _buildSceneGraphData(editorState |> MainEditorSceneEdit.getScene, engineState)
|];

let _removeDragedTreeNodeFromSceneGrahph = (dragedId, sceneGraphArrayData) => {
  let dragedNode: ref(treeNode) = ref({name: "fake", uid: (-1), children: [||]});
  let rec _iterateSceneGraph = (sceneGraphArray) => {
    let removeDragedSceneGraphData =
      sceneGraphArray
      |> Js.Array.map(
           ({uid, children} as treeNode) =>
             uid == dragedId ?
               {
                 dragedNode := treeNode;
                 sceneGraphArray
                 |> Js.Array.spliceInPlace(
                      ~pos=sceneGraphArray |> Js.Array.indexOf(treeNode),
                      ~remove=1,
                      ~add=[||]
                    )
               } :
               {
                 _iterateSceneGraph(children) |> ignore;
                 sceneGraphArray
               }
         )
      |> WonderCommonlib.ArraySystem.flatten;
    (removeDragedSceneGraphData, dragedNode)
  };
  _iterateSceneGraph(sceneGraphArrayData)
  |> ensureCheck(
       ((_, dragedNode)) =>
         Contract.Operators.(
           test(
             "the draged treeNode should exist",
             () => {
               let dragedTreeNode: treeNode = dragedNode^;
               dragedTreeNode.uid <>= (-1)
             }
           )
         )
     )
};

let _insertRemovedTreeNodeToTargetTreeNode =
    (targetId, dragedTreeNode: treeNode, sceneGraphArrayData: array(treeNode)) => {
  let rec _iterateSceneGraph = (sceneGraphArray) =>
    sceneGraphArray
    |> Js.Array.map(
         ({uid, children} as treeNode) =>
           uid == targetId ?
             {
               Js.Array.push(dragedTreeNode, children) |> ignore;
               treeNode
             } :
             {
               _iterateSceneGraph(children) |> ignore;
               treeNode
             }
       );
  _iterateSceneGraph(sceneGraphArrayData)
};

let getDragedSceneGraphData = (targetId: int, dragedId: int, sceneGraphArrayData: array(treeNode)) => {
  let (removeDragedSceneGrahphData, dragedNode) =
    _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData);
  _insertRemovedTreeNodeToTargetTreeNode(targetId, dragedNode^, removeDragedSceneGrahphData)
  /* |> ensureCheck(
       (result) =>
         test(
           "the draged scene graph data should == scene graph data from engine",
           () => {
             let sceneGraphFromEngine = MainEditorStateView.prepareState() |> getSceneGraphDataFromEngine;
             sceneGraphFromEngine == result |> Js.Boolean.to_js_boolean |> assertJsTrue
           }
         )
     ) */
};