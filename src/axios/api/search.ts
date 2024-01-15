import { request } from "axios/config"

export type suggestionsList = string[] 

export const getSearchSuggestions = (searchContent: string) => {
    return request.get<suggestionsList>("/search/suggestions")
}