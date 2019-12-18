import styled from 'styled-components';


export const SearchInput = styled.input`
    :focus {
        box-shadow: unset !important;
    }
    ::placeholder {
           font-size: 0.95rem;
           color: #aaa;
           font-style: italic;
    };
`;