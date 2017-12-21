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
        "create snap shot",
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
      )
    }
  );