import React, { createElement, Suspense, lazy } from 'react';
import _loadable from '@loadable/component';

const DefaultFallback = () => {
  return <div>loading...</div>;
};

export const loadable0 = (getComponent: any, options: { fallback?: React.ReactNode } = {}) => {
  const { fallback = <DefaultFallback /> } = options;

  return (props: any) => (
    <Suspense fallback={fallback}>{createElement(lazy(getComponent), props)}</Suspense>
  );
};

export const loadable = (getComponent: any, options: { fallback?: React.ReactNode } = {}) => {
  const { fallback = <DefaultFallback /> } = options;

  return _loadable(getComponent, { fallback });
};
