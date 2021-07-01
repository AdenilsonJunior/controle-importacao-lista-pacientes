import styled from "styled-components";

export const Layout = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 70%;
  margin: auto;
  max-width: 400px;
  border-radius: 5px;
  background-color: white;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: #e57878;
`;

export const Input = styled.input`
  border: 1px solid rgb(180, 180, 180);
  padding: 15px 20px;
  border-radius: 5px;
  margin-top: 20px;
  font-size: 1.5rem;
`;

export const Button = styled.input`
  border: none;
  padding: 15px 10px;
  border-radius: 5px;
  background-color: #3e80fe;
  font-weight: 500;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.2s;

  &:hover {
    background-color: #3e60fe;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export const Title = styled.h1`
  position: relative;
  z-index: 100;

  &::before {
    content: "";
    width: 2.3rem;
    height: 6px;
    position: absolute;
    background-color: #3e60fe;
    bottom: 0;
    z-index: -100;
  }
`;

export const FirebaseError = styled.p`
    font-weight: 500;
    margin: 0;
    color: #e57878;
    padding: 10px;
    border: 1px solid #e57878;
    border-radius: 5px;
`