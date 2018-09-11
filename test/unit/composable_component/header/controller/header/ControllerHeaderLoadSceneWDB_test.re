open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("controller header load scene wdb", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        /* NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(), */
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
      /* let _getDefaultSceneIMGUIFuncStr = () => {|function (param, apiJsObj, state) {
           return param[1](param[0], apiJsObj, state);
         }|}; */

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      describe("test imgui", () =>
        describe("test editEngineState", () => {
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
      /* describe("test runEngineState", () =>
           testPromise("should set scene wdb's imgui", () => {
             let fileName = "Scene";
             let newWDBArrayBuffer =
               MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

             HeaderTool.fileLoad(
               TestTool.getDispatch(),
               BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
             )
             |> then_(_ => {
                  let state = StateLogicService.getRunEngineState();

                  IMGUITool.unsafeGetIMGUIFuncStr(state)
                  |>
                  expect == (
                              {|(_, api, state) => {
                     var state = api.label(
                         [100, 30, 300, 200], "imgui", 0, state
                     );

                     return state
                 }|}
                              |> StringTool.removeNewLinesAndSpaces
                            )
                  |> resolve;
                });
           })
         ); */

         /* TODO pass test */
      /* describe("test bind arcball event", () =>
        testPromise(
          "ee and re should all not bind scene wdb->arcball cameraControllers(ee bind editCamera->arcball cameraController)",
          () => {
            let fileName = "Scene";
            let newWDBArrayBuffer =
              MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

            HeaderTool.fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
            )
            |> then_(_ => {
                 let editEngineState = StateLogicService.getEditEngineState();
                 let runEngineState = StateLogicService.getRunEngineState();

                 (
                   GameObjectComponentEngineService.getAllArcballCameraControllerComponents(
                     editEngineState,
                   )
                   |> Js.Array.map(cameraController =>
                        ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                          cameraController,
                          editEngineState,
                        )
                      ),
                   GameObjectComponentEngineService.getAllArcballCameraControllerComponents(
                     runEngineState,
                   )
                   |> Js.Array.map(cameraController =>
                        ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                          cameraController,
                          runEngineState,
                        )
                      ),
                 )
                 |> expect == ([|true, false|], [|false|])
                 |> resolve;
               });
          },
        )
      ); */

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

      /* describe({|1.load scene wdb;
      2.create gameObject|}, () => {
        let _createGameObjects = (count, engineState) =>
          ArrayService.range(0, count - 1)
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. (engineState, gameObjects, transforms), _) => {
                 let (engineState, gameObject, tra) =
                   GameObjectToolEngine.createGameObject(engineState);

                 (
                   engineState,
                   gameObjects |> ArrayService.push(gameObject),
                   transforms |> ArrayService.push(tra),
                 );
               },
               (engineState, [||], [||]),
             );

        testPromise("test diff should be correct", () => {
          let fileName = "BoxTextured";
          let newWDBArrayBuffer =
            MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

          HeaderTool.fileLoad(
            TestTool.getDispatch(),
            BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
          )
          |> then_(_ => {
               let editEngineState = StateLogicService.getEditEngineState();
               let runEngineState = StateLogicService.getRunEngineState();

               let (editEngineState, _, eeTransforms) =
                 _createGameObjects(10, editEngineState);

               let (runEngineState, _, reTransforms) =
                 _createGameObjects(10, runEngineState);

               reTransforms
               |> Js.Array.map(reTransform =>
                    DiffComponentTool.getEditEngineComponent(
                      DiffType.Transform,
                      reTransform,
                    )
                  )
               |> expect == eeTransforms
               |> resolve;
             });
        });
      }); */

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
               expect == SceneEngineService.getSceneActiveBasicCameraView(
                           MainEditorSceneTool.unsafeGetScene(),
                           StateEngineService.unsafeGetState(),
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
      /* describe("test load twice", () => {
           let _buildWDBResult = fileName : AssetNodeType.nodeResultType => {
             let newWDBArrayBuffer =
               MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

             {
               name: "",
               type_: AssetNodeType.LoadJson,
               result: newWDBArrayBuffer,
             };
           };

           beforeEach(() => {
             IMGUITool.prepareFntData(StateLogicService.getEditEngineState())
             |> StateLogicService.setEditEngineState;
             IMGUITool.prepareFntData(StateLogicService.getRunEngineState())
             |> StateLogicService.setRunEngineState;

             IMGUITool.stubCanvasParentAndCanvas(sandbox) |> ignore;
           });

           describe("test imgui", () =>
             describe(
               {|1.load Scene.wdb;
               2.load BoxTextured.wdb;|}, () =>
               testPromise(
                 "imgui func after second load should be default scene imgui func",
                 () => {
                 let runEngineState = StateLogicService.getRunEngineState();
                 let runEngineState =
                   DirectorToolEngine.runWithDefaultTime(runEngineState);
                 StateLogicService.setRunEngineState(runEngineState);

                 HeaderLoadWDBUtils.handleSceneWDB(_buildWDBResult("Scene"))
                 |> WonderBsMost.Most.drain
                 |> then_(_ =>
                      HeaderLoadWDBUtils.handleSceneWDB(
                        _buildWDBResult("BoxTextured"),
                      )
                      |> WonderBsMost.Most.drain
                      |> then_(_ => {
                           let state = StateLogicService.getEditEngineState();

                           IMGUITool.unsafeGetIMGUIFuncStr(state)
                           |>
                           expect == (
                                       _getDefaultSceneIMGUIFuncStr()
                                       |> StringTool.removeNewLinesAndSpaces
                                     )
                           |> resolve;
                         })
                    );
               })
             )
           );
         }); */
    });
  });