open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("SceneTreeInspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare currentSelectSource is SceneTree", () => {
      beforeEach(() =>
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          SceneTreeWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState
      );

      describe("test rename gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          )
        );

        describe("test logic", () =>
          describe("test engine", () => {
            let _getName = () =>
              GameObjectEngineService.unsafeGetGameObjectName(
                SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
                |> StateLogicService.getEditorState,
              )
              |> StateLogicService.getEngineStateToGetData;

            test("test rename gameObject ", () => {
              let newName = "gameObjectNewName";

              SceneTreeInspectorTool.renameGameObject(~name=newName, ());

              _getName() |> expect == newName;
            });
          })
        );

        describe("test rename scene", () =>
          test("ui->scene tree->scene node->name should be updated", () => {
            let newName = "gameObjectNewName";

            SceneTreeInspectorTool.renameGameObject(
              ~name=newName,
              ~gameObject=
                SceneEngineService.getSceneGameObject
                |> StateLogicService.getEngineStateToGetData,
              (),
            );

            BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });

      describe("test show Scene inspector", () =>
        test("should show component ui", () => {
          MainEditorSceneTool.addSceneGameObjectComponentTypeToMap();

          MainEditorSceneTreeTool.Select.selectGameObject(
            ~gameObject=
              SceneEngineService.getSceneGameObject(
                StateEngineService.unsafeGetState(),
              ),
            (),
          );

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });
  });