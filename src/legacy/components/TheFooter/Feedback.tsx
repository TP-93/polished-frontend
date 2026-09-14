// @ts-nocheck
import React from 'react';
import { StarFull } from 'styled-icons/icomoon';
import styled, { css } from 'styled-components';

import { useUserProvider } from '../../context/user';
import { ReactComponent as FeedbackIcon } from '../../assets/images/icons/socials/feedback.svg.tsx';
import {
  cocoRegular,
  white,
  desktop,
  noDesktop,
  cocoBold,
} from '../../styles/constants';

export const renderStars = (n = 5) => {
  const stars: JSX.Element[] = [];

  for (let i = 0; i < n; i += 1) {
    stars.push(
      <StarWrapper key={i}>
        <StarFull size={18} />
      </StarWrapper>,
    );
  }

  return <StarRow>{stars}</StarRow>;
};

interface Props {
  withReviewIcon?: boolean;
}

export default function FeedBack({ withReviewIcon }: Props) {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Footer } = languages[currentLanguage];
  const { reviews } = Footer;
  const { title, titleList } = reviews;

  const link = 'https://www.feedbackcompany.com/nl-nl/reviews/jorcustom/';

  const redirectHandler = () => window.open(link, '_blank');

  return (
    <Container onClick={redirectHandler}>
      <Title>{title}</Title>

      <Text>{titleList.assessFeedback}</Text>

      <FlexRow>
        <Mark>{9.2}</Mark>

        {renderStars()}
      </FlexRow>

      <Review>
        <ReviewText>{titleList.reviewUs}</ReviewText>

        {!withReviewIcon && <ReviewLink>feedbackcompany</ReviewLink>}

        {withReviewIcon && <ReviewIcon />}
      </Review>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  text-align: center;

  @media ${desktop} {
    max-width: 25%;
    flex-basis: 25%;
    text-align: left;
  }
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: #f7f7f7;
  font-size: 1rem;
  ${cocoBold};
  user-select: none;
  text-transform: uppercase;
`;

const textStyles = css`
  color: #fff;
  ${cocoRegular};
  font-size: calc(0.1em + 1vmin);
`;

const Text = styled.p`
  ${textStyles};
  font-size: 0.7rem;
`;

const rowStyles = css`
  display: flex;
  align-items: flex-end;

  @media ${noDesktop} {
    justify-content: center;
  }
`;

const FlexRow = styled.div`
  ${rowStyles};
`;

const Mark = styled.span`
  margin-right: 0.3rem;
  color: ${white};
  font-size: 0.8rem;
  ${cocoRegular};
`;

const StarRow = styled.div`
  ${rowStyles};
`;

const StarWrapper = styled.div`
  color: #f9ae18;
  padding: 1px;
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;

  @media ${desktop} {
    justify-content: flex-start;
  }
`;

const ReviewText = styled.span`
  margin-right: 0.3rem;
  ${textStyles};
  font-size: 0.8rem;
`;

const ReviewLink = styled.span`
  margin-right: 0;
  cursor: pointer;
  ${textStyles};
  text-decoration: underline;
`;

const ReviewIcon = styled(FeedbackIcon)``;
