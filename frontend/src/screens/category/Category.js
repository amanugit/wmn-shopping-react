import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductItem from "../../componenets/productItem/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  getProductsByFilter,
  listProducts,
  getSubCategory,
} from "../../actions/productActions";
import ProductNotFound from "../../componenets/productnotfound/ProductNotFound";
function Category({ match }) {
  const dispatch = useDispatch();
  const categoryQ = match.params.category;
  const supcat = match.params.supcat;
  const productByFilterListCat = useSelector((state) => state.productByFilterListCat);
  const productList = useSelector((state) => state.productList);
  const {
    loading: productsByFilterLoadingCat,
    productsByFilterCat,
    error: productsByFilterErrorCat,
    status,
  } = productByFilterListCat;
  const sideBarRef = useRef(null);
  const {
    colorsAPI,
    brandAPI,
    materialAPI,
    priceAPI,
    clothingSizeAPI,
    shoeSizeAPI,
    loading,
    error,
  } = productList;

  const history = useHistory();
  const [colors, setColors] = useState([]);
  const [priceState, setPriceState] = useState(0);
  const [subCategories, setsubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [clothingSizes, setClothingSizes] = useState([]);
  const [shoeSizes, setShoeSizes] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const productListSubCategory = useSelector(
    (state) => state.productListSubCategory
  );
  const { subCatsAPI } = productListSubCategory;
  const loadMore = (e) => {
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        priceState,
        clothingSizes,
        shoeSizes,
        productsByFilter.length + 10
      )
    );
  };

  const onCheckViewAll = () => {
    setViewAll(!viewAll);
    history.push("/women/");
  };
  const checkColor = (e, id) => {
    const { value } = e.target;
    const val = colors.find((val) => {
      return val === value;
    });
    if (!val) {
      colors.push(value);
      setColors([...colors]);
      colorsAPI[id].isChecked = true;
    } else {
      const postion = colors.indexOf(val);
      colors.splice(postion, 1);
      colorsAPI[id].isChecked = false;
    }
    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        priceState,
        clothingSizes,
        shoeSizes,
        ""
      )
    );
  };

  const checkBrands = (e, id) => {
    const { value } = e.target;
    const val = brands.find((val) => {
      return val === value;
    });
    if (!val) {
      brands.push(value);
      setBrands([...brands]);
      brandAPI[id].isChecked = true;
    } else {
      const postion = brands.indexOf(val);
      brands.splice(postion, 1);
      brandAPI[id].isChecked = false;
    }

    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        priceState,
        clothingSizes,
        shoeSizes,
        ""
      )
    );
  };

  const checkMaterials = (e, id) => {
    const { value } = e.target;
    const val = materials.find((val) => {
      return val === value;
    });
    if (!val) {
      materials.push(value);
      setMaterials([...materials]);
      materialAPI[id].isChecked = true;
    } else {
      const postion = materials.indexOf(val);
      materials.splice(postion, 1);
      materialAPI[id].isChecked = false;
    }
    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        priceState,
        clothingSizes,
        shoeSizes,
        ""
      )
    );
  };

  const checkClothingSize = (e, id) => {
    const { value } = e.target;
    const val = clothingSizes.find((val) => {
      return val === value;
    });
    if (!val) {
      clothingSizes.push(value);
      setClothingSizes([...clothingSizes]);
      clothingSizeAPI[id].isChecked = true;
    } else {
      const postion = clothingSizes.indexOf(val);
      clothingSizes.splice(postion, 1);
      clothingSizeAPI[id].isChecked = false;
    }
    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        priceState,
        clothingSizes,
        shoeSizes,
        ""
      )
    );
  };

  const checkShoeSize = (e, id) => {
    const { value } = e.target;
    const val = shoeSizes.find((val) => {
      return val === value;
    });
    if (!val) {
      shoeSizes.push(value);
      setShoeSizes([...shoeSizes]);
      shoeSizeAPI[id].isChecked = true;
    } else {
      const postion = shoeSizes.indexOf(val);
      shoeSizes.splice(postion, 1);
      shoeSizeAPI[id].isChecked = false;
    }
    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        priceState,
        clothingSizes,
        shoeSizes,
        ""
      )
    );
  };

  const checkSubCats = (e, id) => {
    const { value } = e.target;
    const val = subCategories.find((val) => {
      return val === value;
    });
    if (!val) {
      subCategories.push(value);
      setsubCategories([...subCategories]);
      subCatsAPI[id].isChecked = true;
    } else {
      const postion = subCategories.indexOf(val);
      subCategories.splice(postion, 1);
      subCatsAPI[id].isChecked = false;
    }
    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        priceState,
        clothingSizes,
        shoeSizes,
        ""
      )
    );
  };

  const ChangePrice = (e, id) => {
    const { value } = e.target;
    setPriceState(value);

    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supcat,
        colors,
        "",
        brands,
        materials,
        subCategories,
        categoryQ,
        value,
        clothingSizes,
        shoeSizes,
        ""
      )
    );
  };

  useEffect(() => {
      // if (subCatsAPI.length === 0) {
      dispatch(getSubCategory(categoryQ, supcat));
    
  }, [categoryQ, supcat]);

  useEffect(() => {
      dispatch(listProducts(supcat, categoryQ));
  }, [supcat, categoryQ]);

  useEffect(() => {
      dispatch(
        getProductsByFilter(supcat, "", "", "", "", "", categoryQ, "", "", "", "")
      );
    
  }, [supcat, categoryQ]);
  return (
    <section className="category" id="category">
      <Container fluid className="mt-2">
        <Row>
          <Col md={2} sm={12}>
            <div
              ref={(el) => (sideBarRef.current = el)}
              className="category_side_nav"
            >
              {loading ? (
                <div className="text-center">
                  <Spinner
                    animation="border"
                    size="lg"
                    variant="warning"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
              ) : error ? (
                <Alert variant="danger" className="text-center">
                  Opps: something went wrong..., try to reload the page
                </Alert>
              ) : (
                <div>
                  <div className="my-2">
                    <div
                      className="left-menu side-cats"
                      style={{ height: "auto" }}
                    >
                      <ul>
                        <li>
                          {" "}
                          <input
                            type="checkbox"
                            name="categorires"
                            checked={viewAll}
                            onChange={onCheckViewAll}
                          ></input>
                          <span>VIEW ALL</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="my-2">
                    <div className="left-menu side-cats">
                      <ul>
                        {subCatsAPI.map((sbc, index) => {
                          return (
                            <li key={index}>
                              <input
                                onChange={(e) => {
                                  checkSubCats(e, index);
                                }}
                                type="checkbox"
                                name="subcats"
                                value={sbc.subCategory}
                                checked={sbc.isChecked}
                              ></input>
                              <span>{sbc.subCategory.toUpperCase()}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="my-2">
                    <div className="mb-1 coll">
                      <h6>Brands</h6>
                    </div>
                    <div className="left-menu side-cats">
                      <ul>
                        {brandAPI.map((brand, index) => {
                          return (
                            <li key={index}>
                              <input
                                onChange={(e) => {
                                  checkBrands(e, index);
                                }}
                                type="checkbox"
                                name="brands"
                                value={brand.brand}
                                checked={brand.isChecked}
                              ></input>
                              <span>{brand.brand.toUpperCase()}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="mb-1 coll">
                      <h6>Materials</h6>
                    </div>
                    <div className="left-menu side-cats">
                      <ul>
                        {materialAPI.map((material, index) => {
                          return (
                            <li key={index}>
                              <input
                                onChange={(e) => {
                                  checkMaterials(e, index);
                                }}
                                type="checkbox"
                                name="materials"
                                value={material.material}
                                checked={material.isChecked}
                              ></input>
                              <span>{material.material.toUpperCase()}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="mb-1 coll">
                      <h6>Colors</h6>
                    </div>
                    <div className="left-menu side-cats">
                      <ul>
                        {colorsAPI.map((color, index) => {
                          return (
                            <li key={index}>
                              <input
                                onChange={(e) => {
                                  checkColor(e, index);
                                }}
                                type="checkbox"
                                name="colors"
                                value={color.color}
                                checked={color.isChecked}
                              ></input>
                              <span>{color.color.toUpperCase()}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="mb-1 coll">
                      <h6>Price</h6>
                    </div>
                    <div
                      className="left-menu side-cats"
                      style={{ height: "auto" }}
                    >
                      <ul>
                        <span>&lt;{priceState} $ </span>
                        <li className="price">
                          <input
                            className="slider"
                            onChange={ChangePrice}
                            type="range"
                            min={priceAPI.minprice}
                            max={priceAPI.maxprice}
                            value={priceState}
                          ></input>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {categoryQ === "clothings" ? (
                    <div className="my-2">
                      <div className="mb-1 coll">
                        <h6>Clothing Size</h6>
                      </div>
                      <div className="left-menu side-cats">
                        <ul>
                          {clothingSizeAPI.map((cs, index) => {
                            return (
                              <li key={index}>
                                <input
                                  onChange={(e) => {
                                    checkClothingSize(e, index);
                                  }}
                                  type="checkbox"
                                  name="colors"
                                  value={cs.clothingSize}
                                  checked={cs.isChecked}
                                ></input>
                                <span>{cs.clothingSize.toUpperCase()}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : categoryQ === "shoes" ? (
                    <div className="my-2">
                      <div className="mb-1 coll">
                        <h6>Shoe Size</h6>
                      </div>
                      <div className="left-menu side-cats">
                        <ul>
                          {shoeSizeAPI.map((ss, index) => {
                            return (
                              <li key={index}>
                                <input
                                  onChange={(e) => {
                                    checkShoeSize(e, index);
                                  }}
                                  type="checkbox"
                                  name="colors"
                                  value={ss.shoeSize}
                                  checked={ss.isChecked}
                                ></input>
                                <span>{ss.shoeSize.toUpperCase()}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </Col>

          <Col md={10} sm={12}>
            <Row>
              {productsByFilterLoadingCat ? (
                <div className="spinner">
                  <Spinner
                    animation="border"
                    size="lg"
                    variant="light"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              ) : productsByFilterErrorCat ? (
                <Alert variant="danger" className="text-center">
                  Opps: something went wrong..., try to reload the page
                </Alert>
              ) : status === "notFound" ? (
                <>
                  <ProductNotFound
                    supCat={supcat}
                    categoryQ={categoryQ}
                  ></ProductNotFound>
                </>
              ) : (
                productsByFilterCat.map((product) => {
                  return (
                    <ProductItem
                      product={product}
                      key={product._id}
                    ></ProductItem>
                  );
                })
              )}
            </Row>
            <div className="mt-3 mb-5 load_more_container">
              {" "}
              {productsByFilter.length >= 10 ? (
                <button className="load_more" onClick={loadMore}>
                  Load More
                </button>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Category;
