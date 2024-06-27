import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlagCountry } from './FlagCountry';
import * as flagUtils from '@/utils/flags';

// Mock the getFlagUrlByCountryName function
vi.mock('@/utils/flags', () => ({
  getFlagUrlByCountryName: vi.fn(),
}));

describe('FlagCountry', () => {
  it('renders null when name is not provided', () => {
    render(<FlagCountry name={undefined} />);
    const img = screen.queryByRole('img');
    expect(img).toBeNull();
  });

  it('renders an image when name is provided', () => {
    const countryName = 'Germany';
    const mockUrl = 'https://example.com/flag.jpg';
    // Use the mocked function to return a specific URL
    vi.mocked(flagUtils.getFlagUrlByCountryName).mockReturnValue(mockUrl);

    render(<FlagCountry name={countryName} />);
    const img = screen.getByRole('img');
    expect(img).not.toBeNull();
    // Directly check attributes without using toHaveAttribute
    expect(img.getAttribute('src')).toBe(mockUrl);
    expect(img.getAttribute('alt')).toBe(countryName);
    expect(img.getAttribute('title')).toBe(countryName);
  });
});
