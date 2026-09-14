// @ts-nocheck
import React from 'react';
import { Col } from 'styled-bootstrap-grid';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { cocoBold, cocoRegular } from '../../styles/constants';

interface linkProps {
  link: string;
  title: string;
  relative: boolean;
}

interface Props {
  title: string;
  list: linkProps[];
}

export function FooterList({ title: footerTitle, list }: Props) {
  return (
    <Col md={3} style={{ position: 'static' }}>
      <Title>{footerTitle}</Title>

      <List>
        {list.map(({ title, link, relative }) => (
          <li key={title}>
            {relative && (
              <FooterLink aria-label="jorcustom" to={link}>
                {title}
              </FooterLink>
            )}

            {!relative && (
              <FooterLinkA
                aria-label="jorcustom"
                rel="noopener noreferrer"
                target="_blank"
                href={link}
              >
                {title}
              </FooterLinkA>
            )}
          </li>
        ))}
      </List>
    </Col>
  );
}

const textStyles = css`
  ${cocoRegular};
  font-size: calc(0.2em + 1vmin);
  user-select: none;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  ${textStyles};
  ${cocoBold};
  color: #f7f7f7;
  font-size: calc(0.3em + 1vmin);
`;

const List = styled.ul`
  padding-left: 0;
  list-style: none;
  line-height: 1.2rem;
`;

const FooterLink = styled(Link)`
  ${textStyles};
  color: #979797;

  :hover {
    color: #fff;
    text-shadow: 0 0 0.04px;
  }
`;

const FooterLinkA = styled.a`
  ${textStyles};
  color: #979797;

  :hover {
    color: #fff;
    text-shadow: 0 0 0.04px;
  }
`;
