import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Badge,
  Row,
  Col
} from 'reactstrap';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Col md="6" lg="4" className="mb-4">
      <Card className="product-card h-100 shadow-sm">
        <div className="product-image">
          <img
            alt={product.name}
            src={product.image}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        </div>
        <CardBody>
          <CardTitle tag="h5">{product.name}</CardTitle>

          <div className="mb-2">
            <Badge color={product.inStock ? 'success' : 'danger'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>

          <CardText className="text-muted" style={{ fontSize: '0.9rem' }}>
            {product.description.substring(0, 50)}...
          </CardText>

          <Row className="align-items-center mb-3">
            <Col>
              <div className="price-section">
                {product.discount > 0 && (
                  <span className="original-price">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <h5 className="text-primary mb-0">
                  ${product.finalPrice.toFixed(2)}
                </h5>
                {product.discount > 0 && (
                  <Badge color="warning">{product.discount}% OFF</Badge>
                )}
              </div>
            </Col>
            <Col className="text-right">
              <small className="text-warning">⭐ {product.rating}</small>
            </Col>
          </Row>

          <Row className="g-2">
            <Col xs="6">
              <Button
                color="primary"
                size="sm"
                block
                onClick={() => onViewDetails(product._id)}
              >
                Details
              </Button>
            </Col>
            <Col xs="6">
              <Button
                color={isAdded ? 'success' : 'warning'}
                size="sm"
                block
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {isAdded ? '✓ Added' : 'Add'}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
