open Wonder_jest;

open ExpectJs;

/* open MainEditorTransformMethod; */
open MainEditorTransform.Method;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "mainEditor inspector transform component",
    (_) => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "create mainEditor inspector transform snapshot",
        (_) => {
          TestToolUI.initMainEditor(sandbox);
          let component =
            ReactTestRenderer.create(
              <MainEditorTransform
                store=(TestToolUI.buildFakeAppState())
                dispatch=(TestToolUI.getDispatch())
              />
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "changeX should set current gameObject localposition x value,truncate 6 decimal",
        (_) => {
          changeX(1.1);
          let (x, y, z) = getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
          expect(x) == "1.1"
        }
      );
      test(
        "changeY should set current gameObject localposition y value,truncate 6 decimal",
        (_) => {
          changeY(1.3454567);
          let (x, y, z) = getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
          expect(y) == "1.345457"
        }
      );
      test(
        "changeZ should set current gameObject localposition z,truncate 6 decimal",
        (_) => {
          changeZ(1.2531613);
          let (x, y, z) = getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
          Js.log(z);
          expect(z) == "1.253161"
        }
      )
    }
  );