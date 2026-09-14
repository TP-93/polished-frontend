// @ts-nocheck
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  a,
  a:hover {
    text-decoration: none;
  }
    
  textarea {
    resize: none;
  }

  button {
    outline: none;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }

  div[data-name='container'] {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 3px;
  }

  .swal2-toast {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 5px !important;
      background: #fff !important;
      color: #0C0C0C !important;
      border-radius: 8px !important;
  }
  
  .swal2-container {
    max-width: 100%;
  }

  .swal2-title {
    font-family: 'Coco Gothic', sans-serif;
    font-weight: 700 !important;
    font-style: normal !important;
    font-size: 14px !important;
    color: #000 !important;
    text-transform: uppercase !important;
  }
  
  #onetrust-consent-sdk {
    display: none;
  }
`;

export default GlobalStyle;
