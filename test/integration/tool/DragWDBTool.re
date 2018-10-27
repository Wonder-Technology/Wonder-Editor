let testDragWDB = (sandbox, (fileName, wdbArrayBuffer), testFunc) => {
  open Js.Promise;

  SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

  MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;

  let gl = FakeGlToolEngine.getEngineStateGl();
  let glShaderSource = gl##shaderSource;

  MainEditorAssetUploadTool.loadOneWDB(
    ~arrayBuffer=wdbArrayBuffer,
    ~fileName,
    (),
  )
  |> then_(uploadedWDBNodeId => {
       let shaderSourceCountBeforeDrag =
         GLSLToolEngine.getShaderSourceCallCount(glShaderSource);

       MainEditorSceneTreeTool.Drag.dragAssetWDBToSceneTree(
         ~wdbNodeId=uploadedWDBNodeId,
         (),
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