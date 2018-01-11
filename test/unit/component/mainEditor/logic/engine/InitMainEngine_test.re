open Wonder_jest;

let _ =
  describe(
    "engine: init main",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
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
        "set isTest to be true",
        () => {
          TestToolEngine.prepare(sandbox);
          let (editorState, engineState) = MainEditorViewToolEngine.init(sandbox);
          MainToolEngine.getIsTest() |> expect == true
        }
      )
    }
  );