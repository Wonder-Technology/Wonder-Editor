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
    describe("test set currentSceneTreeNode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        )
      );

      describe("test change material", () => {
        describe("test snapshot", () => {
          test("test show default light material component", () =>
            BuildComponentTool.buildMaterial()
            |> ReactTestTool.createSnapshotAndMatch
          );
          test("test change to basic material component", () => {
            DirectorToolEngine.prepareAndInitAllEnginState();

            MainEditorBasicMaterialTool.changeMaterialTypeToBeBaiscMaterial();

            BuildComponentTool.buildMaterial()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () => {
          beforeEach(() => DirectorToolEngine.prepareAndInitAllEnginState());

          test(
            "currentSceneTreeNode's default material should be lightMaterial",
            () => {
            let materialType =
              MainEditorMaterialUtils.getMaterialTypeByGameObject(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData;

            materialType |> expect == MainEditorMaterialType.LightMaterial;
          });

          describe(
            "test change currentSceneTreeNode's lightMaterial to basicMaterial",
            () => {
            test(
              "test currentSceneTreeNode's material component should be basicMaterial",
              () => {
              MainEditorBasicMaterialTool.changeMaterialTypeToBeBaiscMaterial();

              GameObjectComponentEngineService.hasBasicMaterialComponent(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == true;
            });
            test(
              "test gameObject should move from lightMaterialRenderArray to basicMaterialRenderArray",
              () => {
                let (basicMaterialRenderCount, lightMaterialRenderCount) =
                  MeshRendererToolEngine.getAllRenderArrayCount();

                MainEditorBasicMaterialTool.changeMaterialTypeToBeBaiscMaterial();

                MeshRendererToolEngine.getAllRenderArrayCount()
                |>
                expect == (
                            basicMaterialRenderCount + 1,
                            lightMaterialRenderCount - 1,
                          );
              },
            );
            test("should remove lightMaterial instead of dispose it", () => {
              let currentGameObject =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();
              let engineState = StateEngineService.unsafeGetState();
              let oldLightMaterial =
                GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                  currentGameObject,
                  engineState,
                );

              MainEditorBasicMaterialTool.changeMaterialTypeToBeBaiscMaterial();

              let engineState = StateEngineService.unsafeGetState();
              (
                LightMaterialToolEngine.isAlive(oldLightMaterial, engineState),
                GameObjectComponentEngineService.hasLightMaterialComponent(
                  currentGameObject,
                  engineState,
                ),
              )
              |> expect == (true, false);
            });
          });
        });
      });

      describe("deal with specific case", () =>
        describe(
          "test MainEditorMaterialUtils getMaterialTypeByGameObject function",
          () =>
          test(
            "test if gameObject haven't material component, should throw error",
            () =>
            expect(() => {
              MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode();

              MainEditorMaterialUtils.getMaterialTypeByGameObject(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getEngineStateToGetData;
            })
            |> toThrowMessageRe([%re {|/getMaterialTypeByGameObject/img|}])
          )
        )
      );
    });
  });