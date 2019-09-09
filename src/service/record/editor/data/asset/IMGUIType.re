type buttonSkinData = WonderImgui.SkinType.buttonSkinData;

type allCustomStyleData = WonderImgui.SkinType.allCustomStyleData;

type color = WonderImgui.SkinType.color;

type imageId = WonderImgui.ExtendType.customImageId;

type align = WonderImgui.FontType.align;

external convertFontAlignToInt: WonderImgui.FontType.align => int = "%identity";

external convertIntToFontAlign: int => WonderImgui.FontType.align = "%identity";