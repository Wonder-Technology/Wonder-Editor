open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorGeometry component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test change geometry", () => {
        describe("test snapshot", () => {
          test("test show select geometry group widget", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            let component =
              BuildComponentTool.buildGeometry(
                TestTool.buildEmptyAppState(),
                currentGameObjectGeometry,
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.triggerClickShowGeometryGroup,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test hide select geometry group widget", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            let component =
              BuildComponentTool.buildGeometry(
                TestTool.buildEmptyAppState(),
                currentGameObjectGeometry,
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.triggerClickShowGeometryGroup,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.triggerClickHideGeometryGroup,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () => {
          test("test the current gameObject geometry should is Cube", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            GeometryEngineService.getGeometryName(currentGameObjectGeometry)
            |> StateLogicService.getEngineStateToGetData
            |> expect == "Cube";
          });
          test(
            "test change geometry to be Sphere, the current gameObject geometry should is Sphere",
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

              GeometryEngineService.getGeometryName(newGameObjectGeometry)
              |> StateLogicService.getEngineStateToGetData
              |> expect == "Sphere";
            },
          );
        });
      });
    });
  });