import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'


vi.mock('@clerk/nextjs/server', () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_12345' })
      ),
    ClerkProvider: ({children}) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_12345'
        ,
        fullName: 'John Smith',
      },
    }),

  }
})

test('Home', async () => {
  render(await HomePage())
  expect(screen.getByText('get started')).toBeTruthy()
})

