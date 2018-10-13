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
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState
      );

      describe("test rename gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          )
        );

        describe("test logic", () =>
          describe("test engine", () => {
            let _getName = () =>
              GameObjectEngineService.unsafeGetGameObjectName(
                SceneEditorService.unsafeGetCurrentSceneTreeNode
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
      });
    });
  });