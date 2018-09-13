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
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
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
      let _getDefaultSceneIMGUIFuncStr = () => {|function (param, apiJsObj, state) {
                    return param[1](param[0], apiJsObj, state);
                  }|};

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      describe("test imgui", () => {
        describe("test editEngineState", () => {
          describe("if scene wdb's imgui exist", () =>
            testPromise(
              "should set scene wdb's imgui + default scene imgui", () => {
              let fileName = "Scene";
              let newWDBArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

              HeaderTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
              )
              |> then_(_ => {
                   let state = StateLogicService.getEditEngineState();

                   IMGUITool.unsafeGetIMGUIFuncStr(state)
                   |>
                   expect == (
                               {|function (param, apiJsObj, state) {
                    var match = param[1];
                    var match$1 = param[0];
                    var state$1 = match$1[1](match$1[0], apiJsObj, state);
                    return match[0](match[1], apiJsObj, state$1);
                  }|}
                               |> StringTool.removeNewLinesAndSpaces
                             )
                   |> resolve;
                 });
            })
          );

          describe("else", () =>
            testPromise("should set default scene imgui", () => {
              let fileName = "BoxTextured";
              let newWDBArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

              HeaderTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
              )
              |> then_(_ => {
                   let state = StateLogicService.getEditEngineState();

                   IMGUITool.unsafeGetIMGUIFuncStr(state)
                   |>
                   expect == (
                               _getDefaultSceneIMGUIFuncStr()
                               |> StringTool.removeNewLinesAndSpaces
                             )
                   |> resolve;
                 });
            })
          );
        });

        describe("test runEngineState", () =>
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
        );
      });

      describe("test bind arcball event", () =>
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

      describe({|1.load scene wdb;
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
      });

      testPromise(
        "ee should not active wdb->camera, but re should active it", () => {
        let editEngineState = StateLogicService.getEditEngineState();
        let eeCurrentCameraGameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(editEngineState);
        let runEngineState = StateLogicService.getRunEngineState();
        let reCurrentCameraGameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(runEngineState);

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

             let reCurrentCameraGameObjectOfWDB =
               MainEditorCameraTool.getCurrentCameraGameObject(
                 runEngineState,
               );
             (
               MainEditorCameraTool.getCurrentCameraGameObject(
                 editEngineState,
               ),
               MainEditorCameraTool.getCurrentCameraGameObject(
                 runEngineState,
               ),
               JudgeTool.isEqual(
                 reCurrentCameraGameObject,
                 reCurrentCameraGameObjectOfWDB,
               ),
             )
             |>
             expect == (
                         eeCurrentCameraGameObject,
                         reCurrentCameraGameObjectOfWDB,
                         false,
                       )
             |> resolve;
           });
      });

      describe("test load twice", () => {
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

              HeaderLoadWDBUtils.handleSceneWDB(
                _buildWDBResult("Scene").result
                |> FileReader.convertResultToArrayBuffer,
              )
              |> WonderBsMost.Most.drain
              |> then_(_ =>
                   HeaderLoadWDBUtils.handleSceneWDB(
                     _buildWDBResult("BoxTextured").result
                     |> FileReader.convertResultToArrayBuffer,
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
      });
    });
  });