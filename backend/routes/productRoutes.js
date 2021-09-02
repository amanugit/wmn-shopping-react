import express from "express";
const router = express.Router();
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  groupByColor,
  groupByBrand,
  groupByMaterial,
  groupByPrice,
  groupByCategories,
  groupBySubCategories,
  getMaxPrice,
  getMinPrice,
  getAllByFilter,
  getSubCategory,
  getRelatedProducts,
  updatePrQty,
  /**
   * new
   */
  groupByClothingSizes,
  groupByShoeSizes,
} from "../controllers/productController.js";
import { restrictTo, protect } from "../controllers/authController.js";

router.route("/").get(getAll).post(protect, restrictTo, createOne);
router.get("/filter", getAllByFilter);
router.get("/cbm", groupByColor);
router.get("/bbm", groupByBrand);
router.get("/mbm", groupByMaterial);
router.get("/pbm", groupByPrice);
router.get("/scbm", groupBySubCategories);
router.get("/catbm", groupByCategories);
/**
 * new
 */

router.get("/csbm", groupByClothingSizes);
router.get("/ssbm", groupByShoeSizes);

/**
 * --------------
 */
router.get("/getmaxprice", getMaxPrice);
router.get("/getminprice", getMinPrice);
router.get("/subcategory", getSubCategory);
router.get("/getrelatedproducts/:itemCat", getRelatedProducts);
router.post("/updatePrQty", updatePrQty);
router
  .route("/:id")
  .get(getOne)
  .delete(protect, restrictTo, deleteOne)
  .put(protect, restrictTo, updateOne);

export default router;
