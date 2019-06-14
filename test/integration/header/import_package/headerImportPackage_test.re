open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

open NodeAssetType;

let _ =
  describe("header import package", () => {
    let sandbox = getSandboxDefaultVal();

    let directionPointLightsAndCubeWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      directionPointLightsAndCubeWDBArrayBuffer :=
        WDBTool.generateDirectionPointLightsAndCubeWDB()
    );

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      "shouldn't warn exceed max count when c1(current scene(before import package)->total light count) + c2(scene wdb->total light count) is exceed but c2 is not exceed",
      () => {
        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                ~loopPipelines=
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
                (),
              ),
            (),
          );

          MainEditorSceneTool.prepareScene(sandbox);

          DirectorToolEngine.prepareAndInitAllEnginState();
        });

        testPromise("test", () => {
          ConsoleTool.notShowMessage();
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "warn",
            );
          let editorState = StateEditorService.getState();
          let engineState = StateEngineService.unsafeGetState();
          let (editorState, engineState, light1) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );
          let (editorState, engineState, light2) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );
          let (editorState, engineState, light3) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );
          let (editorState, engineState, light4) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );

          let engineState =
            SceneEngineService.addSceneChildren(
              [|light1, light2, light3, light4|],
              engineState,
            );
          editorState |> StateEditorService.setState |> ignore;
          engineState |> StateEngineService.setState |> ignore;

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId =>
               ImportPackageTool.testImportPackage(
                 ~execBeforeImportFunc=
                   _ => {
                     let editorState = StateEditorService.getState();
                     let engineState = StateEngineService.unsafeGetState();

                     let engineState =
                       engineState
                       |> SceneEngineService.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial
                       |> JobEngineService.execDisposeJob;

                     let (editorState, engineState, light5) =
                       PrimitiveLogicService.createDirectionLight(
                         editorState,
                         engineState,
                       );

                     let engineState =
                       SceneEngineService.addSceneChild(light5, engineState);

                     editorState |> StateEditorService.setState |> ignore;
                     engineState |> StateEngineService.setState |> ignore;
                   },
                 ~testFunc=() => warn |> expect |> not_ |> toCalled |> resolve,
                 (),
               )
             );
        });
      },
    );
  });