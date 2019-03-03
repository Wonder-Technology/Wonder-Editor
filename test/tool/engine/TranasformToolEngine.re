let truncateRotation = (~rotation, ~digit=3, ()) => {
  let (x, y, z, w) = rotation;

  (
    x->FloatService.truncateFloatValue(digit),
    x->FloatService.truncateFloatValue(digit),
    z->FloatService.truncateFloatValue(digit),
    w->FloatService.truncateFloatValue(digit),
  );
};