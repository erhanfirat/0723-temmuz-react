import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";

const productDataInitial = {
  name: "",
  description: "",
  img: "",
  price: 0,
  stock: 0,
};

// Static Test
// Kod yazımı esnasında yapılan hata kontrollerine linting deniyor
// JS linting işlemini yapan uygulama ESLint
// let productDataInitial = "qasd";
// AirBnb Eslint Kuralları

const ProductFormYup = () => {
  const [productData, setProductData] = useState(productDataInitial);
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    img: "",
    price: "",
    stock: "",
  });
  const [isValid, setValid] = useState(false);

  const productFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("Ürün ismi alanı zorunludur!")
      .min(4, "İsim değeri minimum 4 karakter olabilir."),
    description: Yup.string().required("Açıklama alanı zorunludur."),
    img: Yup.string().url("Geçerli bir URL adresi giriniz."),
    price: Yup.number().test(
      "positive-number",
      "Fiyat 0'dan büyük olmalı!",
      (value, context) => {
        // custom validation
        // return true | false
        return value > 0;
      }
    ),
    stock: Yup.number().positive("Stok bilgisi pozitif sayı olmalıdır."),
  });

  const inputChangeHandler = (event) => {
    const { value, name, checked, type } = event.target; // name = "password" | "email" | "name"
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    }); // setter async çalışır

    Yup.reach(productFormSchema, name)
      .validate(type === "checkbox" ? checked : value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  const productSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://620d69fb20ac3a4eedc05e3a.mockapi.io/api/products",
        productData
      )
      .then((res) => {
        console.log("Ürün başarıyla eklendi: ", res.data);
        setProductData(productDataInitial);
      });
  };

  useEffect(() => {
    console.log("productData > ", productData);
    productFormSchema.isValid(productData).then((valid) => setValid(valid));
  }, [productData]);

  return (
    <Form onSubmit={productSubmitHandler} className="product-form">
      <FormGroup>
        <Label>İsim</Label>
        <Input
          type="text"
          name="name"
          onChange={inputChangeHandler}
          value={productData.name}
          invalid={!!formErrors.name}
        />
        <FormFeedback>{formErrors.name}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label>Açıklama</Label>
        <Input
          type="text"
          name="description"
          onChange={inputChangeHandler}
          value={productData.description}
          invalid={!!formErrors.description}
          data-cy="desc-input"
        />
        <FormFeedback>{formErrors.description}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label>Görsel URL</Label>
        <Input
          type="url"
          name="img"
          onChange={inputChangeHandler}
          value={productData.img}
          invalid={!!formErrors.description}
        />
        <FormFeedback>{formErrors.img}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label>Ücret</Label>
        <Input
          type="number"
          name="price"
          onChange={inputChangeHandler}
          value={productData.price}
          invalid={!!formErrors.price}
        />
        <FormFeedback>{formErrors.price}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label>Stok</Label>
        <Input
          type="number"
          name="stock"
          onChange={inputChangeHandler}
          value={productData.stock}
          invalid={!!formErrors.stock}
        />
        <FormFeedback>{formErrors.stock}</FormFeedback>
      </FormGroup>

      <Button type="submit" color="primary" disabled={!isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default ProductFormYup;