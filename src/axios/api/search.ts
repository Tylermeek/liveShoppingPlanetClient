import { request } from "axios/config";
import {
  ISearchInitContent,
  SearchLiveList,
  SearchProductList,
  SuggestionsList,
  getSearchProductListParams,
} from "types/search";

export const delAllSearchHistory = () => {
  return request.post<string>("/search/history/delAll");
};

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

export interface getSearchLiveListParams {
  searchContent: string;
  pageNo: number;
}

export const getSearchLiveList = ({
  searchContent,
  pageNo,
}: getSearchLiveListParams) => {
  return request.get<SearchLiveList>(`/search/live`, {
    params: {
      searchContent,
      pageNo,
    },
  });
};

export const getSearchInitConten = () =>
  request.get<ISearchInitContent>("/search/index");

export const getSearchSuggesttion = (keyword: string) =>
  request.get<SuggestionsList>("/search/helper", { params: { keyword } });
