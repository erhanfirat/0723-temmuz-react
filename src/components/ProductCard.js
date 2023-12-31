import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductCard = ({ product, toggle, deleteProduct }) => {
  const isAdmin = useSelector((store) => store.site.user.role === "admin");

  return (
    <Card
      className="me-2 mb-2"
      style={{
        width: "18rem",
      }}
    >
      <img alt="Sample" src={product.img} />
      <CardBody>
        <CardTitle tag="h5">{product.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {product.price} TL
        </CardSubtitle>
        <CardText>{product.description}</CardText>
        <Button color="primary" className="me-2" onClick={toggle}>
          Sepete Ekle
        </Button>
        <Link
          to={"/edit-product/" + product.id}
          className="btn btn-primary ml-2"
          data-cy="incele-link"
        >
          Düzenle
        </Link>
        {isAdmin && (
          <Button
            color="danger"
            className="me-2"
            onClick={() => deleteProduct(product.id)}
          >
            Sil
          </Button>
        )}
        <Link
          to={"/products/" + product.id}
          className="btn btn-primary me-2"
          data-cy="incele-link"
        >
          İncele
        </Link>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
