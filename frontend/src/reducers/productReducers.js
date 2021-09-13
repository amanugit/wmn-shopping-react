import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_BYFILTER_REQUEST,
  PRODUCT_GET_BYFILTER_SUCCESS,
  PRODUCT_GET_BYFILTER_FAIL,
  PRODUCT_GET_BYFILTER_RESET,
  GET_PRODUCT_SUBCATEGORY_REQUEST,
  GET_PRODUCT_SUBCATEGORY_SUCCESS,
  GET_PRODUCT_SUBCATEGORY_FAIL,
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
export const productListReducer = (
  state = {
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
    default:
      return state;
  }
};

export const productGetReducer = (
  state = {
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
        productsByFilter: [],
        status: "",
      };
    default:
      return state;
  }
};

export const productListSubCategoryReducer = (
  state = { subCatsAPI: [] },
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
    default:
      return state;
  }
};

export const productCreateReducer = (state = { product: {} }, action) => {
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
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
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
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
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
