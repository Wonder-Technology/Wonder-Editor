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
          MainEditorDatabaseToolEditor.buildFakeLocalStorage();
          sandbox := createSandbox()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "the extension value set in database should == get extension value",
        () => {
          let value = "this is the value";
          AppExtensionUtils.setExtension(
            MainEditorDatabaseToolEditor.getExtensionTestKey(),
            value
          );
          AppExtensionUtils.getExtension(
            MainEditorDatabaseToolEditor.getExtensionTestKey()
          )
          |> Js.Option.getExn
          |> expect == value
        }
      )
    }
  );