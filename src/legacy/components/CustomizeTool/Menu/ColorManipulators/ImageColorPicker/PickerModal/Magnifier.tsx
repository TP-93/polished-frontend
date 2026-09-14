// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

interface Data {
  top: number;
  left: number;
  colorGrid: any;
}

interface Props {
  isMagnifier: boolean;
  magnifyData: Data;
}

const Magnifier = ({ isMagnifier, magnifyData }: Props) => {
  const { top, left, colorGrid } = magnifyData;

  return (
    <Wrapper isMagnifier={isMagnifier} top={top} left={left}>
      <table cellSpacing="0">
        <tbody>
          {colorGrid.length > 0 &&
            colorGrid.map((cluster: any, i1: number) => (
              <tr key={i1}>
                {cluster.map((data: any, i2: number) => (
                  <td
                    key={data.id}
                    style={{
                      width: '10px',
                      height: '10px',
                      border:
                        i1 === 4 && i2 === 4
                          ? '1px solid red'
                          : '1px solid black',
                      backgroundColor: `rgb(${data.color})`,
                    }}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Magnifier;

const Wrapper = styled.div<{ isMagnifier: boolean; top: any; left: any }>`
  display: ${({ isMagnifier }) => (isMagnifier ? 'block' : 'none')};
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  overflow: hidden;
  width: 90px;
  height: 90px;
  border: 1px solid black;
  border-radius: 50%;
  user-select: none;

  > * {
    user-select: none !important;
  }
`;
