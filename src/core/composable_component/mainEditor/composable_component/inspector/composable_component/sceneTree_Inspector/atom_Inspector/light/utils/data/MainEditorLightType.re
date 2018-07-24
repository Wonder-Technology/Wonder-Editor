type lightType =
  | DirectionLight
  | PointLight;

external convertLightTypeToInt : lightType => int = "%identity";

external convertIntToLightType : int => lightType = "%identity";