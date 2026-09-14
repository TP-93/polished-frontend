// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

import ProductCard from '../common/ProductDetails/ProductCard';
import {
  getUserDesigns_userDesigns,
  getUserDesigns_userDesigns_edges,
} from '../../apollo/queries/types/getUserDesigns';
import { BtnBlackMediumMargin } from '../common/Buttons';

import useAutoLoad from '../../utils/hooks/useAutoLoad';

interface UserDesignListData {
  data: getUserDesigns_userDesigns;
  loadMore: () => void;
}

export default ({ data, loadMore }: UserDesignListData) => {
  const isMobile = useMediaQuery('(max-width:767px)');

  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [disabled, setDisabled] = React.useState<boolean>(false);

  const loadClickHandler = async () => {
    setDisabled(true);
    await loadMore();
    setDisabled(false);
  };

  useAutoLoad(btnRef);

  const filtered = data?.edges.filter(
    (edge: any) => edge.node.product !== null,
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridRowGap: isMobile ? '0.5rem' : '2rem',
        alignItems: 'start',
        paddingBottom: '3rem',
        gridTemplateColumns: isMobile ? '50vw 50vw' : `repeat(5, 1fr)`,
      }}
    >
      {filtered.map((udData: getUserDesigns_userDesigns_edges) => (
        <ProductCard
          key={udData.node.id}
          discount={false}
          initData={udData.node}
          customizedProducts
        />
      ))}

      {data?.pageInfo?.hasNextPage && (
        <BtnWrapper>
          <BtnBlackMediumMargin
            ref={btnRef}
            role="none"
            disabled={disabled}
            onClick={loadClickHandler}
          >
            Load more
          </BtnBlackMediumMargin>
        </BtnWrapper>
      )}
    </Box>
  );
};

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
