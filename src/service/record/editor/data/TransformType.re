type changeChildOrder =
  | Before
  | After;

type transformRecord = {
  localEulerAngleMapX: WonderCommonlib.SparseMapService.t(float),
  localEulerAngleMapY: WonderCommonlib.SparseMapService.t(float),
  localEulerAngleMapZ: WonderCommonlib.SparseMapService.t(float),
};