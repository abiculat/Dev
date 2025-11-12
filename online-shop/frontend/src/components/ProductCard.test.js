import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  description: 'This is a test product description',
  price: 100,
  discount: 10,
  finalPrice: 90,
  inStock: true,
  rating: 4.5,
  image: 'https://via.placeholder.com/150'
};

describe('ProductCard Component', () => {
  test('renders product name', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={() => {}}
        onViewDetails={() => {}}
      />
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('renders product price and discount', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={() => {}}
        onViewDetails={() => {}}
      />
    );
    expect(screen.getByText('$90.00')).toBeInTheDocument();
    expect(screen.getByText('10% OFF')).toBeInTheDocument();
  });

  test('renders in stock badge when product is in stock', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={() => {}}
        onViewDetails={() => {}}
      />
    );
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  test('renders add to cart button', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={() => {}}
        onViewDetails={() => {}}
      />
    );
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});
