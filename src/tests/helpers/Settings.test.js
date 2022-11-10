import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Settings from '../../pages/Settings'
import { screen } from '@testing-library/react';

describe('Testes do componente Settings', () => {
    it('A tela de configurações deve possuir um título', () => {
        renderWithRouterAndRedux(<Settings />)
        const settingTitle = screen.getByTestId("settings-title")
        expect(settingTitle).toBeInTheDocument()
        expect(settingTitle.innerHTML).toBe('Settings')
    })
})