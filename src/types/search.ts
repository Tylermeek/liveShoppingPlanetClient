import { ProductInfo } from "./info";

export type SuggestionsList = string[];
export type HistoryKeywordList = string[];
export type HotkeywordList = string[];

export type SearchProductList = ProductInfo[];
export type SearchLiveList = ProductInfo[];

export enum SearchType {
  Product = "Product",
  Anchor = "Anchor",
}

export enum SortTypes {
  Default = "default",
  Sold = "sold",
  AscendingPrice = "ascendingPrice",
  DescendingPrice = "descendingPrice",
}

export interface ISearchInitContent {
    historyKeywordList:HistoryKeywordList
    defaultKeyword:string,
    hotKeywordList:HotkeywordList
}


export interface getSearchProductListParams {
    searchContent: string;
    sortType: SortTypes;
    pageNo: number;
  }