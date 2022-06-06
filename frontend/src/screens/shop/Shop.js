import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductItem from "../../componenets/productItem/ProductItem";
import {
  getProductsByFilter,
  listProducts,
} from "../../actions/productActions";
import ProductNotFound from "../../componenets/productnotfound/ProductNotFound";
import { useHistory } from "react-router";

import {
  PRODUCT_LIST_RESET,
  PRODUCT_GET_BYFILTER_RESET,
} from "../../constants/productConstants";
function Shop({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sideBarRef = useRef(null);
  const supCat = match.params.supcat;
  const productList = useSelector((state) => state.productList);
  const productByFilterList = useSelector((state) => state.productByFilterList);
  const {
    loading: productsByFilterLoading,
    productsByFilter,
    error: productsByFilterError,
    status,
  } = productByFilterList;
  const {
    colorsAPI,
    categoryAPI,
    brandAPI,
    materialAPI,
    priceAPI,
    loading,
    error,
  } = productList;

  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [priceState, setPriceState] = useState(0);
  const [viewAll, setViewAll] = useState(true);

  const onCheckViewAll = () => {
    dispatch({ type: PRODUCT_LIST_RESET });
    dispatch({ type: PRODUCT_GET_BYFILTER_RESET });
    setPriceState(priceAPI.maxprice);
    dispatch(listProducts(supCat, "", ""));
    dispatch(
      getProductsByFilter(supCat, "", "", "", "", "", "", "", "", "", 10)
    );
    setViewAll(!viewAll);
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
        supCat,
        colors,
        categories,
        brands,
        materials,
        "",
        "",
        priceState,
        "",
        "",
        ""
      )
    );
  };

  const checkCategories = (e) => {
    const { name } = e.target;

    history.push(`/${supCat}/${name}`);
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
        supCat,
        colors,
        categories,
        brands,
        materials,
        "",
        "",
        priceState,
        "",
        "",
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
        supCat,
        colors,
        categories,
        brands,
        materials,
        "",
        "",
        priceState,
        "",
        "",
        ""
      )
    );
  };
  const ChangePrice = (e) => {
    const { value } = e.target;
    setPriceState(value);
    setViewAll(false);
    dispatch(
      getProductsByFilter(
        supCat,
        colors,
        categories,
        brands,
        materials,
        "",
        "",
        priceState,
        "",
        "",
        ""
      )
    );
  };

  useEffect(() => {
    // if (productList.colorsAPI.length === 0 || productList.brandAPI.length === 0) {
      dispatch(listProducts(supCat, ""));
  }, [supCat]);

  const loadMore = (e) => {
    dispatch(
      getProductsByFilter(
        supCat,
        colors,
        categories,
        brands,
        materials,
        "",
        "",
        priceState,
        "",
        "",
        productsByFilter.length + 10
      )
    );
  };
  useEffect(() => {
    // if (productsByFilter.length === 0) {
      dispatch(
        getProductsByFilter(supCat, "", "", "", "", "", "", "", "", "", 10)
      );
   
  }, [supCat]);
  return (
    <section className="shop" id="shop">
      <Container fluid className="mt-2">
        <Row>
          <Col md={2} sm={12}>
            <div ref={(el) => (sideBarRef.current = el)} className="side_nav">
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
                    <div className="mb-1 coll">
                      <h6>Categories</h6>
                    </div>
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
                        {categoryAPI.map((category, index) => {
                          return (
                            <li key={index}>
                              <input
                                onChange={(e) => {
                                  checkCategories(e, index);
                                }}
                                type="checkbox"
                                name={category.category}
                                value={category.category}
                                checked={category.isChecked}
                              ></input>
                              <span>{category.category.toUpperCase()}</span>
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
                        <span>&lt;{priceState}$</span>
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
                </div>
              )}
            </div>
          </Col>

          <Col md={10} sm={12}>
            <Row>
              {productsByFilterLoading ? (
                <div className="spinner">
                  <Spinner
                    animation="border"
                    size="lg"
                    variant="light"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              ) : productsByFilterError ? (
                <Alert variant="danger" className="text-center">
                  Opps: something went wrong..., try to reload the page
                </Alert>
              ) : status === "notFound" ? (
                <>
                  <ProductNotFound supCat={supCat}></ProductNotFound>

                  {productsByFilter.map((product) => {
                    return (
                      <ProductItem
                        product={product}
                        key={product._id}
                      ></ProductItem>
                    );
                  })}
                </>
              ) : (
                productsByFilter.map((product) => {
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
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Shop;
