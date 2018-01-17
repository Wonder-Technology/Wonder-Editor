open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine: init main",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "set canvas id",
        () => {
          TestToolEngine.prepareTime();
          let querySelectorAll = MainToolEngine.buildFakeDomForPassCanvasId(~id="webgl", sandbox);
          let (editorState, engineState) = MainEditorViewToolEngine.init(sandbox);
          expect(querySelectorAll) |> toCalledWith([|"#webgl"|])
        }
      );
      test(
        "set isDebug to be true",
        () => {
          TestToolEngine.prepare(sandbox);
          let (editorState, engineState) = MainEditorViewToolEngine.init(sandbox);
          MainToolEngine.getIsDebug() |> expect == true
        }
      )
    }
  );