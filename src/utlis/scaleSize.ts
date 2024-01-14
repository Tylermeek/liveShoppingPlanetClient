import { Dimensions, PixelRatio } from "react-native";

/**
 * Created by qianxin on 17/6/1.
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:375
 * height:667
 */
let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
let fontScale = PixelRatio.getFontScale();
let pixelRatio = PixelRatio.get();
// 高保真的宽度和告诉
const designWidth = 375;
const designHeight = 667;

// 根据dp获取屏幕的px
let screenPxW = PixelRatio.getPixelSizeForLayoutSize(screenW);
let screenPxH = PixelRatio.getPixelSizeForLayoutSize(screenH);

/**
 * 设置text
 * @param size  px
 * @returns {number} dp
 */
export function setSpText(size:number) {
    console.log("screenW======"+screenW)
    console.log("screenPxW======"+screenPxW)
    var scaleWidth = screenW / designWidth;
    var scaleHeight = screenH / designHeight;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale/fontScale + 0.5);
    return size;
}

/**
 * 设置高度
 * @param size  px
 * @returns {number} dp
 */
export function scaleSizeH(size:number) {
    var scaleHeight = size * screenPxH / designHeight;
    size = Math.round((scaleHeight / pixelRatio + 0.5));
    return size;
}

/**
 * 设置宽度
 * @param size  px
 * @returns {number} dp
 */
export function scaleSizeW(size:number) {
    var scaleWidth = size * screenPxW / designWidth;
    size = Math.round((scaleWidth/pixelRatio + 0.5));
    return size;
}