open Contract;

open MainEditorSceneTreeType;

let rec _iterateDragedObject = (targetGameObject, dragedGameObject, engineState) => {
  let dragedChildren = engineState |> MainEditorGameObjectOper.getChildren(dragedGameObject);
  switch (dragedChildren |> Js.Array.length) {
  | 0 => false
  | _ =>
    dragedChildren
    |> Js.Array.filter(
         (child) =>
           child == targetGameObject ?
             true : _iterateDragedObject(targetGameObject, child, engineState)
       )
    |> Js.Array.length
    |> (
      (len) =>
        switch len {
        | 0 => false
        | _ => true
        }
    )
  }
};

let isObjectAssociateError = (targetGameObject, dragedGameObject, (editorState, engineState)) =>
  targetGameObject == dragedGameObject ?
    true : _iterateDragedObject(targetGameObject, dragedGameObject, engineState);

let setParent = (parentGameObject, childGameObject, (editorState, engineState)) => {
  let parentGameObjectTransform =
    MainEditorGameObjectOper.getTransformComponent(parentGameObject, engineState);
  let childGameObjectTransform =
    MainEditorGameObjectOper.getTransformComponent(childGameObject, engineState);
  let engineState =
    MainEditorTransformOper.setParent(
      parentGameObjectTransform,
      childGameObjectTransform,
      engineState
    );
  (editorState, engineState)
};

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

let getSceneGraphData = ((editorState, engineState)) => {
  let scene = editorState |> MainEditorSceneEdit.getScene;
  [|_buildSceneGraphData(scene, engineState)|]
};

let _removeDragedTreeNodeFromSceneGrahph = (dragedId, sceneGraphArrayData) => {
  let dragedNode: ref(treeNode) = ref({name: "fake", uid: (-1), children: [||]});
  let rec _iterateSceneGraph = (sceneGraphArray) => {
    let removeDragedSceneGraphData =
      sceneGraphArray
      |> Js.Array.map(
           (treeNode: treeNode) =>
             switch treeNode.uid {
             | uid when uid == dragedId =>
               dragedNode := treeNode;
               let index = Js.Array.indexOf(treeNode, sceneGraphArray);
               sceneGraphArray |> Js.Array.spliceInPlace(~pos=index, ~remove=1, ~add=[||])
             | _ =>
               _iterateSceneGraph(treeNode.children) |> ignore;
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
             "the draged node should exist",
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
         (treeNode: treeNode) =>
           switch treeNode.uid {
           | uid when uid == targetId =>
             Js.Array.push(dragedTreeNode, treeNode.children) |> ignore;
             treeNode
           | _ =>
             _iterateSceneGraph(treeNode.children) |> ignore;
             treeNode
           }
       );
  _iterateSceneGraph(sceneGraphArrayData)
};

let getDragedSceneGraphData = (targetId: int, dragedId: int, sceneGraphArrayData: array(treeNode)) => {
  let (removeDragedSceneGrahphData, dragedNode) =
    _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData);
  _insertRemovedTreeNodeToTargetTreeNode(targetId, dragedNode^, removeDragedSceneGrahphData)
  |> ensureCheck(
       (result) =>
         test(
           "the draged scene graph data should == scene graph data from engine",
           () => {
             let sceneGraphFromEngine = MainEditorStateView.prepareState() |> getSceneGraphData;
             sceneGraphFromEngine == result |> Js.Boolean.to_js_boolean |> assertJsTrue
           }
         )
     )
};