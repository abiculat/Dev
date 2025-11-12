import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import { orderService } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const colors = {
      Pending: 'warning',
      Processing: 'info',
      Shipped: 'primary',
      Delivered: 'success',
      Cancelled: 'danger'
    };
    return <Badge color={colors[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <Card>
          <CardBody>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>
                      <Badge
                        color={order.paymentStatus ? 'success' : 'danger'}
                      >
                        {order.paymentStatus ? 'Paid' : 'Pending'}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => viewOrderDetails(order)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody className="text-center py-5">
            <h5>No orders found</h5>
            <p>Start shopping to create your first order!</p>
          </CardBody>
        </Card>
      )}

      {selectedOrder && (
        <Modal isOpen={showModal} toggle={() => setShowModal(false)} size="lg">
          <ModalHeader toggle={() => setShowModal(false)}>
            Order {selectedOrder.orderNumber}
          </ModalHeader>
          <ModalBody>
            <Row className="mb-3">
              <Col md="6">
                <strong>Order Status:</strong> {getStatusBadge(selectedOrder.status)}
              </Col>
              <Col md="6">
                <strong>Payment Status:</strong>{' '}
                <Badge
                  color={
                    selectedOrder.paymentStatus ? 'success' : 'danger'
                  }
                >
                  {selectedOrder.paymentStatus ? 'Paid' : 'Pending'}
                </Badge>
              </Col>
            </Row>

            <h6>Items:</h6>
            <Table striped size="sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.productId?.name || 'Product'}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="mt-3">
              <Col>
                <p>
                  <strong>Subtotal:</strong> ${selectedOrder.subtotal.toFixed(2)}
                </p>
                <p>
                  <strong>Tax:</strong> ${selectedOrder.tax.toFixed(2)}
                </p>
                <h6>
                  <strong>Total:</strong> ${selectedOrder.totalAmount.toFixed(2)}
                </h6>
              </Col>
            </Row>

            {selectedOrder.shippingAddress && (
              <div className="mt-3">
                <h6>Shipping Address:</h6>
                <p>
                  {selectedOrder.shippingAddress.street}
                  <br />
                  {selectedOrder.shippingAddress.city},{' '}
                  {selectedOrder.shippingAddress.state}{' '}
                  {selectedOrder.shippingAddress.zipCode}
                  <br />
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>
            )}
          </ModalBody>
        </Modal>
      )}
    </Container>
  );
};

export default Orders;
