import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const deleteOne = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});

const updatePrQty = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.prId);
  const countInStock = product.countInStock;

  const tobeUpdateStock = countInStock - Number(req.query.qty);
  if (tobeUpdateStock <= 0) {
    await Product.findByIdAndDelete(req.query.prId);
  } else {
    await Product.findByIdAndUpdate(
      req.query.prId,
      { countInStock: tobeUpdateStock },
      {
        useFindAndModify: false,
      }
    );
  }
});
const updateOne = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  res.status(200).json({
    status: "success",
    product,
  });
});

const createOne = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    product,
  });
});

const getOne = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  res.status(200).json({
    status: "success",
    product,
  });
});

const getAllByFilter = asyncHandler(async (req, res, next) => {
  const superCatQ = { superCat: { $eq: req.query.supCat } };
  let products;
  let colorq;
  let categoryq;
  let brandq;
  let materialq;
  let clothingsizeq;
  let shoesizeq;

  let subCategoryq;
  let catQ;
  let priceQ;
  let skip = req.query.skip ? Number(req.query.skip) : 10;

  if (
    (req.query.colors === "null" ||
      req.query.colors === "" ||
      req.query.colors === "undefined") &&
    (req.query.categories === "null" ||
      req.query.categories === "" ||
      req.query.categories === "undefined") &&
    (req.query.brands === "null" ||
      req.query.brands === "" ||
      req.query.brands === "undefined") &&
    (req.query.materials === "null" ||
      req.query.materials === "" ||
      req.query.materials === "undefined") &&
    (req.query.clothingsize === "null" ||
      req.query.clothingsize === "" ||
      req.query.clothingsize === "undefined") &&
    (req.query.shoesize === "null" ||
      req.query.shoesize === "" ||
      req.query.shoesize === "undefined") &&
    (req.query.subcategories === "null" ||
      req.query.subcategories === "" ||
      req.query.subcategories === "undefined") &&
    (req.query.price === "" ||
      req.query.price === "null" ||
      req.query.price === "0")
  ) {
    if (
      req.query.catq === "null" ||
      req.query.catq === "" ||
      req.query.catq === "undefined"
    ) {
      products = await Product.find({ ...superCatQ }).limit(skip);
    } else {
      products = await Product.find({
        $and: [
          {
            ...superCatQ,
          },
          { subCat: { $eq: req.query.catq } },
        ],
      }).limit(skip);
    }
  } else {
    let Q = [];
    Q.push(superCatQ);
    Object.keys(req.query).map((k, i) => {
      if (k === "colors") {
        if (req.query[k]) {
          colorq = { color: { $in: req.query.colors.split(",") } };
          Q.push(colorq);
        } else {
          colorq = {};
        }
      }
      if (k === "categories") {
        if (req.query[k]) {
          categoryq = { subCat: { $in: req.query.categories.split(",") } };
          Q.push(categoryq);
        } else {
          categoryq = {};
        }
      }
      if (k === "brands") {
        if (req.query[k]) {
          brandq = { brand: { $in: req.query.brands.split(",") } };
          Q.push(brandq);
        } else {
          brandq = {};
        }
      }
      if (k === "materials") {
        if (req.query[k]) {
          materialq = { material: { $in: req.query.materials.split(",") } };
          Q.push(materialq);
        } else {
          materialq = {};
        }
      }

      if (k === "clothingsize") {
        if (req.query[k]) {
          clothingsizeq = { sizes: { $in: req.query.clothingsize.split(",") } };
          Q.push(clothingsizeq);
        } else {
          clothingsizeq = {};
        }
      }

      if (k === "shoesize") {
        if (req.query[k]) {
          shoesizeq = { shoeSize: { $in: req.query.shoesize.split(",") } };
          Q.push(shoesizeq);
        } else {
          shoesizeq = {};
        }
      }

      if (k === "subcategories") {
        if (req.query[k]) {
          subCategoryq = {
            itemCat: { $in: req.query.subcategories.split(",") },
          };
          Q.push(subCategoryq);
        } else {
          subCategoryq = {};
        }
      }
      if (k === "catq") {
        if (req.query[k]) {
          catQ = { subCat: { $eq: req.query.catq } };
          Q.push(catQ);
        } else {
          catQ = {};
        }
      }
      if (k === "price") {
        if (req.query[k] !== "0") {
          priceQ = { price: { $lt: Number(req.query.price) } };
          Q.push(priceQ);
        } else {
          priceQ = {};
        }
      }
    });

    products = await Product.find({
      $and: [...Q],
    }).limit(skip);
  }
  const notFoundQuery =
    req.query.catq === "" ||
    req.query.catq === "null" ||
    req.query.catq === "undefined"
      ? {
          ...superCatQ,
        }
      : {
          $and: [{ ...superCatQ }, { subCat: { $eq: req.query.catq } }],
        };
  res.status(200).json({
    status: products.length > 0 ? "Found" : "notFound",
    products:
      products.length === 0
        ? await Product.find({ ...notFoundQuery }).limit(skip)
        : products,
  });
});

