open Progress;

let buildState =
    (
      ~percent=0,
      ~style=ReactDOMRe.Style.make(
               ~width=Progress.Method.buildWidthPercentStr(0),
               (),
             ),
      ~visibleStyle=ReactDOMRe.Style.make(
                      ~width=Progress.Method.buildWidthPercentStr(0),
                      (),
                    ),
      (),
    ) => {
  percent,
  style,
  visibleStyle,
};

let didMount = sandbox => {
  let send = SinonTool.createOneLengthStub(sandbox^);
  Progress.Method.didMount(send);

  send;
};

let willUnmount = () => Progress.Method.willUnmount();