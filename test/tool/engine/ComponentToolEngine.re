let _getDisposedIndex = disposedIndexArray => (
  disposedIndexArray,
  disposedIndexArray |> ArrayService.getLast,
);

let computeGeneratedIndex = (index, disposedIndexArray) =>
  switch (_getDisposedIndex(disposedIndexArray)) {
  | (disposedIndexArray, None) => (index, succ(index), disposedIndexArray)
  | (disposedIndexArray, Some(disposedIndex)) => (
      disposedIndex,
      index,
      disposedIndexArray,
    )
  };