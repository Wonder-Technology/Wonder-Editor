open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->drag wdb", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorAssetTool.buildFakeFileReader();

      MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
        MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
      );
      MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

      MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      /* SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox); */
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test drag wdb to scene tree", () =>
      describe("test wdb has direction and point light gameObjects", () => {
        let _test = (sandbox, testFunc) => {
          SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let fileName = "DirectionPointLightsAndBox";

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

        describe("should init cloned gameObjects", () =>
          testPromise("glsl->direction,point light count should + 1", () =>
            _test(
              sandbox,
              (
                shaderSourceCountBeforeDrag,
                shaderSourceCountAfterDrag,
                glShaderSource,
              ) =>
              (
                GLSLToolEngine.containMultiline(
                  GLSLToolEngine.getVsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag,
                  ),
                  [
                    {|#define DIRECTION_LIGHTS_COUNT 1|},
                    {|#define POINT_LIGHTS_COUNT 1|},
                  ],
                ),
                GLSLToolEngine.containMultiline(
                  GLSLToolEngine.getFsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag,
                  ),
                  [
                    {|#define DIRECTION_LIGHTS_COUNT 1|},
                    {|#define POINT_LIGHTS_COUNT 1|},
                  ],
                ),
              )
              |> expect == (true, true)
              |> resolve
            )
          )
        );

        describe("should reinit origin gameObjects in scene", () =>
          testPromise("glsl->direction,point light count should + 1", () =>
            _test(
              sandbox,
              (
                shaderSourceCountBeforeDrag,
                shaderSourceCountAfterDrag,
                glShaderSource,
              ) =>
              (
                GLSLToolEngine.containMultiline(
                  GLSLToolEngine.getFsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag + 1,
                  ),
                  [
                    {|#define DIRECTION_LIGHTS_COUNT 1|},
                    {|#define POINT_LIGHTS_COUNT 1|},
                  ],
                ),
                GLSLToolEngine.contain(
                  GLSLToolEngine.getVsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag + 2,
                  ),
                  {|#define DIRECTION_LIGHTS_COUNT 1|},
                ),
                GLSLToolEngine.contain(
                  GLSLToolEngine.getVsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag + 3,
                  ),
                  {|#define DIRECTION_LIGHTS_COUNT 1|},
                ),
                GLSLToolEngine.contain(
                  GLSLToolEngine.getVsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag + 4,
                  ),
                  {|#define DIRECTION_LIGHTS_COUNT 1|},
                ),
              )
              |> expect == (true, true, true, true)
              |> resolve
            )
          )
        );

        testPromise("should reinit cloned gameObjects", () =>
          _test(
            sandbox,
            (
              shaderSourceCountBeforeDrag,
              shaderSourceCountAfterDrag,
              glShaderSource,
            ) =>
            shaderSourceCountAfterDrag |> expect == 7 |> resolve
          )
        );

        testPromise("should clear shader cache", () =>
          _test(
            sandbox,
            (
              shaderSourceCountBeforeDrag,
              shaderSourceCountAfterDrag,
              glShaderSource,
            ) =>
            ShaderToolEngine.isShaderCacheClear(
              StateEngineService.unsafeGetState(),
            )
            |> expect == true
            |> resolve
          )
        );
      })
    );
  });