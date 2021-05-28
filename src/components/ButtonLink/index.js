import React from 'react';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5050de;
    padding: 6px 8px;
  }
`;

const ButtonLink = (props) => {
  const { children, ...rest } = props;
  return (
    <Button {...rest} component={StyledLink}>
      {children}
    </Button>
  );
};

export default withStyles({ root: { padding: 0 } })(ButtonLink);
