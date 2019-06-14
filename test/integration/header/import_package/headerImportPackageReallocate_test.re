open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

open NodeAssetType;

let _ =
  describe("header import package->reallocate", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

    let _prepareFakeCanvas = sandbox =>
      ImportPackageTool.prepareFakeCanvas(sandbox);

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
    });

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("reallocate geometry", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~buffer=
            SettingToolEngine.buildBufferConfigStr(
              ~geometryPointCount=5000,
              ~geometryCount=5,
              (),
            ),
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

        _prepareFakeCanvas(sandbox) |> ignore;
      });

      testPromise(
        "if geometry-buffer-use percent >= 10%, reallocate geometry to new buffer",
        () =>
        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             let engineState = StateEngineService.unsafeGetState();

             let verticesBeforeImport =
               GeometryToolEngine.getVertices(engineState);

             ImportPackageTool.testImportPackage(
               ~testFunc=
                 () => {
                   let engineState = StateEngineService.unsafeGetState();
                   JudgeTool.isSame(
                     GeometryToolEngine.getVertices(engineState),
                     verticesBeforeImport,
                   )
                   |> expect == false
                   |> resolve;
                 },
               (),
             );
           })
      );
    });
  });