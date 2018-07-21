open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorMaterialType;

let _ =
  describe("MainEditorBasicMaterial", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) =>
      ArrayService.(getNth(index, array));
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGlWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test set currentSceneTreeNode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        )
      );

      describe("test change color should set current gameObject color", () =>
        describe("test snapshot", () => {
          let triggerChangeMaterialTypeEvent = (value, domChildren) => {
            let selectDiv = _getFromArray(domChildren, 0);
            let selectArticle = _getFromArray(selectDiv##children, 0);
            let select = _getFromArray(selectArticle##children, 1);
            BaseEventTool.triggerChangeEvent(
              select,
              BaseEventTool.buildFormEvent(value |> string_of_int),
            );
          };
          test("show color picker component for change color", () => {
            let component = BuildComponentTool.buildMaterial();

            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("close color picker component", () => {
            WonderLog.Log.printJson(Wonderjs.StateDataMain.stateData.isDebug)
            |> ignore;

            let component = BuildComponentTool.buildMaterial();
            let materialType = BasicMaterial |> convertMaterialTypeToInt;

            BaseEventTool.triggerComponentEvent(
              component,
              triggerChangeMaterialTypeEvent(materialType),
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        })
      );
    });
  });