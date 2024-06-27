import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import IconPlatform from './IconPlatform';

// Correct the mock for static image files
vi.mock('../../../modules/leads/images/paruvendu-logo.png', () => ({
  default: 'paruvendu-logo-mock',
}));
vi.mock('../../../modules/leads/images/leboncoin-logo.png', () => ({
  default: 'leboncoin-logo-mock',
}));

describe('IconPlatform', () => {
  it('renders the leboncoin image for the Leboncoin platform', () => {
    render(<IconPlatform platform="Leboncoin" />);
    const image = screen.getByRole('img', { name: 'Leboncoin' });
    expect(image.getAttribute('src')).toBe('leboncoin-logo-mock');
    expect(image.getAttribute('alt')).toBe('Leboncoin');
  });

  it('renders the paruvendu image for the ParuVendu platform', () => {
    render(<IconPlatform platform="ParuVendu" />);
    const image = screen.getByRole('img', { name: 'ParuVendu' });
    expect(image.getAttribute('src')).toBe('paruvendu-logo-mock');
    expect(image.getAttribute('alt')).toBe('ParuVendu');
  });
});
