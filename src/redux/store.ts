import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { WarehouseApi } from "./services/lis/warehouse";
import { SearchApi } from "./services/lis/search-citizen-legal";
import { DistrictApi } from "./services/lis/search-citizen-legal/district";
import { RegionsApi } from "./services/lis/search-citizen-legal/regions";
import { AnalyseApi } from "./services/lis/search-citizen-legal/analyse";

export const store = configureStore({
  reducer: {
    [WarehouseApi.reducerPath]: WarehouseApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
    [RegionsApi.reducerPath]: RegionsApi.reducer,
    [DistrictApi.reducerPath]: DistrictApi.reducer,
    [AnalyseApi.reducerPath]: AnalyseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      WarehouseApi.middleware,
      SearchApi.middleware,
      DistrictApi.middleware,
      RegionsApi.middleware,
      AnalyseApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
