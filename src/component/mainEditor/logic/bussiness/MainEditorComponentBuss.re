open Contract;

module InspectorBuss = {
  module TransformBuss = {
    let getLocalPosition = (stateTuple, currentGameObject) => {
      let (_, engineState) = stateTuple;
      let currentGameObjectTransform =
        MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
      MainEditorTransformOper.getLocalPosition(currentGameObjectTransform, engineState)
    };
    let setLocalPosition = (currentGameObject, positionTuple, stateTuple) => {
      let (_, engineState) = stateTuple;
      let currentGameObjectTransform =
        MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
      MainEditorTransformOper.setLocalPosition(
        currentGameObjectTransform,
        positionTuple,
        engineState
      )
    };
  };
};

module SceneTreeBuss = {
  open MainEditorSceneTreeType;
  let getSceneTree = () => [|
    {
      name: "root",
      uid: 0,
      children: [|
        {name: "A", uid: 1, children: [||]},
        {name: "B", uid: 2, children: [||]},
        {name: "C", uid: 3, children: [|{name: "D", uid: 4, children: [||]}|]}
      |]
    }
  |];
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
                 _iterateSceneGraph(treeNode.children);
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
               _iterateSceneGraph(treeNode.children);
               treeNode
             }
         );
    _iterateSceneGraph(sceneGraphArrayData)
  };
  let getDragedSceneGraphData =
      (targetId: int, dragedId: int, sceneGraphArrayData: array(treeNode)) => {
    let (removeDragedSceneGrahphData, dragedNode) =
      _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData);
    _insertRemovedTreeNodeToTargetTreeNode(targetId, dragedNode^, removeDragedSceneGrahphData)
  };
};