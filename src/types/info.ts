/**
 * LiveInfo
 */
export interface LiveInfo {
    /**
     * 主播名
     */
    anchor: string;
    /**
     * 主播信息
     */
    anchorInfo: AnchorInfo;
    /**
     * 直播间封面
     */
    cover: string;
    /**
     * 直播间ID
     */
    id: number;
    /**
     * 是否正在直播
     */
    isOnLive: boolean;
    /**
     * 店铺信息
     */
    shopInfo: ShopInfo;
    /**
     * 直播间标题
     */
    title: string;
    /**
     * 信息类别
     */
    type: InfoType.LiveInfo;
    [property: string]: any;
}


/**
 * 主播信息
 *
 * AnchorInfo
 */
export interface AnchorInfo {
    /**
     * 主播头像
     */
    avatar: string;
    /**
     * 主播名称
     */
    name: string;
    [property: string]: any;
}

export enum InfoType {
    LiveInfo = "LiveInfo",
    ProductInfo = "ProductInfo",
}

/**
 * 商品信息
 * 
 * ProductInfo
 */
export interface ProductInfo {
    /**
     * 商品参加的活动
     */
    activity?: string;
    /**
     * 商品封面
     */
    cover?: string;
    /**
     * 商品ID
     */
    id: number;
    /**
     * 商品价格
     */
    price: number;
    /**
     * 商品所属店铺信息
     */
    shopInfo: ShopInfo;
    /**
     * 商品销量
     */
    sold: number;
    /**
     * 商品规格列表
     */
    specification?: string[];
    /**
     * 商品名称
     */
    title: string;
    /**
     * 信息类别
     */
    type: InfoType.ProductInfo;
    [property: string]: any;
}

/**
 * ShopInfo，店铺信息
 */
export interface ShopInfo {
    /**
     * 店铺头像
     */
    avatar: string;
    /**
     * 店铺关注人数
     */
    follower: number;
    /**
     * 店铺ID
     */
    id: string;
    /**
     * 店铺名
     */
    name: string;
    [property: string]: any;
}



/**
 * 轮播图信息
 * 
 * SwiperInfo
 */
export interface SwiperInfo {
    /**
     * 轮播图ID
     */
    id: string;
    /**
     * 轮播图图片地址
     */
    image: string;
    /**
     * 所属商品ID
     */
    productId: string;
    [property: string]: any;
}