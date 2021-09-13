import React, { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../../actions/productActions";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import "./EditProduct.css";
function EditProduct({ match, history }) {
  const dispatch = useDispatch();
  const productGet = useSelector((state) => state.productGet);
  const { loading, product, error } = productGet;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: productUpdateLoading,
    error: productUpdateError,
    success: productUpdateSuccess,
  } = productUpdate;

  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [desc, setDesc] = useState("");
  const [shoeSizes, setshoeSizes] = useState("");
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [photoFile, setphotoFile] = useState("");
  const [imagesFiles, setimagesFiles] = useState([]);
  const [ItemCategory, setItemCategory] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (productUpdateSuccess) {
        dispatch({ type: UPDATE_PRODUCT_RESET });
        history.push("/admin/products");
      } else {
        dispatch(getProduct(productId));
        setName(product.name);
        setPrice(product.price);
        setShippingCost(product.shippingCost);
        setPriceDiscount(product.priceDisc);
        setCountInStock(product.countInStock);
        setSubCategory(product.subCat);
        setBrand(product.brand);
        setColors(product.color);
        setMaterial(product.material);
        setSizes(product.sizes);
        setshoeSizes(product.shoeSize);
        setDesc(product.desc);
        setCategory(product.superCat);
        setItemCategory(product.itemCat);
      }
    } else {
      history.push(`/admin/login?redirect=/admin/product/${productId}/edit`);
    }
  }, [dispatch, productId, productUpdateSuccess, history, userInfo]);
  const updatePr = async (e) => {
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
        updateProduct(productId, {
          name,
          desc,
          price,
          priceDisc: priceDiscount,
          shippingCost,
          superCat: category,
          subCat: subCategory,
          itemCat: ItemCategory,
          brand,
          sizes,
          shoeSize: shoeSizes,
          material,
          color: colors,
          countInStock,
          photo: photoUploaded,
          images: uploadedImages,
        })
      );
    } catch (error) {
      console.error(error);
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

  return (
    <div className="admin_edit_product" id="admin_edit_product">
      <Alert variant="warning" className="text-center my-2 py-2">
        {" "}
        (*) required fileds
      </Alert>
      {productUpdateLoading && (
        <div className="spinner">
          <Spinner
            animation="border"
            size="lg"
            variant="light"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
      {productUpdateError && <div>{productUpdateError}</div>}
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
        <Container className="pb-5">
          <Form onSubmit={updatePr}>
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
                        <Form.Label>Shipping Cost (*)</Form.Label>
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
                          placeholder="Price discount"
                          value={countInStock}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} sm={12}>
                    <Row>
                      <Col md={12} sm={12}>
                        <img
                          src={`/uploads/img/${product.photo}`}
                          alt={product.name}
                          className="my-2"
                          style={{ width: "100%" }}
                        ></img>
                        <Form.Label>Update photo (*)</Form.Label>
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
                          value={category}
                          name="p_category"
                          as="select"
                          className="mb-3"
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                          <option value="">Choose Category</option>
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="kid">Kids</option>
                        </Form.Control>
                      </Col>
                      <Col md={12} sm={12}>
                        <Form.Label>Sub Category</Form.Label>
                        <Form.Control
                          value={subCategory}
                          as="select"
                          name="p_sub_category"
                          className="mb-3"
                          onChange={(e) => {
                            setSubCategory(e.target.value);
                          }}
                        >
                          <option value="">Choose sub category (*)</option>
                          <option value="clothings">Clothings</option>
                          <option value="bags">Bags</option>
                          <option value="bags">Shoes</option>
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
                      placeholder="product description"
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
                        <Form.Label>Update product color</Form.Label>
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
                            Update Color
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
                          <option value="">Update clothing size</option>
                          {[...Array(39).keys()].map((c) => {
                            return (
                              <option
                                key={`${c + 10}-IT`}
                                value={`${c + 10}-IT`}
                              >
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
                      <Col md={12} sm={12}>
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
                          <option value="">Update shoe size (Shoe)</option>
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
                  <h4 className="text-center my-3">Update Images</h4>
                  <Col md={12} sm={12}>
                    <Row>
                      {product.images.map((img, index) => {
                        return (
                          <Col md={3} sm={12} key={index}>
                            <img
                              src={`/uploads/imgs/${img}`}
                              className="mb-4"
                              style={{ width: "100%" }}
                              alt={product.name}
                            ></img>
                          </Col>
                        );
                      })}
                    </Row>
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
                      <FaPlus></FaPlus> Update Product
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </div>
  );
}

export default EditProduct;
