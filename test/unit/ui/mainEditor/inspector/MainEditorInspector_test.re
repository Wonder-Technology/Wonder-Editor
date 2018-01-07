open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "MainEditorInspector ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "if hasn't currentGameObject",
        () => {
          TestToolUI.initMainEditor(sandbox);
          let component =
            ReactTestRenderer.create(
              <MainEditorInspector
                store=(TestToolUI.buildEmptyAppState())
                dispatch=(TestToolUI.getDispatch())
              />
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "else has currentGameObject",
        () => {
          TestToolUI.initMainEditor(sandbox);
          MainEditorInspectorToolEditor.setCurrentGameObject(2);
          let component =
            ReactTestRenderer.create(
              <MainEditorInspector
                store=(TestToolUI.buildEmptyAppState())
                dispatch=(TestToolUI.getDispatch())
              />
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
    }
  );