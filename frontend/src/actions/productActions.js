import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_BYFILTER_REQUEST,
  PRODUCT_GET_BYFILTER_SUCCESS,
  PRODUCT_GET_BYFILTER_FAIL,

  PRODUCT_GET_CAT_BYFILTER_REQUEST,
  PRODUCT_GET_CAT_BYFILTER_SUCCESS,
  PRODUCT_GET_CAT_BYFILTER_FAIL,
  GET_PRODUCT_SUBCATEGORY_REQUEST,
  GET_PRODUCT_SUBCATEGORY_SUCCESS,
  GET_PRODUCT_SUBCATEGORY_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../constants/productConstants";
import { logOut } from "../actions/userActions";
/** list products */

export const adminListProducts =
  (keyWord = "", currentPageNo = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_PRODUCT_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/products/admin?currentPageNo=${currentPageNo}&keyWord=${keyWord}`,
        config
      );
      dispatch({
        type: ADMIN_PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: ADMIN_PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };
export const listProducts =
  (superCat = "", catq = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `/api/products?superCat=${superCat}&catq=${catq}`
      );
      const {
        data: { colors },
      } = await axios.get(
        `/api/products/cbm?superCat=${superCat}&catq=${catq}`
      );
      const {
        data: { brands },
      } = await axios.get(
        `/api/products/bbm?superCat=${superCat}&catq=${catq}`
      );

      const {
        data: { materials },
      } = await axios.get(
        `/api/products/mbm?superCat=${superCat}&catq=${catq}`
      );

      /****
       * new
       */

      const {
        data: { clothingSizes },
      } = await axios.get(
        `/api/products/csbm?superCat=${superCat}&catq=${catq}`
      );

      const {
        data: { shoeSizes },
      } = await axios.get(
        `/api/products/ssbm?superCat=${superCat}&catq=${catq}`
      );

      const {
        data: { itemCategories },
      } = await axios.get(
        `/api/products/scbm?superCat=${superCat}&catq=${catq}`
      );

      const {
        data: { maxPrice },
      } = await axios.get("/api/products/getmaxprice");
      const {
        data: { minPrice },
      } = await axios.get("/api/products/getminprice");
      const {
        data: { categories },
      } = await axios.get("/api/products/catbm");
      const prices = {
        maxprice: maxPrice[0].price,
        minprice: minPrice[0].price,
      };
      let colorsForState = [];
      let categoiresForState = [];
      let brandsForState = [];
      let materialsForState = [];
      let itemCategoriesForState = [];

      /**
       * new
       */

      let clothingSizeForState = [];
      let shoeSiezeForState = [];

      /**
       * new
       */

      clothingSizes.map((cs) => {
        return clothingSizeForState.push({
          clothingSize: cs._id,
          isChecked: false,
        });
      });
      shoeSizes.map((ss) => {
        return shoeSiezeForState.push({
          shoeSize: ss._id,
          isChecked: false,
        });
      });

      /**
       * ------------------------
       */

      colors.map((color) => {
        return colorsForState.push({
          color: color._id,
          isChecked: false,
        });
      });

      categories.map((category) => {
        return categoiresForState.push({
          category: category._id,
          isChecked: false,
        });
      });

      materials.map((material) => {
        return materialsForState.push({
          material: material._id,
          isChecked: false,
        });
      });
      brands.map((brand) => {
        return brandsForState.push({
          brand: brand._id,
          isChecked: false,
        });
      });

      itemCategories.map((itemcat) => {
        return itemCategoriesForState.push({
          itemCategory: itemcat._id,
          isChecked: false,
        });
      });

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: {
          products: data,
          colorsAPI: colorsForState,
          categoryAPI: categoiresForState,
          brandAPI: brandsForState,
          materialAPI: materialsForState,
          itemCategoryAPI: itemCategoriesForState,
          priceAPI: prices,
          clothingSizeAPI: clothingSizeForState,
          shoeSizeAPI: shoeSiezeForState,
        },
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getProductsByFilterCat =
  (
    supCat,
    colors,
    categories,
    brands,
    materials,
    subcategories,
    catq,
    price,
    clothingsize,
    shoesize,
    skip
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_GET_CAT_BYFILTER_REQUEST,
      });
      const { data } = await axios.get(
        `/api/products/filter?supCat=${supCat}&colors=${colors}&categories=${categories}&brands=${brands}&materials=${materials}&subcategories=${subcategories}&catq=${catq}&price=${price}&clothingsize=${clothingsize}&shoesize=${shoesize}&skip=${skip}`
      );
      dispatch({
        type: PRODUCT_GET_CAT_BYFILTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_GET_CAT_BYFILTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProductsByFilter =
  (
    supCat,
    colors,
    categories,
    brands,
    materials,
    subcategories,
    catq,
    price,
    clothingsize,
    shoesize,
    skip
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_GET_BYFILTER_REQUEST,
      });
      const { data } = await axios.get(
        `/api/products/filter?supCat=${supCat}&colors=${colors}&categories=${categories}&brands=${brands}&materials=${materials}&subcategories=${subcategories}&catq=${catq}&price=${price}&clothingsize=${clothingsize}&shoesize=${shoesize}&skip=${skip}`
      );
      dispatch({
        type: PRODUCT_GET_BYFILTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_GET_BYFILTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_GET_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    const itemCat = data.product.itemCat;
    const {
      data: { relatedProducts },
    } = await axios.get(`/api/products/getrelatedproducts/${itemCat}`);
    dispatch({
      type: PRODUCT_GET_SUCCESS,
      payload: {
        product: data,
        relatedProducts,
      },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSubCategory = (subcat, supcat) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_SUBCATEGORY_REQUEST,
    });

    const {
      data: { subCatproducts },
    } = await axios.get(
      `/api/products/subcategory/?subcat=${subcat}&supcat=${supcat}`
    );

    let subCatsForState = [];
    subCatproducts.map((sbc) => {
      return subCatsForState.push({
        subCategory: sbc._id,
        isChecked: false,
      });
    });
    dispatch({
      type: GET_PRODUCT_SUBCATEGORY_SUCCESS,
      payload: subCatsForState,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_SUBCATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct =
  (
    name,
    desc,
    price,
    priceDisc,
    shippingCost,
    superCat,
    itemCat,
    subCat,
    brand,
    sizes,
    shoeSize,
    material,
    color,
    countInStock,
    photo,
    images
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PRODUCT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/products`,
        {
          name,
          desc,
          price,
          priceDisc,
          shippingCost,
          superCat,
          itemCat,
          subCat,
          brand,
          sizes,
          shoeSize,
          material,
          color,
          countInStock,
          photo,
          images,
        },
        config
      );
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(message);
      if (
        message === "You are not logged in please login to get access" ||
        message === "The user belongs to this user does not exist" ||
        message === "User recently changed password please login again" ||
        message === "You do not have permission to perform this action"
      ) {
        dispatch(logOut());
      }
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: message,
      });
    }
  };

export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/products/${id}`, product, config);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message);
    if (
      message === "You are not logged in please login to get access" ||
      message === "The user belongs to this user does not exist" ||
      message === "User recently changed password please login again" ||
      message === "You do not have permission to perform this action"
    ) {
      dispatch(logOut());
    }
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message);
    if (
      message === "You are not logged in please login to get access" ||
      message === "The user belongs to this user does not exist" ||
      message === "User recently changed password please login again" ||
      message === "You do not have permission to perform this action"
    ) {
      dispatch(logOut());
    }
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const updateProductQty = (prId, qty) => async (dispatch) => {
  await axios.post(`/api/products/updatePrQty?prId=${prId}&qty=${qty}`);
};
