import { request } from "axios/config";
import { keysIn } from "lodash-es";
import { LiveInfo, ProductInfo } from "types/info";

export type SuggestionsList = string[];
export type SearchHistoryList = string[];
export type SearchRecommendList = string[];

export type SearchProductList = ProductInfo[];

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

export const getSearchSuggestions = (searchContent: string) => {
  // TODO
  return request.get<SuggestionsList>("/search/suggestions", {
    params: { searchContent },
  });
};

export const getSearchHistory = () => {
  return request.get<SearchHistoryList>("/search/history");
};

export const getSearchRecommend = () => {
  return request.get<SearchRecommendList>("/search/recommend");
};

export interface getSearchProductListParams {
  searchContent: string;
  sortType: SortTypes;
  pageNo: number;
}

export const getSearchProductList = ({
  searchContent,
  sortType,
  pageNo,
}: getSearchProductListParams) => {
  return request.get<SearchProductList>(`/search/product`, {
    params: {
      searchContent,
      sortType,
      pageNo,
    },
  });
};
