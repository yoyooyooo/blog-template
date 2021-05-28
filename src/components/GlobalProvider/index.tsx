import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as mdxComponents from '@/mdxComponents';
import { ThemeProvider } from 'styled-components';

const p = (props) => <p style={{ whiteSpace: 'pre-wrap' }} {...props} />;

export const RootProvider = ({ children }) => {
  return (
    <ThemeProvider theme={{ space: [0, 4, 8, 16, 32, 64] }}>
      <MDXProvider components={{ p, ...mdxComponents }}>{children}</MDXProvider>
    </ThemeProvider>
  );
};
