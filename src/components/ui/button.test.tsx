import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button'; // Adjust path as necessary

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a button by default', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button', { name: /Test Button/i })).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    const { container } = render(<Button>Default</Button>);
    // Note: Testing exact classes can be brittle. This is a basic check.
    // Consider testing visual aspects or behavior if classes are complex.
    expect(container.firstChild).toHaveClass('bg-primary'); // Example for default variant
    expect(container.firstChild).toHaveClass('h-10'); // Example for default size
  });

  it('applies specified variant and size classes', () => {
    const { container } = render(<Button variant="destructive" size="lg">Delete</Button>);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-destructive');
    expect(container.firstChild).toHaveClass('h-11'); // Corresponds to 'lg' size
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled and clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Click</Button>);
    fireEvent.click(screen.getByText('Disabled Click'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByRole('link', { name: /Link Button/i })).toBeInTheDocument();
    expect(screen.getByText('Link Button')).toHaveAttribute('href', '/test');
  });
});
