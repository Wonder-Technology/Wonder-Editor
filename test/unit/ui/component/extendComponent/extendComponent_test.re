open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "panel extension component",
    (_) =>
      test(
        "accord to user json data, build component",
        (_) => {
          let component =
            ReactTestRenderer.create(
              <PanelExtensionComponent
                record=(ExtensionTool.buildFakePanelExtensionRecord())
                name="fakeComponent"
                store=(TestToolUI.buildFakeAppState())
              />
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
  );
