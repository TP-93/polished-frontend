// @ts-nocheck
import * as React from 'react';
import { useQuery } from 'react-apollo';

import MockUp from '../../../../assets/images/mocks/broken_image.jpg';
import { getMenuImage } from '../../../../apollo/queries/shop';

interface Props {
  shopId: string;
}

export default function MenuImage({ shopId }: Props) {
  const { data } = useQuery(getMenuImage, {
    variables: {
      id: shopId,
    },
    skip: !shopId,
  });

  return (
    <img
      src={data?.menu?.menuImage || MockUp}
      alt="JORCUSTOM collection"
      style={{
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }}
    />
  );
}
