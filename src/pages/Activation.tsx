import styled from 'styled-components'
import { Form } from '../components/Form'

const StyledDiv = styled.div`
    font-size: 20px;
    text-align: center;
`

export const Activation = () => {
  return (
    <Form header="Поздравляем!">
        <StyledDiv>Аккаунт успешно активирован</StyledDiv>
    </Form>
  )
}
