import { test, expect } from 'vitest';
import { act } from 'react-dom/test-utils';
import { useOnboardingUsersStore } from './useOnboardingUsersStore';

test('updateUser updates a user at a specific index', () => {
  const initialUser = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    gender: 'male',
    defaultLanguageId: 'en',
    mobileNumber: '1234567890',
    phoneNumber: '0987654321',
    tenantAssignments: [],
  };

  const anotherUser = {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane.doe@example.com',
    gender: 'female',
    defaultLanguageId: 'en',
    mobileNumber: '0987654321',
    phoneNumber: '1234567890',
    tenantAssignments: [],
  };

  const updatedUser = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe.updated@example.com',
    gender: 'male',
    defaultLanguageId: 'en',
    mobileNumber: '1234567890',
    phoneNumber: '0987654321',
    tenantAssignments: [],
  };

  act(() => {
    useOnboardingUsersStore.getState().addUser(initialUser);
    useOnboardingUsersStore.getState().addUser(anotherUser);
    useOnboardingUsersStore.getState().updateUser(updatedUser, 0);
  });

  const users = useOnboardingUsersStore.getState().users;
  expect(users[0]).toEqual(updatedUser);
  expect(users[1]).toEqual(anotherUser);
});

test('removeAllUsers removes all users', () => {
  act(() => {
    useOnboardingUsersStore.getState().addUser({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      gender: 'male',
      defaultLanguageId: 'en',
      mobileNumber: '1234567890',
      phoneNumber: '0987654321',
      tenantAssignments: [],
    });
    useOnboardingUsersStore.getState().removeAllUsers();
  });

  const users = useOnboardingUsersStore.getState().users;
  expect(users).toEqual([]);
});

test('removeUser removes a user', () => {
  act(() => {
    useOnboardingUsersStore.getState().addUser({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      gender: 'male',
      defaultLanguageId: 'en',
      mobileNumber: '1234567890',
      phoneNumber: '0987654321',
      tenantAssignments: [],
    });
    useOnboardingUsersStore.getState().addUser({
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'jane.doe@example.com',
      gender: 'female',
      defaultLanguageId: 'en',
      mobileNumber: '0987654321',
      phoneNumber: '1234567890',
      tenantAssignments: [],
    });
    useOnboardingUsersStore.getState().removeUser(0);
  });

  const users = useOnboardingUsersStore.getState().users;
  expect(users).toEqual([
    {
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'jane.doe@example.com',
      gender: 'female',
      defaultLanguageId: 'en',
      mobileNumber: '0987654321',
      phoneNumber: '1234567890',
      tenantAssignments: [],
    },
  ]);
});

test('addUser adds a user to the store', () => {
  const newUser = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    gender: 'male',
    defaultLanguageId: 'en',
    mobileNumber: '1234567890',
    phoneNumber: '0987654321',
    tenantAssignments: [],
  };

  act(() => {
    useOnboardingUsersStore.getState().addUser(newUser);
  });

  const users = useOnboardingUsersStore.getState().users;
  expect(users).toContainEqual(newUser);
});

test('setUsers sets the users in the store', () => {
  const newUsers = [
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      gender: 'male',
      defaultLanguageId: 'en',
      mobileNumber: '1234567890',
      phoneNumber: '0987654321',
      tenantAssignments: [],
    },
    {
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'jane.doe@example.com',
      gender: 'female',
      defaultLanguageId: 'en',
      mobileNumber: '0987654321',
      phoneNumber: '1234567890',
      tenantAssignments: [],
    },
  ];

  act(() => {
    useOnboardingUsersStore.getState().setUsers(newUsers);
  });

  const users = useOnboardingUsersStore.getState().users;
  expect(users).toEqual(newUsers);
});
