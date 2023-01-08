import {render, screen} from '@testing-library/react'
import Login from './Login'


test('Login', () => {
    render(<Login/>)
    const text = screen.getByText("Login")
    expect(text).toBeInTheDocument()
})