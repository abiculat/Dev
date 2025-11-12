import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <div className="text-center py-5">
            <h1 className="display-4 mb-4">Welcome to Online Shop 🛒</h1>
            <p className="lead">
              Discover amazing products with exclusive discounts and fast shipping
            </p>
            <Link to="/products">
              <Button color="warning" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-4">
          <Col md="4" className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody className="text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  🚚
                </div>
                <CardTitle tag="h5">Fast Shipping</CardTitle>
                <p>
                  We deliver your orders quickly to your doorstep with
                  real-time tracking.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md="4" className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody className="text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  💰
                </div>
                <CardTitle tag="h5">Best Prices</CardTitle>
                <p>
                  Get unbeatable prices with exclusive discounts on all
                  categories.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md="4" className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody className="text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  🔒
                </div>
                <CardTitle tag="h5">Secure Shopping</CardTitle>
                <p>
                  Your data is safe with us. We use secure payment processing.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md="6" className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody>
                <CardTitle tag="h5">Featured Collection</CardTitle>
                <p>Browse our latest collection of electronics, clothing, and more.</p>
                <Link to="/products">
                  <Button color="primary">Browse Collection</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>

          <Col md="6" className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <CardBody>
                <CardTitle tag="h5">Track Your Orders</CardTitle>
                <p>View your order history and track deliveries in real-time.</p>
                <Link to="/orders">
                  <Button color="info">View Orders</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
