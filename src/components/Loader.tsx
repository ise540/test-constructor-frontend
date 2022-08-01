import React from "react";
import styled from "styled-components";

const LoaderOutside = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
  border-radius: 50%;
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const LoaderInside = styled.div`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
`;

const LoaderStick = styled.div`
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: white;
`;

export const Loader = () => {
  return (
    <LoaderOutside>
      <LoaderStick />
      <LoaderInside />
    </LoaderOutside>
  );
};
