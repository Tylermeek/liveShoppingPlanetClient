export interface ICategory {
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
}

export interface IFirCategoryDetail {
  categoryList: ICategory[];
  currentCategory: ICategory;
  currentSubCategory: ICategory[];
}

export interface ICategoryById {
  [id: string]: ICategory[];
}

export interface IAllCategoryDetail {
  allList: ICategoryById;
  categoryList: ICategory[];
  currentCategory: ICategory;
  currentSubCategory: ICategory[];
}

export interface ICurrentCategoryDetail {
  currentCategory: ICategory;
  currentSubCategory: ICategory[];
}
