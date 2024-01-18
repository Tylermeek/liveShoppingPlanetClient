import { request } from "axios/config";
import { LiveInfo, ProductInfo } from "types/info";

export type SuggestionsList = string[];
export type SearchHistoryList = string[];
export type SearchRecommendList = string[];

export type SearchResultList = ProductInfo[] | LiveInfo[];
export enum SearchType {
  Product = "Product",
  Anchor = "Anchor",
}

export const getSearchSuggestions = (searchContent: string) => {
  return request.get<SuggestionsList>("/search/suggestions");
};

export const getSearchHistory = () => {
  return request.get<SearchHistoryList>("/search/history");
};

export const getSearchRecommend = () => {
  return request.get<SearchRecommendList>("/search/recommend");
};

export const getSearchResultList = ({ type }: { type: SearchType }) => {
  return request.get<SearchResultList>(`/search${type}`);
};
