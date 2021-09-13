import React, { useState, useEffect } from "react";
import { FaPlus, FaBackward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { createProduct } from "../../../actions/productActions";
import { CREATE_PRODUCT_RESET } from "../../../constants/productConstants";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddProduct.css";
function AddProduct({ history }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [desc, setDesc] = useState("");
  const [shoeSizes, setshoeSizes] = useState([]);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [photoFile, setphotoFile] = useState("");
  const [imagesFiles, setimagesFiles] = useState([]);
  const [isShoeSizeOpen, setIsShoeSizeOpen] = useState(false);
  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: CREATE_PRODUCT_RESET });
      if (success) {
        history.push("/admin/products");
      }
    } else {
      history.push("/admin/login?redirect=/admin/products/add");
    }
  }, [history, dispatch, success, userInfo]);
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      imagesFiles.map((imgFile) => {
        return formData.append("images", imgFile);
      });

      formData.append("photo", photoFile);
      const {
        data: { uploadedImages, photoUploaded },
      } = await axios.post("/api/upload/productImages", formData, config);
      dispatch(
        createProduct(
          name,
          desc,
          price,
          priceDiscount,
          shippingCost,
          category,
          ItemCategory,
          subCategory,
          brand,
          sizes,
          shoeSizes,
          material,
          colors,
          countInStock,
          photoUploaded,
          uploadedImages
        )
      );
    } catch (error) {
      //console.error(error);
    }
  };

  const addColors = () => {
    if (!color) {
      alert("Please add color");
    } else {
      const isFouncColor = colors.find((clr) => {
        return color === clr;
      });

      if (isFouncColor) {
        return;
      } else {
        setColors([...colors, color]);
        setColor("");
      }
    }
  };

  const addSizes = (e) => {
    if (!e.target.value) {
      alert("Please add clothing size");
    } else {
      const isFoundSize = sizes.find((sze) => {
        return e.target.value === sze;
      });

      if (isFoundSize) {
        return;
      } else {
        setSizes([...sizes, e.target.value]);
      }
    }
  };

  const addShoeSize = (e) => {
    if (!e.target.value) {
      alert("Please add shoe size");
    } else {
      const isFoundShoeSize = shoeSizes.find((shsize) => {
        return e.target.value === shsize;
      });

      if (isFoundShoeSize) {
        return;
      } else {
        setshoeSizes([...shoeSizes, e.target.value]);
      }
    }
  };

  const removeColor = (index) => {
    const f = colors[index];
    const found = colors.find((color) => {
      return color === f;
    });

    const filtered = colors.filter((color) => {
      return found !== color;
    });
    setColors(filtered);
  };

  const removeSize = (index) => {
    const s = sizes[index];
    const found = sizes.find((size) => {
      return size === s;
    });

    const filtered = sizes.filter((size) => {
      return found !== size;
    });
    setSizes(filtered);
  };

  const removeShoeSize = (index) => {
    const s = shoeSizes[index];
    const found = shoeSizes.find((size) => {
      return size === s;
    });

    const filtered = shoeSizes.filter((size) => {
      return found !== size;
    });
    setshoeSizes(filtered);
  };
  const uploadImageHandler = (e) => {
    e.preventDefault();
    setimagesFiles([...imagesFiles, ...e.target.files]);
  };
  const uploadPhoto = (e) => {
    e.preventDefault();
    setphotoFile(e.target.files[0]);
  };
  const OnChangeSubCategory = (value) => {
    if (value === "shoes") {
      setIsShoeSizeOpen(true);
      setSubCategory(value);
    } else {
      setIsShoeSizeOpen(false);
      setSubCategory(value);
    }
  };
  return (
    <section className="admin_add_product" id="admin_add_product">
      <Container className="my-2">
        <Link to="/admin/products">
          <FaBackward
            title="Go to back"
            style={{ fontSize: "2rem", color: "#c06d00" }}
          ></FaBackward>
        </Link>
      </Container>
      <Alert variant="warning" className="text-center my-2 py-2">
        {" "}
        (*) required fileds
      </Alert>
      <Container className="pb-5">
        {loading ? (
          <div className="spinner">
            <Spinner
              animation="border"
              size="lg"
              variant="light"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ) : error ? (
          <div>
            <Alert variant="danger" className="text-center">
              Opps: something went wrong..., Make sure to enter valid data
            </Alert>
          </div>
        ) : (
          "success"
        )}
        <Form onSubmit={addProduct}>
          <Row>
            <Col md={6} sm={12}>
              <Row>
                <Col md={6} sm={12}>
                  <Row>
                    <Col md={12} sm={12}>
                      <Form.Label>Name (*)</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_name"
                        placeholder="product name"
                        value={name}
                      ></Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>Price (*)</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_price"
                        placeholder="Price"
                        value={price}
                      ></Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>Shipping Cost (*) </Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setShippingCost(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_shipping_cost"
                        placeholder="Shipping Cost"
                        value={shippingCost}
                      ></Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>Price discount</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setPriceDiscount(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_pricediscount"
                        placeholder="Price discount"
                        value={priceDiscount}
                      ></Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>Count In Stock (*)</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setCountInStock(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_countInStock"
                        placeholder="count in sotock"
                        value={countInStock}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} sm={12}>
                  <Row>
                    <Col md={12} sm={12}>
                      <Form.Label>Choose A Photo To Upload (*) </Form.Label>
                      <Form.Control
                        onChange={uploadPhoto}
                        className="mb-3"
                        type="file"
                        name="photo"
                      ></Form.Control>
                    </Col>

                    <Col md={12} sm={12}>
                      <Form.Label>Category (*)</Form.Label>
                      <Form.Control
                        name="p_category"
                        as="select"
                        className="mb-3"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="">Choose Category </option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                      </Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>Sub Category (*)</Form.Label>
                      <Form.Control
                        as="select"
                        name="p_sub_category"
                        className="mb-3"
                        onChange={(e) => {
                          OnChangeSubCategory(e.target.value);
                        }}
                      >
                        <option value="">Choose sub category</option>
                        <option value="clothings">Clothings</option>
                        <option value="bags">Bags</option>
                        <option value="shoes">Shoes</option>
                        <option value="watches_and_jweleries">
                          Watches And Jewleries
                        </option>
                        <option value="accessories">Accessories</option>
                      </Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>Item Cateogry</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setItemCategory(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_countInStock"
                        placeholder="Item Category"
                        value={ItemCategory}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={12}>
                  <Form.Label>Description (*)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    className="mb-3"
                    type="text"
                    name="p_desc"
                    placeholder="product name"
                    value={desc}
                  ></Form.Control>
                </Col>
              </Row>
            </Col>

            <Col md={6} sm={12}>
              <Row>
                <Col md={6} sm={12}>
                  <Row>
                    <Col md={12} sm={12}>
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setBrand(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_brand"
                        placeholder="Brand Name"
                        value={brand}
                      ></Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>Add As Many Colors As Possible</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setColor(e.target.value);
                        }}
                        className="mb-1"
                        type="text"
                        name="p_colors"
                        value={color}
                        placeholder="Enter Color For The Product"
                      ></Form.Control>
                      <div className="my-3">
                        {colors.length > 0
                          ? colors.map((color, index) => {
                              return (
                                <div key={index}>
                                  <span className="colors mb-2" key={index}>
                                    <span
                                      className="after"
                                      onClick={() => {
                                        removeColor(index);
                                      }}
                                    >
                                      &times;
                                    </span>
                                    {color}
                                  </span>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                      <div>
                        <Button className="mybtn my-1" onClick={addColors}>
                          Add Color
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} sm={12}>
                  <Row>
                    <Col md={12} sm={12}>
                      <Form.Label>Material Made</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setMaterial(e.target.value);
                        }}
                        className="mb-3"
                        type="text"
                        name="p_material"
                        placeholder="Material Made"
                        value={material}
                      ></Form.Control>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Label>
                        Add As Many Sizes As Possible (Italian Size)
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="p_sub_category"
                        className="mb-1"
                        onChange={addSizes}
                      >
                        {[...Array(39).keys()].map((c) => {
                          return (
                            <option key={`${c + 10}-IT`} value={`${c + 10}-IT`}>
                              {c + 10}-IT
                            </option>
                          );
                        })}
                      </Form.Control>
                      <div
                        style={{
                          marginTop: "19px",
                        }}
                      >
                        {sizes.length > 0
                          ? sizes.map((size, index) => {
                              return (
                                <div key={index}>
                                  <span className="sizes mb-2" key={index}>
                                    <span
                                      className="after"
                                      onClick={() => {
                                        removeSize(index);
                                      }}
                                    >
                                      &times;
                                    </span>
                                    {size}
                                  </span>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </Col>
                    <Col
                      md={12}
                      sm={12}
                      className={isShoeSizeOpen ? "block" : "none"}
                    >
                      <Form.Label>Shoe Size</Form.Label>
                      <Form.Label>
                        Add As Many Shoe Sizes As Possible
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="p_sub_category"
                        className="mb-1"
                        onChange={addShoeSize}
                      >
                        {[...Array(45).keys()].map((c) => {
                          return (
                            <option key={`${c + 3}`} value={`${c + 3}`}>
                              {c + 3}
                            </option>
                          );
                        })}
                      </Form.Control>
                      <div
                        style={{
                          marginTop: "19px",
                        }}
                      >
                        {shoeSizes.length > 0
                          ? shoeSizes.map((size, index) => {
                              return (
                                <div key={index}>
                                  <span className="sizes mb-2" key={index}>
                                    <span
                                      className="after"
                                      onClick={() => {
                                        removeShoeSize(index);
                                      }}
                                    >
                                      &times;
                                    </span>
                                    {size}
                                  </span>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <h4 className="text-center my-3">Upload Images</h4>
                <Col md={12} sm={12}>
                  <Form.Control
                    onChange={uploadImageHandler}
                    className="mb-3"
                    type="file"
                    name="images"
                    multiple
                  ></Form.Control>
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={12}>
                  <Button type="submit" className="mybtn my-3">
                    <FaPlus></FaPlus> Add Product
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}

export default AddProduct;
