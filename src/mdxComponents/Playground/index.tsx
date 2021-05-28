import { Box } from '@/components';
import { loadable } from '@/utils/loadable';
import { Code as CodeIcon } from '@styled-icons/boxicons-regular/Code';
import { CodeAlt as CodeAltIcon } from '@styled-icons/boxicons-regular/CodeAlt';
import { CopyAlt as CopyAltIcon } from '@styled-icons/boxicons-regular/CopyAlt';
import { Done as DoneIcon } from '@styled-icons/material/Done';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCopyToClipboard } from 'react-use';

const LiveEditor = loadable(() => import('./LiveEditor'));

const Wrap = styled(Box)<any>`
  ${(p) =>
    !p.pure &&
    `margin: 10px auto;
  box-shadow: 0 0px 20px -4px rgb(0, 0, 0, 0.25), 0 0 10px rgb(0, 0, 0, 0.1);`}

  position: relative;
  border-radius: 4px;
  ${(p) => p.inline && `display: inline-block;`}
`;
const IconsWrap = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  > svg {
    cursor: pointer;
  }
`;

const Preview = styled(Box)`
  height: 100%;
`;

const Code = styled.div<any>`
  display: ${(p) => (p.open ? `${p.inline ? 'inline-' : ''}block` : 'none')};
  white-space: pre-wrap;
  max-height: 400px;
  overflow: auto;
`;

const Copy = ({ code }) => {
  const [_state, copyToClipboard] = useCopyToClipboard();
  const [state, setState] = useState(_state);

  useEffect(() => {
    setState(_state);
  }, [_state]);

  return !state.error && state.value ? (
    <DoneIcon
      size={20}
      onMouseLeave={() => setState((state) => ({ ...state, value: undefined, error: undefined }))}
    />
  ) : (
    <CopyAltIcon size={16} onClick={() => code && copyToClipboard(code)} />
  );
};

export const Playground = ({ code, component, width, inline, pure, WrapBoxProps, ...BoxProps }) => {
  const [open, setOpen] = useState(false);

  const Icon = open ? CodeAltIcon : CodeIcon;

  return (
    <Wrap pure={pure} width={width} inline={inline} {...WrapBoxProps}>
      <Preview p={10} {...BoxProps}>
        {component}
        {code && (
          <IconsWrap>
            <Copy code={code} />
            <Icon size={20} onClick={() => setOpen((p) => !p)} />
          </IconsWrap>
        )}
      </Preview>
      {code && (
        <Code open={open} inline={inline}>
          <LiveEditor code={code} />
        </Code>
      )}
    </Wrap>
  );
};
