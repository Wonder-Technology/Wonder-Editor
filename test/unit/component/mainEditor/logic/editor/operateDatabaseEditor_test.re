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
          DatabaseToolLogic.buildFakeLocalStorage();
          sandbox := createSandbox()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "the extension value set in database should == get extension value",
        () => {
          let value = "the is the value";
          AppExtensionView.setExtension(AppExtensionView.getStorageParentKey(), value);
          AppExtensionView.getExtension(AppExtensionView.getStorageParentKey())
          |> Js.Option.getExn
          |> expect == value
        }
      )
    }
  );