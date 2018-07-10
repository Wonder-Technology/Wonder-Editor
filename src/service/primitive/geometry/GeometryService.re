let hasTexCoords = texCoords =>
  texCoords |> Js.Typed_array.Float32_array.length > 0;