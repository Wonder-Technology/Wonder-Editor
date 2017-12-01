open Wonder_jest;

open ExpectJs;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "mainEditor sceneTree component",
    (_) => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "create mainEditor sceneTree snapshot",
        (_) => {
          MainEditorViewTool.init(sandbox) |> MainEditorStateView.finishState;
          let component =
            ReactTestRenderer.create(
              <MainEditorSceneTree
                state=AppStore.state
                dispatch=(Reductive.Store.dispatch(IndexStore.store))
              />
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
    }
  );