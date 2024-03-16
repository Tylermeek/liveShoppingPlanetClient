import { BrandInfo } from "./info";
import { IFilterCategory, ISearchGood, ISearchParams } from "./search";

export interface IGetGoodsParams extends ISearchParams {}

export interface IGetGoodsRes {
  list: ISearchGood[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  filterCategoryList: IFilterCategory[];
}

export interface IGoodDetail {
  attribute: IAttributeInfo[];
  brand: BrandInfo;
  comment: IGoodComment;
  groupon: string[];
  info: IGoodInfo;
  issue: IGoodIssue[];
  productList: IProduct[];
  share: boolean;
  shareImage: string;
  specificationList: ISpecification[];
  userHasCollect: number;
}

export interface IAttributeInfo {
  id: number;
  goodsId: number;
  attribute: string;
  value: string;
  addTime: string;
  updateTime: string;
  deleted: boolean;
}

export interface IGoodComment {
  count: number;
  data: commentDetail[];
}

export interface commentDetail {
  addTime: string;
  adminContent: string;
  avatar: string;
  content: string;
  id: number;
  nickname: string;
  picList: string[];
}

export interface IGoodInfo {
  addTime: string;
  brandId: number;
  brief: string;
  categoryId: number;
  counterPrice: number;
  deleted: boolean;
  detail: string;
  gallery: string[];
  goodsSn: string;
  id: number;
  isHot: boolean;
  isNew: boolean;
  isOnSale: boolean;
  keywords: string;
  name: string;
  picUrl: string;
  retailPrice: number;
  shareUrl: string;
  sortOrder: number;
  unit: string;
  updateTime: string;
}

export interface IGoodIssue {
  addTime: string;
  answer: string;
  deleted: boolean;
  id: number;
  question: string;
  updateTime: string;
}

export interface IProduct {
  addTime?: string;
  deleted?: boolean;
  goodsId?: number;
  id?: number;
  number?: number;
  price?: number;
  specifications?: string[];
  updateTime?: string;
  url?: string;
}

export interface ISpecification {
  name?: string;
  valueList?: IValue[];
}

export interface IValue {
  addTime?: string;
  deleted?: boolean;
  goodsId?: number;
  id?: number;
  picUrl?: string;
  specification?: string;
  updateTime?: string;
  value?: string;
}

export interface IRelatedGoodsList {
  limit: number;
  list: IRelatedGood[];
  page: number;
  pages: number;
  total: number;
}

export interface IRelatedGood {
  brief: string;
  counterPrice: number;
  id: number;
  isHot: boolean;
  isNew: boolean;
  name: string;
  picUrl: string;
  retailPrice: number;
}
