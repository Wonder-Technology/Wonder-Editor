open Wonder_jest;

open ExpectJs;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "mainEditor inspector component",
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
        "create mainEditor inspector snapshot",
        (_) => {
          UITestTool.initMainEditor(sandbox);
          let component =
            ReactTestRenderer.create(
              <MainEditorInspector
                store=(UITestTool.buildFakeAppState())
                dispatch=(UITestTool.getDispatch())
              />
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
    }
  );