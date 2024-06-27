import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FlagLanguage from './FlagLanguage';

// Mock the entire icons module
vi.mock('@/components/elements/Icon/icons', () => ({
  icons: {
    frFlag: vi.fn(() => <span>French Flag</span>),
    esFlag: vi.fn(() => <span>Spanish Flag</span>),
    deFlag: vi.fn(() => <span>German Flag</span>),
    gbFlag: vi.fn(() => <span>English Flag</span>),
    itFlag: vi.fn(() => <span>Italian Flag</span>),
  },
}));

describe('FlagLanguage', () => {
  it('renders the correct flag icon for a given language', () => {
    const { rerender } = render(<FlagLanguage language="French" />);
    expect(screen.getByText('French Flag')).not.toBeNull();

    rerender(<FlagLanguage language="Spanish" />);
    expect(screen.getByText('Spanish Flag')).not.toBeNull();

    rerender(<FlagLanguage language="German" />);
    expect(screen.getByText('German Flag')).not.toBeNull();
  });

  it('renders null for an unsupported language', () => {
    render(<FlagLanguage language="Unsupported" />);
    expect(screen.queryByText(/Flag$/)).toBeNull();
  });
});
