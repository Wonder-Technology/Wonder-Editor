open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("FileInput", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test workflow", () => {
      test("set showInput button text", () =>
        ReactTestRenderer.create(<FileInput buttonText="showInput" />)
        |> ReactTestTool.createSnapshotAndMatch
      );
      test(
        "click the showInput button, show the textarea and submit-button", () => {
        let component =
          ReactTestRenderer.create(
            <FileInput isShowInput=true buttonText="showInput" />,
          );

        component |> ReactTestTool.createSnapshotAndMatch;
      });
      test("key in text", () => {
        let component =
          ReactTestRenderer.create(
            <FileInput
              inputValue="you can input value in textarea"
              isShowInput=true
              buttonText="showInput"
            />,
          );

        component |> ReactTestTool.createSnapshotAndMatch;
      });

      describe("submit", () => {
        test("click submit-button,the onSubmit func should be called", () => {
          open FileInput;

          let inputValue = "you can click submit after input value";
          let onSubmitFunc = createEmptyStubWithJsObjSandbox(sandbox);
          let state = {inputValue, isShowInput: true};

          FileInput.reducer(Some(onSubmitFunc), FileInput.Submit, state)
          |> ignore;

          onSubmitFunc |> expect |> toCalledWith([|inputValue|]);
        });
        test("submit trimed inputValue", () => {
          open FileInput;

          let onSubmitFunc = createEmptyStubWithJsObjSandbox(sandbox);
          let state = {inputValue: " aaa ", isShowInput: true};

          FileInput.reducer(onSubmitFunc, FileInput.Submit, state) |> ignore;

          onSubmitFunc |> expect |> toCalledWith([|"aaa"|]);
        });
      });
    });

    describe("deal with the specific case", () =>
      test(
        "if input value == '', click submit-button shouldn't handle onSubmit func",
        () => {
        open FileInput;

        let onSubmitFunc = createEmptyStubWithJsObjSandbox(sandbox);
        let state = {inputValue: "", isShowInput: true};

        FileInput.reducer(Some(onSubmitFunc), FileInput.Submit, state)
        |> ignore;

        onSubmitFunc |> expect |> not_ |> toCalled;
      })
    );
  });