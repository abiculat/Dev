import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll({
        category: category || undefined
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleViewDetails = (id) => {
    alert(`Viewing details for product: ${id}`);
  };

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md="3">
          <Card>
            <CardHeader className="bg-primary text-white">Filters</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col md="9">
          <h2 className="mb-4">Products</h2>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <Row>
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </Row>
          ) : (
            <p>No products found</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
