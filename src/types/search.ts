import { ProductInfo } from "./info";

export type SuggestionsList = string[];
interface IKeyWordItem {
  addTime: string;
  deleted: boolean;
  id: number;
  isDefault: boolean;
  isHot: boolean;
  keyword: string;
  sortOrder: number;
  updateTime: string;
  url: string;
}

export type HistoryKeywordList = IKeyWordItem[];
export type HotkeywordList = IKeyWordItem[];

export type SearchProductList = ProductInfo[];
export type SearchLiveList = ProductInfo[];

export enum SearchType {
  Product = "Product",
  Anchor = "Anchor",
}

export enum SortTypes {
  Default = "add_time",
  RetailPrice = "retail_price",
  Name = "name",
}

export type SortOrder = "desc" | "asc";

export interface ISearchInitContent {
  historyKeywordList: HistoryKeywordList;
  defaultKeyword: string;
  hotKeywordList: HotkeywordList;
}

export interface ISearchParams {
  categoryId?: number;
  brandId?: number;
  keyword?: string;
  isNew?: boolean;
  isHot?: boolean;
  userId?: number;
  page?: number;
  limit?: number;
  sort?: SortTypes;
  order?: SortOrder;
}

export interface ISearchRes {
  list: ISearchGood[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  filterCategoryList: IFilterCategory[];
}

export interface IFilterCategory {
  addTime: string;
  deleted: boolean;
  desc: string;
  iconUrl: string;
  id: number;
  keywords: string;
  level: string;
  name: string;
  picUrl: string;
  pid: number;
  sortOrder: number;
  updateTime: string;
  [property: string]: any;
}

export interface ISearchGood {
  brief: string;
  counterPrice: number;
  id: number;
  isHot: boolean;
  isNew: boolean;
  name: string;
  picUrl: string;
  retailPrice: number;
}
