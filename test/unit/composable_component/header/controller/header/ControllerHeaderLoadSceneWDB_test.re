open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("header load scene wdb", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
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

        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      testPromise("should clear current scene tree node", () => {
        let fileName = "Scene";
        let newWDBArrayBuffer =
          MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

        HeaderTool.fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
        )
        |> then_(_ =>
             BuildComponentTool.buildSceneTree(
               TestTool.buildAppStateSceneGraphFromEngine(),
             )
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve
           );
      });

      describe("test imgui", () =>
        describe("test engineState", () => {
          describe("if scene wdb's imgui exist", () =>
            testPromise(
              "should save scene wdb's imgui func and customData to editorState",
              () => {
              let fileName = "Scene";
              let newWDBArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

              HeaderTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
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
                               {|(_, api, state) => {
                                var state = api.label(
                                    [100, 30, 300, 200], "imgui", 0, state
                                );




                                return state
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
              let newWDBArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

              HeaderTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
              )
              |> then_(_ => {
                   let fileName = "BoxTextured";
                   let newWDBArrayBuffer =
                     MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

                   HeaderTool.fileLoad(
                     TestTool.getDispatch(),
                     BaseEventTool.buildWDBFileEvent(
                       fileName,
                       newWDBArrayBuffer,
                     ),
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
            let newWDBArrayBuffer =
              MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

            HeaderTool.fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
            )
            |> then_(_ => {
                 let engineState = StateEngineService.unsafeGetState();

                 (
                   GameObjectToolEngine.getAllArcballCameras(
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
                   |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
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
          HeaderTool.fileLoad(
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
          let newWDBArrayBuffer =
            MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

          HeaderTool.fileLoad(
            TestTool.getDispatch(),
            BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
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
          let fileName = "BoxTextured";
          let newWDBArrayBuffer =
            MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

          HeaderTool.fileLoad(
            TestTool.getDispatch(),
            BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
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