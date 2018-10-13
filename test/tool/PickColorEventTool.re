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
          describe("test change color should set current gameObject color", () =>
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
            )
          )
        )
      )
    )
  );