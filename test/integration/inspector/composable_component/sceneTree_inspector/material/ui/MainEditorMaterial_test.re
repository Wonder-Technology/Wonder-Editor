open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorMaterialType;

let _ =
  describe("MainEditorMaterial", () => {
    let sandbox = getSandboxDefaultVal();
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

      describe("test change material", () => {
        describe("test snapshot", () => {
          test("test show default light material component", () => {
            let component = BuildComponentTool.buildMaterial();

            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test change to basic material component", () => {
            DirectorToolEngine.prepareAllEnginState();
            DirectorToolEngine.initAllEnginState();
            let component = BuildComponentTool.buildMaterial();
            let materialType = BasicMaterial |> convertMaterialTypeToInt;

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorMaterialTool.triggerChangeMaterialTypeEvent(
                materialType,
              ),
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () => {
          beforeEach(() => {
            DirectorToolEngine.prepareAllEnginState();
            DirectorToolEngine.initAllEnginState();
          });

          test(
            "currentSceneTreeNode's default material should be light material",
            () => {
            let materialType =
              MainEditorMaterialUtils.getMaterialTypeByGameObject(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData;

            materialType |> expect == MainEditorMaterialType.LightMaterial;
          });

          describe(
            "test change currentSceneTreeNode's lightMaterial to basic material",
            () => {
            test(
              "test currentSceneTreeNode's material component should be lightMaterial",
              () => {
              let component = BuildComponentTool.buildMaterial();
              let materialType = BasicMaterial |> convertMaterialTypeToInt;

              BaseEventTool.triggerComponentEvent(
                component,
                MainEditorMaterialTool.triggerChangeMaterialTypeEvent(
                  materialType,
                ),
              );

              GameObjectComponentEngineService.hasBasicMaterialComponent(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == true;
            });
            test(
              "test gameObject should move from basicMaterialRenderArray to lightMaterialRenderArray",
              () => {
                let component = BuildComponentTool.buildMaterial();
                let materialType = BasicMaterial |> convertMaterialTypeToInt;
                let (basicMaterialRenderCount, lightMaterialRenderCount) =
                  MeshRendererToolEngine.getAllRenderArrayCount();

                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorMaterialTool.triggerChangeMaterialTypeEvent(
                    materialType,
                  ),
                );

                MeshRendererToolEngine.getAllRenderArrayCount()
                |>
                expect == (
                            basicMaterialRenderCount + 1,
                            lightMaterialRenderCount - 1,
                          );
              },
            );
          });
        });
      });
    });
  });