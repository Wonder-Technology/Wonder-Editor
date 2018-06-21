let hasTexCoords = texCoords =>
  texCoords |> Js.Typed_array.Float32_array.length > 0;

        /* geometry has texCoords?  : {
           set map
                 } : {
                   show info modal("geometry should has texCoords");
               not set map
                 }

           set map none(remove map)


           does material has  map ?
            {
             replace material component()
           } :  {
             set color
           }




           gameObject
           material

           let color = BasicMaterialEngineService.getColor(material, state);

           let state =
           GameObjectEngineService.disposeGameObjectBasicMaterialComponent(gameObject, material, state);

           let (state, material) = BasicMaterialEngineService.create(state);

           let state = state |>
           BasicMaterialEngineService.setColor(color)

           |> BasicMaterialEngineService.setMap(map)

           ;


           let state =
           GameObjectComponentEngineService.addBasicMaterialComponent(gameObject, material, state);



           let state =
           GameObjectEngineService.initGameObject(gameObject, state);
            */