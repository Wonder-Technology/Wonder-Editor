type rect = (int, int, int, int);

type gameViewRecord = {
  viewRect: option(rect),
  activedBasicCameraView: option(Wonderjs.ComponentType.component),
};