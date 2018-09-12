open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorMaterialType;

let _ =
  describe("controller mainEditorMaterial", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test change material should change engineState", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        )
      );

      describe("test change material", () => {
        beforeEach(() => DirectorToolEngine.prepareAndInitAllEnginState());

        describe(
          "test change currentSceneTreeNode's lightMaterial to basicMaterial",
          () =>
          test(
            "test currentSceneTreeNode's material component should be basicMaterial",
            () => {
            MainEditorMaterialTool.setMaterialTypeToBeBaiscMaterial();

            StateEngineService.unsafeGetState()
            |> GameObjectComponentEngineService.hasBasicMaterialComponent(
                 GameObjectTool.unsafeGetCurrentSceneTreeNode(),
               )
            |> expect == true;
          })
        );
      });
    });
  });