const adminGetAll = asyncHandler(async (req, res, next) => {
  const currentPageNo = Number(req.query.currentPageNo) || 1;
  const recordsPerPage = 10;
  const keyWordQ = req.query.keyWord
    ? {
        name: {
          $regex: req.query.keyWord,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyWordQ });
  const adminProducts = await Product.find({ ...keyWordQ })
    .limit(10)
    .skip(recordsPerPage * (currentPageNo - 1));
  res.status(200).json({
    status: "success",
    adminProducts,
    currentPageNo,
    pages: Math.ceil(count / recordsPerPage),
  });
});

const getAll = asyncHandler(async (req, res, next) => {
  const superCat = req.query.superCat;
  const catq = req.query.catq;
  const superCatQ = superCat ? { superCat: { $eq: superCat } } : {};
  const catqQ = catq ? { subCat: { $eq: catq } } : {};
  let products;
  if (!catq && !superCat) {
    products = await Product.find({});
  } else {
    products = await Product.find({
      $and: [{ ...superCatQ }, { ...catqQ }],
    });
  }

  return res.status(200).json({
    status: "success",
    products,
  });
});

const groupByColor = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const colors = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$color",
    },
    {
      $group: {
        _id: "$color",
      },
    },
  ]);
  res.status(200).json({
    colors,
  });
});

const groupByBrand = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const brands = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$brand",
    },
    {
      $group: {
        _id: "$brand",
      },
    },
  ]);
  res.status(200).json({
    brands,
  });
});

const groupByMaterial = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const materials = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$material",
    },
    {
      $group: {
        _id: "$material",
      },
    },
  ]);
  res.status(200).json({
    materials,
  });
});

const groupByClothingSizes = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const clothingSizes = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$sizes",
    },
    {
      $group: {
        _id: "$sizes",
      },
    },
  ]);
  res.status(200).json({
    clothingSizes,
  });
});

const groupByShoeSizes = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const shoeSizes = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$shoeSize",
    },
    {
      $group: {
        _id: "$shoeSize",
      },
    },
  ]);
  res.status(200).json({
    shoeSizes,
  });
});

const groupByPrice = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const prices = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$price",
    },
    {
      $group: {
        _id: "$price",
      },
    },
  ]);
  res.status(200).json({
    prices,
  });
});

const groupBySubCategories = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const itemCategories = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$itemCat",
    },
    {
      $group: {
        _id: "$itemCat",
      },
    },
  ]);
  res.status(200).json({
    itemCategories,
  });
});

const groupByCategories = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const categories = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...catQ }],
      },
    },
    {
      $unwind: "$subCat",
    },
    {
      $group: {
        _id: "$subCat",
      },
    },
  ]);
  res.status(200).json({
    categories,
  });
});

export const getMinPrice = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};

  const minPrice = await Product.find({
    $and: [
      {
        ...superCatQ,
      },
      {
        ...catQ,
      },
    ],
  })
    .select(
      "+price -itemCat -photo -sizes -color -images -_id -name -desc -shippingCost -superCat -subCat -brand -material -countInStock -adv_photo -__v -id"
    )
    .sort({ price: 1 })
    .limit(1);
  res.status(200).json({
    status: "success",
    minPrice,
  });
});

export const getMaxPrice = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supCat
    ? { superCat: { $eq: req.query.superCat } }
    : {};
  const catQ = req.query.catq ? { subCat: { $eq: req.query.catq } } : {};
  const maxPrice = await Product.find({
    $and: [
      {
        ...superCatQ,
      },
      {
        ...catQ,
      },
    ],
  })
    .select(
      "+price -itemCat -photo -sizes -color -images -_id -name -desc -shippingCost -superCat -subCat -brand -material -countInStock -adv_photo -__v -id"
    )
    .sort({ price: -1 })
    .limit(1);
  res.status(200).json({
    status: "success",
    maxPrice,
  });
});

const getSubCategory = asyncHandler(async (req, res, next) => {
  const superCatQ = req.query.supcat
    ? { superCat: { $eq: req.query.supcat } }
    : {};
  const subCatQ = req.query.subcat ? { subCat: { $eq: req.query.subcat } } : {};
  const subCatproducts = await Product.aggregate([
    {
      $match: {
        $and: [{ ...superCatQ }, { ...subCatQ }],
      },
    },
    {
      $unwind: "$itemCat",
    },
    {
      $group: {
        _id: "$itemCat",
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    subCatproducts,
  });
});

const getRelatedProducts = asyncHandler(async (req, res, next) => {
  const relatedProducts = await Product.find({
    itemCat: { $in: req.params.itemCat },
  });
  res.status(200).json({
    status: "success",
    relatedProducts,
  });
});

export {
  getOne,
  deleteOne,
  createOne,
  getAll,
  adminGetAll,
  updateOne,
  groupByColor,
  groupByBrand,
  groupByMaterial,
  groupByPrice,
  groupByCategories,
  groupBySubCategories,
  getAllByFilter,
  getSubCategory,
  getRelatedProducts,
  updatePrQty,
  groupByShoeSizes,
  groupByClothingSizes,
};
