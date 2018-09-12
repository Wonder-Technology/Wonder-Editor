open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorMaterialType;

let _ =
  describe("controller mainEditorGeometry", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
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
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test change geometry should change engineState", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        )
      );

      describe("test change geometry", () => {
        beforeEach(() => DirectorToolEngine.prepareAndInitAllEnginState());

        describe(
          "test change currentSceneTreeNode's Cube geometry to be Sphere geometry",
          () => {
          describe("remove currentSceneTreeNode's Cube geometry component", () =>
            test(
              "test add Cube geometry component again and again, currentSceneTreeNode's geometry should be Cube",
              () => {
                let component =
                  BuildComponentTool.buildGeometry(
                    TestTool.buildEmptyAppState(),
                    GameObjectTool.getCurrentGameObjectGeometry(),
                  );

                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.triggerClickShowGeometryGroup,
                );
                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.getSphereDomIndex()
                  |> MainEditorGeometryTool.triggerClickSpecificGeometry,
                );

                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.triggerClickShowGeometryGroup,
                );
                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.getCubeDomIndex()
                  |> MainEditorGeometryTool.triggerClickSpecificGeometry,
                );

                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.triggerClickShowGeometryGroup,
                );
                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.getSphereDomIndex()
                  |> MainEditorGeometryTool.triggerClickSpecificGeometry,
                );

                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.triggerClickShowGeometryGroup,
                );
                BaseEventTool.triggerComponentEvent(
                  component,
                  MainEditorGeometryTool.getCubeDomIndex()
                  |> MainEditorGeometryTool.triggerClickSpecificGeometry,
                );

                let newGameObjectGeometry =
                  GameObjectTool.getCurrentGameObjectGeometry();

                StateEngineService.unsafeGetState()
                |> GeometryEngineService.unsafeGetGeometryName(
                     newGameObjectGeometry,
                   )
                |> expect == "Cube";
              },
            )
          );

          test("add currentSceneTreeNode's Sphere geometry component", () => {
            let component =
              BuildComponentTool.buildGeometry(
                TestTool.buildEmptyAppState(),
                GameObjectTool.getCurrentGameObjectGeometry(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.triggerClickShowGeometryGroup,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.getSphereDomIndex()
              |> MainEditorGeometryTool.triggerClickSpecificGeometry,
            );

            let newGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            StateEngineService.unsafeGetState()
            |> GeometryEngineService.unsafeGetGeometryName(
                 newGameObjectGeometry,
               )
            |> expect == "Sphere";
          });
        });
      });
    });
  });