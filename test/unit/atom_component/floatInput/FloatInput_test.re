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

        let onChangeFunc = SinonTool.createOneLengthStub(sandbox^);
        let onBlurFunc = SinonTool.createOneLengthStub(sandbox^);

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
            "requestPointerLock": SinonTool.createOneLengthStub(sandbox^),
          },
          "movementX": movementX,
          "movementY": movementY,
        }
        |> Obj.magic;

      describe("test drag start", () => {
        test("request target pointerLock", () => {
          let send = SinonTool.createOneLengthStub(sandbox^);
          let event = _buildFakeEvent(~sandbox, ());

          FloatInput.Method.handleDragStart(event, send);

          event##target##requestPointerLock |> expect |> toCalledOnce;
        });
        describe("send DragStart", () => {
          test("test send", () => {
            let send = SinonTool.createOneLengthStub(sandbox^);
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
          let send = SinonTool.createOneLengthStub(sandbox^);
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
            let send = SinonTool.createOneLengthStub(sandbox^);
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
        let _handleDragDrop =
            (
              ~send,
              ~state,
              ~event=_buildFakeEvent(~sandbox, ()),
              ~onDragDrop=SinonTool.createOneLengthStub(sandbox^),
              (),
            ) =>
          FloatInput.Method.handleDragDrop(event, (send, state), onDragDrop);

        describe("if not drag start", () =>
          test("not exec onDragDrop", () => {
            let onDragDrop = SinonTool.createOneLengthStub(sandbox^);
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = FloatInputTool.buildState(~isDragStart=false, ());

            _handleDragDrop(~send, ~state, ~onDragDrop, ());

            onDragDrop |> expect |> not_ |> toCalled;
          })
        );

        describe("else", () => {
          let document = ref(Obj.magic(-1));

          let _prepareDocument = [%raw
            sandbox => {|
 document.exitPointerLock = sandbox.stub();

 return document;
  |}
          ];

          beforeEach(() => document := _prepareDocument(sandbox^));

          test("exec onDragDrop", () => {
            let onDragDrop = SinonTool.createOneLengthStub(sandbox^);
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = FloatInputTool.buildState(~isDragStart=true, ());

            _handleDragDrop(~send, ~state, ~onDragDrop, ());

            onDragDrop |> expect |> toCalledOnce;
          });
          test("exit pointer lock", () => {
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = FloatInputTool.buildState(~isDragStart=true, ());

            _handleDragDrop(~send, ~state, ());

            Obj.magic(document^)##exitPointerLock |> expect |> toCalledOnce;
          });
          test("send DragDrop", () => {
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = FloatInputTool.buildState(~isDragStart=true, ());

            _handleDragDrop(~send, ~state, ());

            send |> expect |> toCalledWith([|FloatInput.DragDrop|]);
          });
        });
      });
    });
  });