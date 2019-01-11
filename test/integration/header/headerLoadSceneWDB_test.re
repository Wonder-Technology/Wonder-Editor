open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("header load scene wdb", () => {
    let sandbox = getSandboxDefaultVal();

    let cubeTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let sceneWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() => {
      cubeTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("CubeTextured");
      sceneWDBArrayBuffer := WDBTool.generateSceneWDB();
    });

    beforeEach(() => {
      sandbox := createSandbox();

      /* MainEditorSceneTool.initStateWithJob(
           ~sandbox,
           ~noWorkerJobRecord=
             NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
           (),
         ); */

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isBuildFakeDom=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        /* ~loopPipelines=
             {|
                  [
                      {
                          "name": "default",
                          "jobs": [
                              {
                                  "name": "dispose"
                              }
                          ]
                      }
                  ]
              |},
           (), */
        (),
      );

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );

      DirectorToolEngine.prepareAndInitAllEnginState();
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load scene wdb", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);
      });

      testPromise("should clear current scene tree node", () => {
        let fileName = "Scene";

        LoadSceneWDBTool.loadSceneWDB(
          ~fileName,
          ~arrayBuffer=sceneWDBArrayBuffer^,
          (),
        )
        |> then_(_ =>
             BuildComponentTool.buildSceneTree(
               TestTool.buildEmptyAppState(),
             )
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve
           );
      });

      describe("test load no light scene wdb to scene which has light", () => {
        let _prepare = testFunc => {
          let fileName = "CubeTextured";

          let gl = FakeGlToolEngine.getEngineStateGl();
          let glShaderSource = gl##shaderSource;
          let shaderSourceCountBeforeLoadSceneWDB =
            GLSLToolEngine.getShaderSourceCallCount(glShaderSource);

          LoadSceneWDBTool.loadSceneWDB(
            ~fileName,
            ~arrayBuffer=cubeTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(_ =>
               testFunc(shaderSourceCountBeforeLoadSceneWDB, glShaderSource)
             );
        };

        testPromise("new scene->cube->glsl should has no light count", () =>
          _prepare((shaderSourceCountBeforeLoadSceneWDB, glShaderSource) =>
            (
              GLSLToolEngine.contain(
                GLSLToolEngine.getVsSourceByCount(
                  glShaderSource,
                  shaderSourceCountBeforeLoadSceneWDB,
                ),
                {|#define DIRECTION_LIGHTS_COUNT 0|},
              ),
              GLSLToolEngine.contain(
                GLSLToolEngine.getFsSourceByCount(
                  glShaderSource,
                  shaderSourceCountBeforeLoadSceneWDB,
                ),
                {|#define POINT_LIGHTS_COUNT 0|},
              ),
            )
            |> expect == (true, true)
            |> resolve
          )
        );
        testPromise(
          "if add light material and init after load, its glsl should has no light count",
          () =>
          _prepare((shaderSourceCountBeforeLoadSceneWDB, glShaderSource) => {
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, gameObject, _) =
              LightMaterialToolEngine.createGameObject(engineState);
            let engineState =
              engineState
              |> GameObjectEngineService.initGameObject(gameObject);

            (
              GLSLToolEngine.contain(
                GLSLToolEngine.getVsSourceByCount(
                  glShaderSource,
                  shaderSourceCountBeforeLoadSceneWDB + 1,
                ),
                {|#define DIRECTION_LIGHTS_COUNT 0|},
              ),
              GLSLToolEngine.contain(
                GLSLToolEngine.getFsSourceByCount(
                  glShaderSource,
                  shaderSourceCountBeforeLoadSceneWDB + 1,
                ),
                {|#define POINT_LIGHTS_COUNT 0|},
              ),
            )
            |> expect == (true, true)
            |> resolve;
          })
        );
      });

      describe("test imgui", () =>
        describe("test engineState", () => {
          describe("if scene wdb's imgui exist", () =>
            testPromise(
              "should save scene wdb's imgui func and customData to editorState",
              () => {
              let fileName = "Scene";

              LoadSceneWDBTool.loadSceneWDB(
                ~fileName,
                ~arrayBuffer=sceneWDBArrayBuffer^,
                (),
              )
              |> then_(_ => {
                   let editorState = StateEditorService.getState();

                   (
                     IMGUITool.unsafeGetIMGUIFuncStrFromEditorState(
                       editorState,
                     )
                     |> StringTool.removeNewLinesAndSpaces,
                     IMGUIEditorService.unsafeGetGameViewIMGUICustomData(
                       editorState,
                     ),
                   )
                   |>
                   expect == (
                               {|function(_,apiJsObj,engineState){
        var label = apiJsObj.label;
        return label(/*tuple*/[100,30,300,200], "imgui", 0, engineState);
                               }|}
                               |> StringTool.removeNewLinesAndSpaces,
                               Obj.magic(Js.Nullable.null),
                             )
                   |> resolve;
                 });
            })
          );

          describe("else", () =>
            testPromise(
              "should remove scene wdb's imgui func and customData from editorState",
              () => {
              let fileName = "Scene";

              LoadSceneWDBTool.loadSceneWDB(
                ~fileName,
                ~arrayBuffer=sceneWDBArrayBuffer^,
                (),
              )
              |> then_(_ => {
                   let fileName = "CubeTextured";

                   LoadSceneWDBTool.loadSceneWDB(
                     ~fileName,
                     ~arrayBuffer=cubeTexturedWDBArrayBuffer^,
                     (),
                   )
                   |> then_(_ => {
                        let editorState = StateEditorService.getState();

                        (
                          IMGUIEditorService.getGameViewIMGUIFunc(editorState),
                          IMGUIEditorService.getGameViewIMGUICustomData(
                            editorState,
                          ),
                        )
                        |> expect == (None, None)
                        |> resolve;
                      });
                 });
            })
          );
        })
      );

      describe("test bind arcball event", () =>
        testPromise(
          "should not bind scene wdb->arcball cameraControllers(instead bind editCamera->arcball cameraController)",
          () => {
            let fileName = "Scene";

            LoadSceneWDBTool.loadSceneWDB(
              ~fileName,
              ~arrayBuffer=sceneWDBArrayBuffer^,
              (),
            )
            |> then_(_ => {
                 let engineState = StateEngineService.unsafeGetState();

                 (
                   GameObjectToolEngine.getAllArcballCameraControllers(
                     SceneEngineService.getSceneGameObject(engineState),
                     engineState,
                   )
                   |> Js.Array.filter(cameraController =>
                        ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                          cameraController,
                          engineState,
                        )
                      )
                   |> Js.Array.length,
                   SceneViewEditorService.unsafeGetEditCamera(
                     StateEditorService.getState(),
                   )
                   |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                        _,
                        engineState,
                      )
                   |> ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                        _,
                        engineState,
                      ),
                 )
                 |> expect == (0, true)
                 |> resolve;
               });
          },
        )
      );

      test("if load no wdb, return", () =>
        expect(() =>
          LoadSceneWDBTool.load(
            TestTool.getDispatch(),
            {
              "target": {
                "files": Js.Dict.empty(),
              },
              "preventDefault": () => (),
            }
            |> Obj.magic,
          )
        )
        |> not_
        |> toThrow
      );

      describe("set wdb->actived camera to editorState", () => {
        testPromise("test wdb has one", () => {
          let fileName = "Scene";

          LoadSceneWDBTool.loadSceneWDB(
            ~fileName,
            ~arrayBuffer=sceneWDBArrayBuffer^,
            (),
          )
          |> then_(_ => {
               let editorState = StateEditorService.getState();

               GameViewEditorService.getActivedBasicCameraView(editorState)
               |>
               expect == Some(
                           GameObjectEngineService.getGameObjectActiveBasicCameraView(
                             MainEditorSceneTool.unsafeGetScene(),
                             StateEngineService.unsafeGetState(),
                           )
                           |> OptionService.unsafeGet,
                         )
               |> resolve;
             });
        });
        testPromise("test wdb not has one", () => {
          let fileName = "CubeTextured";

          LoadSceneWDBTool.loadSceneWDB(
            ~fileName,
            ~arrayBuffer=cubeTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(_ => {
               let editorState = StateEditorService.getState();

               GameViewEditorService.getActivedBasicCameraView(editorState)
               |> expect == None
               |> resolve;
             });
        });
      });
    });
  });