open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("StringInput", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      open StringInput;

      let state = {inputValue: "", originalName: "origin"};

      let onChangeFunc = SinonTool.createOneLengthStub(sandbox^);
      let onBlurFunc = SinonTool.createOneLengthStub(sandbox^);

      (state, onChangeFunc, onBlurFunc);
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test input value", () =>
      test("component can set any string", () => {
        open StringInput;
        let (state, onChangeFunc, onBlurFunc) = _prepare();

        let state =
          StringInput.reducer(
            (onChangeFunc, onBlurFunc),
            Some(false),
            Change("aaa"),
            state,
          )
          |> ReactTool.getUpdateState;

        let state =
          StringInput.reducer(
            (onChangeFunc, onBlurFunc),
            Some(false),
            Blur,
            state,
          )
          |> ReactTool.getUpdateState;

        (
          onChangeFunc |> getCallCount,
          onBlurFunc |> getCallCount,
          onChangeFunc |> SinonTool.calledWith(_, "aaa"),
          onBlurFunc |> SinonTool.calledWith(_, "aaa"),
          state.inputValue,
        )
        |> expect == (1, 1, true, true, "aaa");
      })
    );

    describe("deal with specific case", () => {
      test(
        "if canBeNull == true, key in '', trigger onBlur, the input value should be ''",
        () => {
          open StringInput;
          let (state, onChangeFunc, onBlurFunc) = _prepare();

          let state =
            StringInput.reducer(
              (onChangeFunc, onBlurFunc),
              Some(true),
              Change(""),
              state,
            )
            |> ReactTool.getUpdateState;

          let result =
            StringInput.reducer(
              (onChangeFunc, onBlurFunc),
              Some(true),
              Blur,
              state,
            );

          (
            onChangeFunc |> getCallCount,
            onBlurFunc |> getCallCount,
            onChangeFunc |> SinonTool.calledWith(_, ""),
            onBlurFunc |> SinonTool.calledWith(_, ""),
            state.inputValue,
            ReactTool.isNoUpdate(result),
          )
          |> expect == (1, 1, true, true, "", true);
        },
      );
      test(
        "if canBeNull == false, key in '', trigger onBlur, the input value should be original name and not trigger onBlur func",
        () => {
          open StringInput;
          let (state, onChangeFunc, onBlurFunc) = _prepare();
          let originName = state.originalName;

          let state =
            StringInput.reducer(
              (onChangeFunc, onBlurFunc),
              Some(false),
              Change(""),
              state,
            )
            |> ReactTool.getUpdateState;

          let state =
            StringInput.reducer(
              (onChangeFunc, onBlurFunc),
              Some(false),
              Blur,
              state,
            )
            |> ReactTool.getUpdateState;

          (
            onChangeFunc |> getCallCount,
            onBlurFunc |> getCallCount,
            onChangeFunc |> SinonTool.calledWith(_, ""),
            state.inputValue,
          )
          |> expect == (1, 0, true, originName);
        },
      );
    });
  });