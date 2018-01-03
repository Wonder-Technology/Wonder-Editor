open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform.Method;

let _ =
  describe(
    "MainEditorTransform ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildMainEditorTransformComponent = () =>
        ReactTestRenderer.create(
          <MainEditorTransform
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "create mainEditor transform ui component",
        () => {
          let component = _buildMainEditorTransformComponent();
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      describe(
        "changeX should set current gameObject local position's x",
        () => {
          let _changeXEvent = (value, domChildren) => {
            let xDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
            let xInput = WonderCommonlib.ArraySystem.unsafeGet(xDiv##children, 1);
            EventToolUI.triggerChangeEvent(xInput, EventToolUI.buildFormEvent(value))
          };
          test(
            "set x value to floatInput",
            () => {
              let value = "-10.1213";
              let component = _buildMainEditorTransformComponent();
              EventToolUI.triggerComponentEvent(component, _changeXEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          describe(
            "set engine x value",
            () => {
              describe(
                "if value's decimal digits <= 6, can set the whole value to engine",
                () => {
                  test(
                    "test < 6",
                    () => {
                      let value = "-11.11111";
                      let component = _buildMainEditorTransformComponent();
                      EventToolUI.triggerComponentEvent(component, _changeXEvent(value));
                      let (xFromEngine, _, _) =
                        getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                      expect(xFromEngine) == value
                    }
                  );
                  test(
                    "test = 6",
                    () => {
                      let value = "-11.111112";
                      let component = _buildMainEditorTransformComponent();
                      EventToolUI.triggerComponentEvent(component, _changeXEvent(value));
                      let (xFromEngine, _, _) =
                        getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                      expect(xFromEngine) == value
                    }
                  )
                }
              );
              describe(
                "else",
                () => {
                  test(
                    "can't set the value to engine",
                    () => {
                      let value = "-14.6613123";
                      let component = _buildMainEditorTransformComponent();
                      EventToolUI.triggerComponentEvent(component, _changeXEvent(value));
                      let (xFromEngine, _, _) =
                        getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                      expect(xFromEngine) == "0"
                    }
                  );
                  test(
                    "get the x from engine should == last value",
                    () => {
                      let component = _buildMainEditorTransformComponent();
                      let value1 = "-1.111222";
                      let value2 = "-14.6613123";
                      EventToolUI.triggerComponentEvent(component, _changeXEvent(value1));
                      EventToolUI.triggerComponentEvent(component, _changeXEvent(value2));
                      let (xFromEngine, _, _) =
                        getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                      expect(xFromEngine) == value1
                    }
                  )
                }
              )
            }
          )
        }
      );
      describe(
        "changeY should set current gameObject local position's y",
        () => {
          let _changeYEvent = (value, domChildren) => {
            let yDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
            let yInput = WonderCommonlib.ArraySystem.unsafeGet(yDiv##children, 1);
            EventToolUI.triggerChangeEvent(yInput, EventToolUI.buildFormEvent(value))
          };
          test(
            "set y value to floatInput",
            () => {
              let value = "25.21246";
              let component = _buildMainEditorTransformComponent();
              EventToolUI.triggerComponentEvent(component, _changeYEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          describe(
            "set engine y value",
            () => {
              test(
                "if value's decimal digits <= 6, can set the whole value to engine",
                () => {
                  let value = "-11.111112";
                  let component = _buildMainEditorTransformComponent();
                  EventToolUI.triggerComponentEvent(component, _changeYEvent(value));
                  let (_, yFromEngine, _) =
                    getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                  expect(yFromEngine) == value
                }
              );
              test(
                "else, get the y from engine should == last value",
                () => {
                  let component = _buildMainEditorTransformComponent();
                  let value1 = "-1.111222";
                  let value2 = "-14.66132133";
                  EventToolUI.triggerComponentEvent(component, _changeYEvent(value1));
                  EventToolUI.triggerComponentEvent(component, _changeYEvent(value2));
                  let (_, yFromEngine, _) =
                    getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                  expect(yFromEngine) == value1
                }
              )
            }
          )
        }
      );
      describe(
        "changeZ should set current gameObject local position's z",
        () => {
          let _changeZEvent = (value, domChildren) => {
            let zDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
            let zInput = WonderCommonlib.ArraySystem.unsafeGet(zDiv##children, 1);
            EventToolUI.triggerChangeEvent(zInput, EventToolUI.buildFormEvent(value))
          };
          test(
            "set z value to floatInput",
            () => {
              let value = "155.2164";
              let component = _buildMainEditorTransformComponent();
              EventToolUI.triggerComponentEvent(component, _changeZEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          describe(
            "set engine z value",
            () => {
              test(
                "if value's decimal digits <= 6, can set the whole value to engine",
                () => {
                  let value = "-11.111112";
                  let component = _buildMainEditorTransformComponent();
                  EventToolUI.triggerComponentEvent(component, _changeZEvent(value));
                  let (_, _, zFromEngine) =
                    getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                  expect(zFromEngine) == value
                }
              );
              test(
                "else, get the z from engine should == last value",
                () => {
                  let component = _buildMainEditorTransformComponent();
                  let value1 = "-1.23435";
                  let value2 = "-24.6613123";
                  EventToolUI.triggerComponentEvent(component, _changeZEvent(value1));
                  EventToolUI.triggerComponentEvent(component, _changeZEvent(value2));
                  let (_, _, zFromEngine) =
                    getLocalPosition() |> MainEditorTransform.Method.truncateTransformValue;
                  expect(zFromEngine) == value1
                }
              )
            }
          )
        }
      )
    }
  );