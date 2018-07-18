open Wonderjs;

open SourceTextureType;

external convertWrapToInt : wrap => int = "%identity";

external convertIntToWrap : int => wrap = "%identity";

external convertFilterToInt : filter => int = "%identity";

external convertIntToFilter : int => filter = "%identity";