import { request } from "axios/config";
import {
  ISearchInitContent,
  ISearchParams,
  ISearchRes,
  SearchLiveList,
  SuggestionsList,
} from "types/search";

export const delAllSearchHistory = () => {
  return request.post<string>("/search/history/delAll");
};

export const getSearchProductList = (params: ISearchParams) => {
  return request.get<ISearchRes>(`/goods/list/`, { params });
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
