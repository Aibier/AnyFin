import styled from 'styled-components';

export const LoadingBarDiv = styled.div`
        position: absolute;
       top: 50%;
       left: 50%;
       border: 16px solid #f3f3f3;
       border-radius: 50%;
       border-top: 16px solid gold;
       border-right: 16px solid purple;
       border-bottom: 16px solid red;
       width: 60px;
       height: 60px;
       -webkit-animation: spin 2s linear infinite;
       animation: spin 2s linear infinite;
       @-webkit-keyframes spin {
           0% { -webkit-transform: rotate(0deg); }
           100% { -webkit-transform: rotate(360deg); }
       }
       
       @keyframes spin {
           0% { transform: rotate(0deg); }
           100% { transform: rotate(360deg); }
       }
`;