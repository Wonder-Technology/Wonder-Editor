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
                               {|function (param, apiJsObj, state) {
                    return param[1](param[0], apiJsObj, state);
                  }|}
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
      /* describe
         ("bbb",
         (
         () => {

         let buildOneCameraToRunEngineState = () => {

           let editorState =
             StateEditorService.getState() |> DefaultSceneUtils.computeDiffValue;


           let (editorState, runEngineState, camera1) =
             CameraEngineService.createCameraForRunEngineState(
               editorState,
               StateLogicService.getRunEngineState(),
             );



           runEngineState
           /* |> GameObjectComponentEngineService.getBasicCameraViewComponent(camera2)
           |. BasicCameraViewEngineService.activeBasicCameraView(runEngineState)
           |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ())) */
           |> StateLogicService.setRunEngineState;

           editorState |> StateEditorService.setState |> ignore;
         };


           beforeEach(()=>{




           });

          testPromise(
          "aaa",
          (
          () => {
            /* TODO test runEngineState */

         /* buildOneCameraToRunEngineState(); */
               DirectorToolEngine.prepareAndInitAllEnginState();

                       let fileName = "Scene";
                       let newWdbArrayBuffer =
                         MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);


                     HeaderTool.fileLoad(
                         TestTool.getDispatch(),
                         BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
                       )
                       |> then_(_ => {
         let state = StateLogicService.getEditEngineState();

                           Wonderjs.ManageIMGUIMainService.getIMGUIFunc(state)
                           |> OptionService.unsafeGet
                           |> Obj.magic
                           |> Wonderjs.SerializeService.serializeFunction
                           |> expect == "" |> resolve




                          });

          })
          );
         })
         ); */
    });
  });