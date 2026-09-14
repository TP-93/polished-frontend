// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { useUserProvider } from '../../../context/user';

import { cocoRegular } from '../../../styles/constants';

interface Props {
  sizeInfo: string;
}

const SizeReference = ({ sizeInfo }: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      productInfo: { emptySizeReference },
    },
  } = languages[currentLanguage];

  if (!sizeInfo?.length)
    return (
      <ReferenceInfo>
        <p>{emptySizeReference}</p>
      </ReferenceInfo>
    );

  return (
    <ReferenceInfo
      dangerouslySetInnerHTML={{
        __html: sizeInfo,
      }}
    />
  );
};

export default SizeReference;

const ReferenceInfo = styled.div`
  & * {
    ${cocoRegular};
    text-align: justify;
    font-size: calc(0.35em + 1vmin);
  }
`;
