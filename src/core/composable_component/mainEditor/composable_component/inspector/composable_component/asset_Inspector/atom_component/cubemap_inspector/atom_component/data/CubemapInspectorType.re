exception LoadFaceSourceException(string);

type uploadFaceSourceFileType =
  | LoadSource
  | LoadError(string);

type uploadFaceSourceFileResultType = {
  name: string,
  type_: uploadFaceSourceFileType,
  base64: FileReader.resultType,
};