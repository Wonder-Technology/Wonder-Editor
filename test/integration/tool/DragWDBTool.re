let testDragWDB = (sandbox, fileName, testFunc) => {
  open Js.Promise;

  SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

  let assetTreeDomRecord = MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

  let newWDBArrayBuffer = NodeToolEngine.getWDBArrayBuffer(fileName);

  let gl = FakeGlToolEngine.getEngineStateGl();
  let glShaderSource = gl##shaderSource;

  MainEditorAssetTool.fileLoad(
    TestTool.getDispatch(),
    BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
  )
  |> then_(_ => {
       let component =
         BuildComponentTool.buildSceneTree(
           TestTool.buildAppStateSceneGraphFromEngine(),
         );
       let rootDivDomIndex =
         SceneTreeNodeDomTool.OperateThreeLayer.getRootDivDomIndex();

       assetTreeDomRecord
       |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
       |> MainEditorMaterialTool.triggerFileDragStartEvent;

       let shaderSourceCountBeforeDrag =
         GLSLToolEngine.getShaderSourceCallCount(glShaderSource);

       BaseEventTool.triggerComponentEvent(
         component,
         SceneTreeEventTool.triggerDragDropDiv(rootDivDomIndex),
       );

       let shaderSourceCountAfterDrag =
         GLSLToolEngine.getShaderSourceCallCount(glShaderSource);

       testFunc(
         shaderSourceCountBeforeDrag,
         shaderSourceCountAfterDrag,
         glShaderSource,
       );
     });
};