import styled from "styled-components";

const Boton = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    text-decoration: none;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto;
    background-color: ${props => props.bgColor ? '#DA552F' : '#FFFFFF'};
    color: ${props => props.bgColor ? '#FFFFFF' : '#000000'};

    &:last-of-type{
        margin-right: 0;
    }

    &:hover{
        cursor: pointer;
    }
`;

export default Boton;