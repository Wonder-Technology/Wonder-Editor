let appComponents = () : ReasonReact.reactElement =>
  AppComposableComponent.appRecord[0] |> ((component) => component |> ParseSystem.parseSystem);