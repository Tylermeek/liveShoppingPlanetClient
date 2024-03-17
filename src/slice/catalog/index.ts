import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategoryDetail, getFirstcategoryList } from "axios/api/catalog";
import { ICategory, ICategoryById } from "types/catalog";

type CateData = {
  id: number;
  rootIndex: number;
  data: ICategory[];
};

export interface CatalogState {
  selectedRootCate: number;
  isScroll: boolean;
  rootSelItem: any;
  rootCateData: ICategory[];
  cateData: CateData[];
}

const initialState: CatalogState = {
  selectedRootCate: 0,
  isScroll: false,
  rootSelItem: null,
  rootCateData: [],
  cateData: [],
};

export const getRootCateDateThunk = createAsyncThunk(
  "catalog/getRootCateDateThunk",
  async () => {
    const res = await getFirstcategoryList();
    // console.log(res);
    return res.data;
  }
);

export const getCateDateThunk = createAsyncThunk(
  "catalog/getCateDateThunk",
  async () => {
    const res = await getAllCategoryDetail();
    // console.log(res);
    return res.data.allList;
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    updateSelectedRootCate: (state, { payload }: PayloadAction<number>) => {
      state.selectedRootCate = payload;
    },
    updateRootSelItem: (state, { payload }: PayloadAction<any>) => {
      state.rootSelItem = payload;
    },
    updateIsScroll: (state, { payload }: PayloadAction<boolean>) => {
      state.isScroll = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRootCateDateThunk.pending, () => {
        console.log("loading getRootCateDateThunk");
      })
      .addCase(getRootCateDateThunk.fulfilled, (state, { payload }) => {
        state.rootCateData = payload;
      })
      .addCase(getRootCateDateThunk.rejected, () => {
        console.log("err getRootCateDateThunk");
      })
      .addCase(getCateDateThunk.pending, () => {
        console.log("loading getCateDateThunk");
      })
      .addCase(getCateDateThunk.fulfilled, (state, { payload }) => {
        // state.cateData = payload;
        const temp: CateData[] = [];
        Object.keys(payload).map((key, index) => {
          temp.push({
            id: Number(key),
            rootIndex: index,
            data: payload[key],
          });
        });
        state.cateData = temp;
      })
      .addCase(getCateDateThunk.rejected, () => {
        console.log("err getCateDateThunka");
      });
  },
});

export const { updateSelectedRootCate, updateRootSelItem, updateIsScroll } =
  catalogSlice.actions;

export default catalogSlice.reducer;
