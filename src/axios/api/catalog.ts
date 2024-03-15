import { request } from "axios/config";
import {
  IAllCategoryDetail,
  ICategory,
  ICurrentCategoryDetail,
  IFirCategoryDetail,
} from "types/catalog";

export const getFirstcategoryList = () =>
  request.get<ICategory[]>("/catalog/getfirstcategory");

export const getSecondCategoryList = (id: number) =>
  request.get<ICategory[]>("/catalog/getsecondcategory", { params: { id } });

export const getFirCategoryDetail = (id: number) =>
  request.get<IFirCategoryDetail>("/catalog/index", { params: { id } });

export const getAllCategoryDetail = () =>
  request.get<IAllCategoryDetail>("/catalog/queryAll");

export const getCurrentCategoryDetail = (id: number) =>
  request.get<ICurrentCategoryDetail>("/catelog/current", { params: { id } });
