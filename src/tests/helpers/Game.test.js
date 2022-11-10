import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Settings from '../../pages/Settings'
import { screen } from '@testing-library/react';
import Game from '../../pages/Game'

describe('Testes do componente Game', () => {
    it('Deve possuir um titulo Game!', () => {
        renderWithRouterAndRedux(<Game />)
        const gameTitle = screen.getByText('Game!')
        expect(gameTitle).toBeInTheDocument()
    })
})