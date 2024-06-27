import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { OptiAndIncomingLeadsPage } from './OptiAndIncomingLeadsPage';
import { LEADS_QUERY } from '../api/getLeads';

test('LeadsPage renders without errors', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <OptiAndIncomingLeadsPage />
    </MockedProvider>,
  );

  // Assert that the component renders without throwing any errors
  const addButton = screen.getByText('leads.addNew');
  expect(addButton).not.toBeNull();
});

const mocks = [
  {
    request: {
      query: LEADS_QUERY,
      variables: {},
    },
    data: {
      leads: [
        {
          id: '1',
          tenantId: '1',
          platform: 'web',
          manuallyCreated: false,
          leadState: 'new',
          agentId: '1',
          createdAt: '2022-01-01T00:00:00Z',
          createdBy: '1',
          emailDetails: {
            emailSubject: 'Test Subject',
          },
          clientInformation: {
            title: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            language: 'English',
            emails: ['john.doe@example.com'],
            telephones: ['1234567890'],
            mobiles: ['1234567890'],
          },
        },
      ],
    },
  },
];
test('useGetLeadsQuery is called and handled correctly', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <OptiAndIncomingLeadsPage />
    </MockedProvider>,
  );

  // Espera a que los datos se carguen
  const leadsList = await screen.findByTestId('leads-list');
  expect(leadsList).not.toBeNull();

  // Aquí puedes hacer más afirmaciones sobre cómo se deben mostrar los datos
});
