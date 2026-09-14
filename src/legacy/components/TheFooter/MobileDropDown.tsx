// @ts-nocheck
import { Link } from 'react-router-dom';
import AnimateHeight from 'react-animate-height';
import styled, { css } from 'styled-components';
import React, { memo, useState } from 'react';

import { ReactComponent as CheckIcon } from '../../assets/images/icons/arrows/check_icon_thin_white.svg.tsx';
import { semiGrey, cocoRegular, cocoBold, white } from '../../styles/constants';

interface LinkProps {
  link: string;
  title: string;
  relative: boolean;
}

interface Props {
  list: LinkProps[];
  title: string;
}

export default memo(({ list, title }: Props) => {
  const [height, setHeight] = useState<any>(0);

  const toggle = () => setHeight(height === 0 ? 'auto' : 0);

  return (
    <>
      <Container onClick={() => toggle()}>
        <Title>{title}</Title>
        <DropdownIcon rotated={height === 0 ? 'true' : 'false'} />
      </Container>

      <Dropdown height={height}>
        {list.map((item) => (
          <Link to={item.link} key={item.title}>
            {item.title}
          </Link>
        ))}
      </Dropdown>
    </>
  );
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1rem 1rem 0;
  border-bottom: 0.5px solid ${white};
`;

const textStyles = css`
  font-size: 0.75rem;
  user-select: none;
  ${cocoRegular};
  text-transform: uppercase;
`;

const Title = styled.h3`
  ${textStyles};
  ${cocoBold};
  color: #f7f7f7;
  font-size: 0.75rem;
`;

const DropdownIcon = styled(CheckIcon)<{ rotated: 'true' | 'false' }>`
  width: 1rem;
  height: auto;
  transform: ${({ rotated }) =>
    rotated === 'true' ? 'none' : 'rotate(180deg)'};
`;

const Dropdown = styled(AnimateHeight)`
  position: relative;
  top: 1px;
  width: 100%;
  z-index: 2;
  padding: 0 0 0 1rem;
  overflow: auto;
  background-color: ${semiGrey};

  div {
    display: flex;
    flex-direction: column;

    a {
      padding: 0.4rem 0 0.4rem 0.5rem;
      color: #979797;
      font-size: 0.75rem !important;
      ${textStyles};
    }
  }
`;
