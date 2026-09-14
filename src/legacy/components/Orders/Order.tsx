// @ts-nocheck
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import OrderLine from './OrderLine';
import { extractId } from '../../utils/idUtils';
import {
  raisinBlack,
  cocoBold,
  black,
  white,
  tablet,
  desktop,
} from '../../styles/constants';
import { ReactComponent as ChevronIcon } from '../../assets/images/icons/arrows/check_icon_thin_white.svg.tsx';
import { returnCurrentUser_me_orders_edges_node_lines as ServerOrderLine } from '../../apollo/queries/types/returnCurrentUser';
import { useUserProvider } from '../../context/user';

export default ({ data }: any) => {
  const [toggled, setToggled] = useState(false);

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const {
    Account: {
      orders: {
        order: { labelText1, labelText2, labelText3 },
      },
    },
  } = languages[currentLanguage];

  return (
    <Container>
      <Row>
        <Col>
          <Label>{labelText1} </Label> <Data>{extractId(data.id)}</Data>
        </Col>
        <Col>
          <Label>{labelText2} </Label> <Data>{data.total.localized}</Data>
        </Col>
        <Col>
          <Label>{labelText3} </Label> <Data>{data.paymentStatus}</Data>
        </Col>
      </Row>
      <Toggle open={toggled} onClick={() => setToggled(!toggled)}>
        <Chevron />
      </Toggle>
      {toggled && (
        <Flex>
          {data.lines &&
            data.lines.length &&
            data.lines.map((line: ServerOrderLine) => (
              <OrderLine key={line.id} line={line} />
            ))}
        </Flex>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 15px;
  border: 2px solid ${raisinBlack};
  border-radius: 10px;
  position: relative;

  &:last-child {
    margin-bottom: 0px;
  }

  @media ${tablet} {
    width: 100%;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Col = styled.div`
  text-align: center;
`;

const text = css`
  ${cocoBold};
  font-size: 12px;
  color: ${raisinBlack};
  text-transform: uppercase;

  @media ${desktop} {
    font-size: 20px;
  }
`;

const Label = styled.label`
  ${text}
`;

const Data = styled.span`
  ${text}
`;

const Toggle = styled.div<{ open: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(50% - 15px);
  bottom: -15px;
  border: 2px solid ${raisinBlack};
  border-radius: 50%;
  background-color: ${white};
  transform: rotate(${(p) => (p.open ? '180deg' : '0')});
  transition: all 0.15s ease-in-out;
`;

const Chevron = styled(ChevronIcon)`
  width: 20px;
  height: auto;

  path {
    fill: ${black};
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
