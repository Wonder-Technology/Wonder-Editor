open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("FloatInput", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test FloatInput component set float value", () => {
      let _test = (value, onChangeValue, onBlurValue) => {
        open FloatInput;
        let state = {inputValue: None, originValue: "", isDragStart: false};

        let onChangeFunc = createEmptyStubWithJsObjSandbox(sandbox);
        let onBlurFunc = createEmptyStubWithJsObjSandbox(sandbox);

        let state =
          FloatInputTool.reducer(
            ~onChangeFunc=Some(onChangeFunc),
            ~onBlurFunc=Some(onBlurFunc),
            ~canBeZero=Some(false),
            ~action=Change(Some(value)),
            ~state,
            (),
          )
          |> ReactTool.getUpdateState;

        let state =
          FloatInputTool.reducer(
            ~onChangeFunc=Some(onChangeFunc),
            ~onBlurFunc=Some(onBlurFunc),
            ~canBeZero=Some(false),
            ~action=Blur,
            ~state,
            (),
          )
          |> ReactTool.getUpdateState;

        (
          onChangeFunc |> getCallCount,
          onBlurFunc |> getCallCount,
          onChangeFunc |> SinonTool.calledWith(_, onChangeValue),
          onBlurFunc |> SinonTool.calledWith(_, onBlurValue),
        )
        |> expect == (1, 1, true, true);
      };

      test("if float value's decimal digits <= 5, can set the whole value", () =>
        _test("351687.54654", 351687.54654, 351687.54654)
      );
      test("else, still set the whole value", () =>
        _test("351687.54654111", 351687.54654111, 351687.54654111)
      );
    });
  });