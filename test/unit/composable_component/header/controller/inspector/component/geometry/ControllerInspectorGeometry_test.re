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
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test change geometry should change edit and run engineState", () => {
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
          () =>
          test(
            "test currentSceneTreeNode's geometry component should be Sphere",
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

            let newGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            (
              StateLogicService.getEditEngineState()
              |> GeometryEngineService.unsafeGetGeometryName(
                   DiffComponentTool.getEditEngineComponent(
                     DiffType.Geometry,
                     newGameObjectGeometry,
                   ),
                 ),
              StateLogicService.getRunEngineState()
              |> GeometryEngineService.unsafeGetGeometryName(newGameObjectGeometry),
            )
            |> expect == ("Sphere", "Sphere");
          })
        );
      });
    });
  });