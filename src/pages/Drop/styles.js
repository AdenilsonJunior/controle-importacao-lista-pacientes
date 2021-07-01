import styled, { css } from "styled-components";

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #E57878;
`;

export const Layout = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DropzoneWrapper = styled.div`
  width: 70%;
  margin: auto;
  max-width: 600px;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
`;

export const DropContainer = styled.div`
  border: 3px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5",
};

export const DropMessage = styled.h1`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 1.3rem;
  color: ${(props) => messageColors[props.type || "default"]};
  text-align: center;
`;

export const DroppedFileContainer = styled.div`
  width: 70%;
  margin: 20px 0;
  max-width: 600px;
  height: 20px;
  border-radius: 5px;
  background-color: white;
`;

export const Name = styled.strong`
  color: #2e2e2e;
  font-size: 1.2rem;
  font-weight: 600;
`;
export const Size = styled.span`
  color: #c1c1c1;
  font-size: 1.2rem;
  font-weight: 400;
`;
export const Header = styled.header`
  background-color: white;
  height: 80px;
  width: 100%;
  position: relative;
`;
export const Logout = styled.button`
  position: absolute;
  right: 30px;
  top: 20px;
  border: none;
  background-color: transparent;

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;
export const Error = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: #e57878;
`;
