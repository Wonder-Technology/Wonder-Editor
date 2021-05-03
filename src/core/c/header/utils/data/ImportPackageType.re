exception LoadPackageException(string);

type uploadPackageFileType =
  | LoadWPK
  | LoadError(string);

type uploadPackageFileResultType = {
  name: string,
  type_: uploadPackageFileType,
  result: FileReader.resultType,
};