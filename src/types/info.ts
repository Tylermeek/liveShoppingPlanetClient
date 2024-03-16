/**
 * UserInfo
 */
export interface UserInfo {
  /**
   * 用户头像地址
   */
  avatar: string;
  /**
   * 用户id
   */
  id: number;
  /**
   * 用户名
   */
  name: string;
  [property: string]: any;
}

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
  shopInfo: any;
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
 * ExpressInfo
 */
export interface ExpressInfo {
  /**
   * 快递费用
   */
  cost: number;
  /**
   * 快递源
   */
  source: string;
  [property: string]: any;
}

/**
 * ProductInfo
 * 商品信息
 */
export interface ProductInfo {
  /**
   * 商品参加的活动
   */
  activity?: string;
  /**
   * 限购数量
   */
  buyLimit: number;
  /**
   * 商品封面
   */
  cover?: string;
  /**
   * 快递信息
   */
  expressInfo: ExpressInfo;
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
  shopInfo: any;
  /**
   * 商品销量
   */
  sold: number;
  /**
   * 商品特点列表
   */
  features?: string[];
  /**
   * 支持服务信息
   */
  supportServices: string[];
  /**
   * 商品名称
   */
  title: string;
  /**
   * 信息类别
   */
  type: InfoType;
  [property: string]: any;
}

/**
 * 店铺评分
 */
export interface Rate {
  /**
   * 物流服务
   */
  logisticsServices: number;
  /**
   * 商品描述
   */
  productDescription: number;
  /**
   * 卖家服务
   */
  sellerService: number;
  [property: string]: any;
}

/**
 * ShopInfo，店铺信息
 */
export interface BrandInfo {
  id: number;
  name: string;
  desc: string;
  picUrl: string;
  sortOrder: number;
  floorPrice: number;
  addTime: string;
  updateTime: string;
  deleted: boolean;
}

/**
 * 轮播图信息
 *
 * SwiProductSwiperInfoperInfo
 */
export interface ProductSwiperInfo {
  /**
   * 轮播图ID
   */
  id: number;
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

/**
 * CommentInfo
 */
export interface CommentInfo {
  /**
   * 评论内容
   */
  commentContent: string;
  /**
   * 评论ID
   */
  id: string;
  /**
   * 评论图片列表
   */
  imgList?: string[];
  /**
   * 是否匿名
   */
  isHide: boolean;
  /**
   * 评论时间
   */
  time: string;
  /**
   * 评论用户信息
   */
  userInfo: UserInfo;
  [property: string]: any;
}

/**
 * LiveSwiperInfo
 */
export interface LiveSwiperInfo {
  /**
   * 轮播图ID
   */
  id: string;
  /**
   * 轮播图图片地址
   */
  image: string;
  /**
   * 所属直播ID
   */
  liveId: string;
  [property: string]: any;
}
