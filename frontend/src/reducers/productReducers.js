import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_BYFILTER_REQUEST,
  PRODUCT_GET_BYFILTER_SUCCESS,
  PRODUCT_GET_BYFILTER_FAIL,
  PRODUCT_GET_BYFILTER_RESET,

  PRODUCT_GET_CAT_BYFILTER_REQUEST,
  PRODUCT_GET_CAT_BYFILTER_SUCCESS,
  PRODUCT_GET_CAT_BYFILTER_FAIL,
  PRODUCT_GET_CAT_BYFILTER_RESET,
  GET_PRODUCT_SUBCATEGORY_REQUEST,
  GET_PRODUCT_SUBCATEGORY_SUCCESS,
  GET_PRODUCT_SUBCATEGORY_FAIL,
  GET_PRODUCT_SUBCATEGORY_RESET,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  CREATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../constants/productConstants";

export const productAdminListReducer = (
  state = { adminProducts: [], loading: false },
  action
) => {
  switch (action.type) {
    case ADMIN_PRODUCT_LIST_REQUEST:
      return {
        adminProducts: [],
        loading: true,
      };
    case ADMIN_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        adminProducts: action.payload.adminProducts,
        pages: action.payload.pages,
        currentPageNo: action.payload.currentPageNo,
      };
    case ADMIN_PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const productListReducer = (
  state = {
    loading: false,
    products: [],
    colorsAPI: [],
    categoryAPI: [],
    brandAPI: [],
    materialAPI: [],
    itemCategoryAPI: [],
    priceAPI: [],
    clothingSizeAPI: [],
    shoeSizeAPI: [],
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
        colorsAPI: [],
        categoryAPI: [],
        brandAPI: [],
        materialAPI: [],
        itemCategoryAPI: [],
        priceAPI: [],
        clothingSizeAPI: [],
        shoeSizeAPI: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products.products,
        colorsAPI: action.payload.colorsAPI,
        categoryAPI: action.payload.categoryAPI,
        brandAPI: action.payload.brandAPI,
        materialAPI: action.payload.materialAPI,
        itemCategoryAPI: action.payload.itemCategoryAPI,
        priceAPI: action.payload.priceAPI,
        clothingSizeAPI: action.payload.clothingSizeAPI,
        shoeSizeAPI: action.payload.shoeSizeAPI,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_LIST_RESET:
      return {
        loading: false,
        colorsAPI: [],
        categoryAPI: [],
        brandAPI: [],
        materialAPI: [],
        itemCategoryAPI: [],
        priceAPI: [],
        clothingSizeAPI: [],
        shoeSizeAPI: [],
      };
    default:
      return state;
  }
};

export const productGetReducer = (
  state = {
    loading: false,
    product: { name: "", color: [], images: [], sizes: [], shoeSize: [] },
    relatedProducts: [],
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return {
        loading: true,
        product: { name: "", color: [], images: [], sizes: [], shoeSize: [] },
        relatedProducts: [],
      };
    case PRODUCT_GET_SUCCESS:
      return {
        loading: false,
        product: action.payload.product.product,
        relatedProducts: action.payload.relatedProducts,
      };
    case PRODUCT_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductsByFilterReducer = (
  state = {
    loading: false,
    productsByFilter: [],
    status: "",
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_GET_BYFILTER_REQUEST:
      return {
        loading: true,
        productsByFilter: [],
        status: "",
      };
    case PRODUCT_GET_BYFILTER_SUCCESS:
      return {
        loading: false,
        productsByFilter: action.payload.products,
        status: action.payload.status,
      };
    case PRODUCT_GET_BYFILTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_GET_BYFILTER_RESET:
      return {
        loading: false,
        productsByFilter: [],
        status: "",
      };
    default:
      return state;
  }
};

export const getProductsByFilterCatReducer = (
  state = {
    loading: false,
    productsByFilterCat: [],
    status: "",
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_GET_CAT_BYFILTER_REQUEST:
      return {
        loading: true,
        productsByFilterCat: [],
        status: "",
      };
    case PRODUCT_GET_CAT_BYFILTER_SUCCESS:
      return {
        loading: false,
        productsByFilterCat: action.payload.products,
        status: action.payload.status,
      };
    case PRODUCT_GET_CAT_BYFILTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_GET_CAT_BYFILTER_RESET:
      return {
        loading: false,
        productsByFilterCat: [],
        status: "",
      };
    default:
      return state;
  }
};

export const productListSubCategoryReducer = (
  state = { subCatsAPI: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_SUBCATEGORY_REQUEST:
      return {
        loading: true,
        subCatsAPI: [],
      };
    case GET_PRODUCT_SUBCATEGORY_SUCCESS:
      return {
        loading: false,
        subCatsAPI: action.payload,
      };
    case GET_PRODUCT_SUBCATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_SUBCATEGORY_RESET:
      return {
        loading: false,
        subCatsAPI: []
      }
    default:
      return state;
  }
};

export const productCreateReducer = (state = { loading: false, product: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
        success: false,
        product: {},
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
        success: true,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return { loading: false, product: {} };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { loading: false, product: {} }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        product: {},
        success: false,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
        success: true,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_PRODUCT_RESET:
      return { loading: false, product: {} };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload.product,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
