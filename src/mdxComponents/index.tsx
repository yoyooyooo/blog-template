import { loadable } from '@/utils/loadable';
import React from 'react';
export * from './Link';
export * from './Playground';
import { Box } from '@/components/Box';

export const Center = (props) => <Box display="flex" justifyContent="center" {...props} />;
export { Box };

export const Card = loadable(() => import('./Card'));
