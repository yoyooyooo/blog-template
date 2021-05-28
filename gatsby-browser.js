/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import 'katex/dist/katex.min.css';
import './src/global.less';
import { RootProvider } from '@/components/GlobalProvider';
import 'lazysizes';
// import 'gatsby-remark-vscode/styles.css';

export const wrapRootElement = ({ element }) => {
  return <RootProvider>{element}</RootProvider>;
};

// https://gatsbyjs.org/docs/add-offline-support-with-a-service-worker
export const onServiceWorkerUpdateReady = () => window.location.reload();
