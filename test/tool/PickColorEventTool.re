let triggerShowColorPickEvent = domChildren => {
  let colorArticle = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let div = WonderCommonlib.ArrayService.unsafeGet(colorArticle##children, 0);
  let button = WonderCommonlib.ArrayService.unsafeGet(div##children, 2);
  BaseEventTool.triggerClickEvent(button);
};

let triggerCloseColorPickEvent = domChildren => {
  let colorArticle = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let div = WonderCommonlib.ArrayService.unsafeGet(colorArticle##children, 0);
  let colorPickContent =
    WonderCommonlib.ArrayService.unsafeGet(div##children, 3);
  let closeDiv =
    WonderCommonlib.ArrayService.unsafeGet(colorPickContent##children, 1);

  BaseEventTool.triggerClickEvent(closeDiv);
};

let triggerChangeBasicMaterialColor = (material, color) =>
  MainEditorBasicMaterial.Method.changeColor(material, color);

let triggerChangeLightMaterialColor = (material, color) =>
  MainEditorLightMaterial.Method.changeColor(material, color);

let triggerChangeDirectionLightColor = (material, color) =>
  MainEditorDirectionLight.Method.changeColor(material, color);

let triggerChangePointLightColor = (material, color) =>
  MainEditorPointLight.Method.changeColor(material, color);

let testOperateColorPickToChangeColor =
    (
      sandbox,
      buildComponent,
      (getCurrentGameObjectComponentFunc, changeColorFunc, getColorFunc),
    ) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          describe("test change color should set current gameObject color", () => {
            describe("test snapshot", () => {
              test("show color picker component for change color", () => {
                BuildCanvasTool.buildFakeCanvas(sandbox);

                let component = buildComponent();

                BaseEventTool.triggerComponentEvent(
                  component,
                  triggerShowColorPickEvent,
                );

                component |> ReactTestTool.createSnapshotAndMatch;
              });
              test("close color picker component", () => {
                BuildCanvasTool.buildFakeCanvas(sandbox);
                let component = buildComponent();

                BaseEventTool.triggerComponentEvent(
                  component,
                  triggerShowColorPickEvent,
                );
                BaseEventTool.triggerComponentEvent(
                  component,
                  triggerCloseColorPickEvent,
                );

                component |> ReactTestTool.createSnapshotAndMatch;
              });
            });

            describe("test logic", () =>
              test("test change color should set into engine", () => {
                let currentGameObjectComponent =
                  getCurrentGameObjectComponentFunc();
                let newColor = {
                  "hex": "#7df1e8",
                  "rgb": {
                    "r": 125,
                    "g": 241,
                    "b": 232,
                  },
                };

                changeColorFunc(currentGameObjectComponent, newColor);
                getColorFunc(currentGameObjectComponent)
                |> StateLogicService.getEngineStateToGetData
                |> Color.getHexString
                |> expect == newColor##hex;
              })
            );
          })
        )
      )
    )
  );