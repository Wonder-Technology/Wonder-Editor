open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Operate database",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeAll(
        () => {
          DatabaseToolLogic.buildFakeLocalStorage();
          sandbox := createSandbox()
        }
      );
      afterAll(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "the extension value set in database should == get extension value",
        () => {
          let value = "the is the value";
          AppExtensionView.setExtension(AppExtensionView.getStorageParentKey(), value);
          AppExtensionView.getExtension(AppExtensionView.getStorageParentKey())
          |> (
            (val_) =>
              switch val_ {
              | None =>
                ExcepetionHandleSystem.throwMessage("the get extension key is not in database")
              | Some(val_) => val_ |> expect == value
              }
          )
        }
      )
    }
  );