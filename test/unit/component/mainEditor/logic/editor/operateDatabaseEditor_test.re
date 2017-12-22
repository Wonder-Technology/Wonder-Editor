open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "editor: operate database",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          DatabaseToolEditor.buildFakeLocalStorage();
          sandbox := createSandbox()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "the extension value set in database should == get extension value",
        () => {
          let value = "the is the value";
          DatabaseToolEditor.setExtension(DatabaseToolEditor.getExtensionTestKey(), value);
          DatabaseToolEditor.getExtension(DatabaseToolEditor.getExtensionTestKey())
          |> Js.Option.getExn
          |> expect == value
        }
      )
    }
  );