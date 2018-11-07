open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->drag wdb", () => {
    let sandbox = getSandboxDefaultVal();

    let directionPointLightsAndBoxWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      directionPointLightsAndBoxWDBArrayBuffer :=
        WDBTool.generateDirectionPointLightsAndBoxWDB()
    );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test drag wdb to scene tree", () => {
      describe("test wdb has direction and point light gameObjects", () => {
        let _test = (sandbox, testFunc) =>
          DragWDBTool.testDragWDB(
            sandbox,
            (
              "DirectionPointLightsAndBox",
              directionPointLightsAndBoxWDBArrayBuffer^,
            ),
            testFunc,
          );

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
            shaderSourceCountAfterDrag |> expect == 6 |> resolve
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
      });

      describe("check", () =>
        describe("check light count before drag", () =>
          describe("if light count will exceed max count after drag, warn", () => {
            let _test = (createLightFunc, judgeFunc) => {
              ConsoleTool.markTestConsole();

              let warn =
                createMethodStubWithJsObjSandbox(
                  sandbox,
                  ConsoleTool.console,
                  "warn",
                );

              MainEditorSceneTool.prepareScene(sandbox);

              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
              |> ignore;

              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              let (editorState, engineState) =
                createLightFunc(editorState, engineState);

              editorState |> StateEditorService.setState |> ignore;
              engineState |> StateEngineService.setState |> ignore;

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=directionPointLightsAndBoxWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );
                   MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );

                   judgeFunc(warn);
                 });
            };

            describe("test direction light", () => {
              testPromise("test not exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, directionLight1) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn => warn |> expect |> not_ |> toCalled |> resolve,
                )
              );
              testPromise("test exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, directionLight1) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    let (editorState, engineState, directionLight3) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn =>
                    ConsoleTool.getMessage(warn)
                    |> expect
                    |> toContain(
                         "the direction light count is exceed max count!",
                       )
                    |> resolve,
                )
              );
            });

            describe("test point light", () => {
              testPromise("test not exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, directionLight1) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    let (editorState, engineState, _) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn => warn |> expect |> not_ |> toCalled |> resolve,
                )
              );
              testPromise("test exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, pointLight1) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, pointLight2) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );

                    let (editorState, engineState, pointLight3) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn =>
                    ConsoleTool.getMessage(warn)
                    |> expect
                    |> toContain(
                         "the point light count is exceed max count!",
                       )
                    |> resolve,
                )
              );
            });
          })
        )
      );
    });
  });