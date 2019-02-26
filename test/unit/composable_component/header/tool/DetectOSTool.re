let _setOS = [%bs.raw
  platform => {|
    Object.defineProperty(navigator, "platform", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: platform
      });
    |}
];

let setOSToBeMac = () => _setOS("Mac68K");

let setOSToBeWin = () => _setOS("Windows");