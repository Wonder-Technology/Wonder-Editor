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
        let state = FloatInputTool.buildState();

        let onChangeFunc = createEmptyStubWithJsObjSandbox(sandbox);
        let onBlurFunc = createEmptyStubWithJsObjSandbox(sandbox);

        let state =
          FloatInputTool.reducer(
            ~onChangeFunc=Some(onChangeFunc),
            ~onBlurFunc=Some(onBlurFunc),
            ~canBeZero=false,
            ~action=Change(Some(value)),
            ~state,
            (),
          )
          |> ReactTool.getUpdateState;

        let state =
          FloatInputTool.reducer(
            ~onChangeFunc=Some(onChangeFunc),
            ~onBlurFunc=Some(onBlurFunc),
            ~canBeZero=false,
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

    describe("test drag header to change value", () => {
      let _buildFakeEvent = (~movementX=0, ~movementY=0, ~sandbox, ()) =>
        {
          "target": {
            "requestPointerLock": createEmptyStubWithJsObjSandbox(sandbox),
          },
          "movementX": movementX,
          "movementY": movementY,
        }
        |> Obj.magic;

      describe("test drag start", () => {
        test("request target pointerLock", () => {
          let send = createEmptyStubWithJsObjSandbox(sandbox);
          let event = _buildFakeEvent(~sandbox, ());

          FloatInput.Method.handleDragStart(event, send);

          event##target##requestPointerLock |> expect |> toCalledOnce;
        });
        describe("send DragStart", () => {
          test("test send", () => {
            let send = createEmptyStubWithJsObjSandbox(sandbox);
            let event = _buildFakeEvent(~sandbox, ());

            FloatInput.Method.handleDragStart(event, send);

            send |> expect |> toCalledWith([|FloatInput.DragStart|]);
          });
          test("set state->isDragStart to true", () => {
            open FloatInput;
            let state = FloatInputTool.buildState();

            let state =
              FloatInputTool.reducer(~action=DragStart, ~state, ())
              |> ReactTool.getUpdateState;

            state.isDragStart |> expect == true;
          });
        });
      });

      describe("test drag over", () => {
        test("if not drag start, do nothing", () => {
          let send = createEmptyStubWithJsObjSandbox(sandbox);
          let event = _buildFakeEvent(~sandbox, ());
          let state = FloatInputTool.buildState(~isDragStart=false, ());

          FloatInput.Method.handleDragOver(event, (send, state));

          send |> expect |> not_ |> toCalled;
        });

        describe("else", () => {
          open FloatInput;

          let _getNewValue = send => send |> getCall(0) |> getArgs |> List.hd;

          let _testChangeValue =
              (
                ~movementX,
                ~movementY,
                ~targetValue,
                ~inputValue="0.5",
                ~canBeZero=true,
                (),
              ) => {
            let send = createEmptyStubWithJsObjSandbox(sandbox);
            let event = _buildFakeEvent(~sandbox, ~movementX, ~movementY, ());
            let state =
              FloatInputTool.buildState(
                ~inputValue=Some(inputValue),
                ~isDragStart=true,
                ~canBeZero,
                (),
              );

            FloatInput.Method.handleDragOver(event, (send, state));

            _getNewValue(send) |> expect == Change(Some(targetValue));
          };

          test("if mouse move up, increase value", () =>
            _testChangeValue(
              ~movementX=0,
              ~movementY=-2,
              ~targetValue="0.52",
              (),
            )
          );
          test("if mouse move right, increase value", () =>
            _testChangeValue(
              ~movementX=2,
              ~movementY=0,
              ~targetValue="0.52",
              (),
            )
          );
          test("if mouse move down, decrease value", () =>
            _testChangeValue(
              ~movementX=0,
              ~movementY=2,
              ~targetValue="0.48",
              (),
            )
          );
          test("if mouse move left, decrease value", () =>
            _testChangeValue(
              ~movementX=-2,
              ~movementY=0,
              ~targetValue="0.48",
              (),
            )
          );

          describe("if change value to nearly zero", () => {
            test("if canBeZero === false, use 0.001 instead", () =>
              _testChangeValue(
                ~movementX=-2,
                ~movementY=0,
                ~inputValue="0.0201",
                ~targetValue="0.001",
                ~canBeZero=false,
                (),
              )
            );
            test("else, remain changed value", () =>
              _testChangeValue(
                ~movementX=-2,
                ~movementY=0,
                ~inputValue="0.0201",
                ~targetValue="0.0001",
                ~canBeZero=true,
                (),
              )
            );
          });
        });
      });

      describe("test drag drop", () => {
        test("if not drag start, do nothing", () => {
          let send = createEmptyStubWithJsObjSandbox(sandbox);
          let state = FloatInputTool.buildState(~isDragStart=false, ());

          FloatInput.Method.handleDragDrop((send, state));

          send |> expect |> not_ |> toCalled;
        });

        describe("else", () => {
          let _prepareDocument = [%raw
            sandbox => {|
 document.exitPointerLock = sandbox.stub();

 return document;
  |}
          ];

          test("exit pointer lock", () => {
            let send = createEmptyStubWithJsObjSandbox(sandbox);
            let state = FloatInputTool.buildState(~isDragStart=true, ());
            let document = _prepareDocument(sandbox^);

            FloatInput.Method.handleDragDrop((send, state));

            document##exitPointerLock |> expect |> toCalledOnce;
          });
          test("send Blur", () => {
            let send = createEmptyStubWithJsObjSandbox(sandbox);
            let state = FloatInputTool.buildState(~isDragStart=true, ());

            FloatInput.Method.handleDragDrop((send, state));

            send |> expect |> toCalledWith([|FloatInput.Blur|]);
          });
        });
      });
    });
  });