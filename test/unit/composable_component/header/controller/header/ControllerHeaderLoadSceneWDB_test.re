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
              let newWdbArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

              HeaderTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
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
              let newWdbArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

              HeaderTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
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
            let newWdbArrayBuffer =
              MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

            HeaderTool.fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
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
          "editEngineState and runEngineState should all not bind scene wdb->arcball cameraControllers(ee bind editCamera->arcball cameraController)",
          () => {
            let fileName = "Scene";
            let newWdbArrayBuffer =
              MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

            HeaderTool.fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
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

      describe("test load twice", () => {
        let _buildWDBResult = fileName : AssetNodeType.nodeResultType => {
          let newWdbArrayBuffer =
            MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

          {
            name: "",
            type_: AssetNodeType.LoadJson,
            result: newWdbArrayBuffer,
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

              WonderLog.Log.print("before load first") |> ignore;

              HeaderUtils.handleSceneWdb(_buildWDBResult("Scene"))
              /* |> WonderBsMost.Most.tap(_ => {
                   WonderLog.Log.print("after load first") |> ignore;
                   /* WonderLog.Log.print("begin load second") |> ignore; */
                 }) */
              |> WonderBsMost.Most.drain
              |> then_(_ =>
                   HeaderUtils.handleSceneWdb(_buildWDBResult("BoxTextured"))
                   |> WonderBsMost.Most.drain
                   |> then_(_ => {
                        WonderLog.Log.print("finish load second") |> ignore;

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