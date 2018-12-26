open WidgetType;

let getWidget = () => Asset;

let isWidget = startWidget =>
  switch (startWidget) {
  | None => false
  | Some(startWidget) => startWidget === getWidget()
  };