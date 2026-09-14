// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cocoRegular, black, desktop } from '../../styles/constants';
import { returnCurrentUser_me_orders_edges_node_lines as ServerOrderLine } from '../../apollo/queries/types/returnCurrentUser';
import { useUserProvider } from '../../context/user';

export default ({ line }: { line: ServerOrderLine }) => {
  const { variant, selectedImageGroup, userDesign } = line;
  const product = variant && variant.product;

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Account } = languages[currentLanguage];
  const {
    orders: { order },
  } = Account;
  const {
    info: { infoItem1, infoItem2, infoItem3 },
  } = order;

  let imageUrl: string | null = '';

  if (userDesign && userDesign.customizedDesigns) {
    const firstDesign = userDesign.customizedDesigns[0];
    if (firstDesign) {
      const { customizedPngDesign } = firstDesign;
      if (customizedPngDesign) {
        imageUrl = customizedPngDesign.url;
      }
    }
  } else if (selectedImageGroup) {
    imageUrl = selectedImageGroup.url;
  } else if (product && product.imageGroups) {
    const firstGroup = product.imageGroups[0];
    if (firstGroup) {
      imageUrl = firstGroup.url;
    }
  }

  const amount = Number(
    line.unitPrice && line.unitPrice ? line.unitPrice.amount : 0,
  );

  return (
    product && (
      <Container>
        <ImageWrapper>
          {imageUrl && <ProductImage src={imageUrl} alt="Product image" />}
        </ImageWrapper>
        <Info>
          <Title to={`/product/${product.slug}`}>{product.name}</Title>
          <InfoItem>
            {infoItem1} {line.size}
          </InfoItem>
          <InfoItem>
            {infoItem2} {line.quantity}
          </InfoItem>
          {Boolean(amount) && (
            <InfoItem>
              {infoItem3} {line.total ? line.total.localized : ''}
            </InfoItem>
          )}
        </Info>
      </Container>
    )
  );
};

const Container = styled.div`
  display: flex;
  padding: 10px;
  max-width: 100%;
`;

const ImageWrapper = styled.div`
  width: 180px;
  max-width: 45%;
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const Info = styled.div`
  padding: 10px;
  ${cocoRegular};
  font-size: 12px;
  text-transform: uppercase;
  width: 220px;
  max-width: 55%;

  @media ${desktop} {
    font-size: 14px;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
`;

const Title = styled(Link)`
  display: block;
  color: ${black};
  text-decoration: underline;
  margin-bottom: 10px;
  font-weight: 700;

  @media ${desktop} {
    font-size: 14px;
  }
`;
