import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductsPage = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState("");

  const products = useSelector((store) => store.products);

  const toggle = () => setShowModal(!showModal);

  return (
    <div>
      <h2>Products Page | filtered by: {filterText}</h2>
      <hr />
      <a href="#merhaba">merhaba bölümü</a>
      <Input
        placeholder="Write to filter..."
        className="mb-2"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="d-flex flex-wrap">
        {products
          ?.filter((p) =>
            p.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
          )
          ?.map((product, i) => (
            <Card
              className="me-2 mb-2"
              style={{
                width: "18rem",
              }}
              key={`product-card-${i}`}
            >
              <img alt="Sample" src={product.img} />
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {product.price} TL
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <Button color="primary" onClick={toggle}>
                  Sepete Ekle
                </Button>
                <Link
                  to={"/products/" + product.id}
                  className="ml-2"
                  data-cy="incele-link"
                >
                  İncele
                </Link>
              </CardBody>
            </Card>
          ))}
      </div>
      <div id="merhaba">merhaba</div>
      <Modal isOpen={showModal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Ürün Sepete Eklendi!</ModalHeader>
        <ModalBody>Ne de güzel eklendi...</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={toggle}>
            Süper!
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductsPage;
