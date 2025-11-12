import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login({ email });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLogin(user);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="shadow">
            <CardHeader className="bg-primary text-white">
              <h3 className="mb-0">Login</h3>
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>

                <Button
                  color="primary"
                  size="lg"
                  block
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Don't have an account? <a href="/register">Register here</a>
                </p>
                <p className="mt-3">
                  <small className="text-muted">
                    💡 Tip: Just enter any email to login!
                  </small>
                </p>
                <p className="mt-2">
                  <small>Try these emails:</small>
                  <br />
                  <small>john@example.com</small>
                  <br />
                  <small>jane@example.com</small>
                  <br />
                  <small>bob@example.com</small>
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
