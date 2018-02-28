open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Header ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildHeaderComponent = () =>
        ReactTestRenderer.create(
          <Header
            store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
            dispatch=(TestToolUI.getDispatch())
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEditor.prepareDefaultScene(
            MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          beforeEach(() => TestToolEditor.closeContractCheck());
          afterEach(() => TestToolEditor.openContractCheck());
          test(
            "header ui component",
            () => _buildHeaderComponent() |> ReactTestTool.createSnapshot
          )
        }
      )
    }
  );