import { Link as GLink } from 'gatsby';
import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 1em;
  border-radius: 4px;
  margin: 0 auto;
  width: 1280px;
  padding: 12px;

  @media only screen and (max-width: 992px) {
    & {
      width: calc(100% - 20px);
    }
  }
  @media only screen and (max-width: 767px) {
    & {
      width: calc(100% - 5px);
    }
  }

  ${(props) => (props.isPage ? '' : `background-color: #fff;`)}

  ${(props) =>
    props.isPost
      ? ` padding: 20px 40px;
          box-shadow: 0 4px 10px rgba(0,0,0,.05), 0 0 1px rgba(0,0,0,.1);
          width: calc(100vw - 550px);
          @media only screen and (max-width: 1200px) {
            & {
              width: calc(100vw - 300px);
              margin: 1em auto 0 10px;
            }
          }
          @media only screen and (max-width: 992px) {
            & {
              width: calc(100% - 20px);
            }
          }
        `
      : ''}
`;

export const Link = styled(GLink)`
  display: block;
  margin-bottom: 40px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background-color: #fff;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 1px 8px 0 rgba(179, 175, 175, 0.15), 0 1px 17px 0 rgba(169, 164, 164, 0.15);
  &:hover {
    transform: translate(0px, -2px);
    box-shadow: 0 15px 45px -10px rgba(10, 16, 34, 0.2);
  }
  &:active {
    transform: translate(0px, 2px);
    box-shadow: 0 1px 1px 0 rgba(31, 35, 46, 0.15);
  }
`;
