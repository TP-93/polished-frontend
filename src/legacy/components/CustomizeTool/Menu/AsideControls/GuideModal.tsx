// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import { useUserProvider } from '../../../../context/user';

import CloseModal from '../../../common/Buttons/CloseModal';
import layerSection from '../../../../assets/images/customize-tool/guide/selectLayerSection.png';
import resetSection from '../../../../assets/images/customize-tool/guide/resetSection.png';
import themesSection from '../../../../assets/images/customize-tool/guide/themesSection.png';
import addToBagSection from '../../../../assets/images/customize-tool/guide/addToBagSection.png';
import generateSection from '../../../../assets/images/customize-tool/guide/generateSection.png';
import colorWheelSection from '../../../../assets/images/customize-tool/guide/colorWheelSection.png';
import imagePickerSection from '../../../../assets/images/customize-tool/guide/imagePickerSection.png';
import {
  tablet,
  desktop,
  noTablet,
  cocoBold,
  cocoRegular,
} from '../../../../styles/constants';

interface LinkProps {
  link: string;
  isActive: boolean;
  handler: any;
}

const LinkItem = ({ link, isActive, handler }: LinkProps) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (isActive) ref.current.scrollIntoView();
  }, [isActive]);

  return (
    <Link ref={ref} key={link} active={isActive} onClick={handler}>
      {link}
    </Link>
  );
};

interface Props {
  close: () => void;
}

const GuideModal = ({ close }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Product } = languages[currentLanguage];

  const {
    guideModalData: {
      mainTitle: { mobileTitle, desktopTitle },
      prevBtn,
      nextBtn,
      linksData,
      descriptionData,
    },
  } = Product;

  const icons = [
    layerSection,
    generateSection,
    themesSection,
    colorWheelSection,
    imagePickerSection,
    resetSection,
    addToBagSection,
  ];

  const prev = () => {
    if (currentStep - 1 >= 0) setCurrentStep((p) => p - 1);
  };

  const next = () => {
    if (currentStep + 1 <= 6) setCurrentStep((p) => p + 1);
  };

  return (
    <Container>
      <CloseModal close={close} />

      <LinksWrapper>
        <MediaQuery query={noTablet}>
          <Title>{mobileTitle}</Title>
        </MediaQuery>

        <MediaQuery query={tablet}>
          <Title>{desktopTitle}</Title>
        </MediaQuery>

        <Links>
          {linksData.map((link: string, indx: number) => (
            <LinkItem
              key={link}
              link={link}
              isActive={indx === currentStep}
              handler={() => {
                setCurrentStep(indx);
              }}
            />
          ))}
        </Links>

        <MediaQuery query={tablet}>
          {currentStep !== 0 && (
            <ControlButton withBorder onClick={prev}>
              {prevBtn}
            </ControlButton>
          )}
        </MediaQuery>
      </LinksWrapper>

      <StepWrapper>
        <StepImage src={icons[currentStep]} />

        <TextWrapper>
          <MediaQuery query={tablet}>
            <StepTitle>{descriptionData[currentStep].title}</StepTitle>
          </MediaQuery>

          <StepDescription>
            {descriptionData[currentStep].descr}
          </StepDescription>
        </TextWrapper>

        <ControlButtonWrapper>
          <MediaQuery query={noTablet}>
            {currentStep !== 0 && (
              <ControlButton withBorder onClick={prev}>
                {prevBtn}
              </ControlButton>
            )}
          </MediaQuery>

          {currentStep !== 6 && (
            <ControlButton active withBorder={false} onClick={next}>
              {nextBtn}
            </ControlButton>
          )}
        </ControlButtonWrapper>
      </StepWrapper>
    </Container>
  );
};

export default GuideModal;

const Container = styled.div`
  position: relative;
  display: flex;

  @media ${noTablet} {
    flex-direction: column;
    width: calc(100vw * 90 / 100);

    > button {
      top: -10px;
      right: -8px;
    }
  }

  @media ${tablet} {
    width: calc(100vw * 85 / 100);
  }

  @media ${desktop} {
    width: calc(100vw * 65 / 100);
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 30%;
  padding: 15px;
  opacity: 0.95;
  background-color: #1c1c1e;
  border-radius: 20px 0 0 20px;

  @media ${noTablet} {
    border-radius: 20px 20px 0 0;
  }
`;
// trigger
const StepWrapper = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  max-height: 85vh;
  background-color: #1c1c1e;
  border-radius: 0 20px 20px 0;

  @media ${noTablet} {
    min-height: 50vh;
    max-height: 50vh;
    border-radius: 0 0 20px 20px;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #f7f7f7;
  text-transform: uppercase;
  ${cocoBold};
  font-size: calc(0.5em + 1vmin);

  @media ${noTablet} {
    width: 100%;
    margin-bottom: 1%;
    text-align: center;
  }
`;

const Links = styled.ul`
  list-style: none;

  @media ${noTablet} {
    max-height: 20vh;
    overflow: scroll;
  }
`;

const Link = styled.li<{ active: boolean }>`
  padding: 5px 0 5px 10px;
  color: ${({ active }) => (active ? '#f7f7f7' : '#979797')};
  border-left: 3px solid ${({ active }) => (active ? '#f7f7f7' : 'transparent')};
  cursor: pointer;
  ${cocoRegular};
  font-size: calc(0.45em + 1vmin);

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepImage = styled.img`
  width: 100%;
  height: auto;
`;

const TextWrapper = styled.div`
  width: 100%;

  @media ${noTablet} {
    overflow: scroll;
  }
`;

const StepTitle = styled.h3`
  padding: 15px 15px 0 15px;
  text-align: left;
  color: #f7f7f7;
  ${cocoBold};
  font-size: calc(0.55em + 1vmin);
`;

const StepDescription = styled.p`
  padding: 15px;
  color: #f7f7f7;
  text-align: justify;
  line-height: 1.2rem;
  ${cocoRegular};
  font-size: calc(0.5em + 1vmin);
`;

const ControlButtonWrapper = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  padding: 1%;
`;

const ControlButton = styled.button<{ active?: boolean; withBorder?: boolean }>`
  width: 140px;
  padding: 1% 0;
  margin: ${({ active }) => (active ? 'auto 0 0 auto' : 'auto auto 0 0')};
  outline: none;
  background-color: ${({ active }) => (active ? '#3E6AE0' : 'transparent')};
  color: #f7f7f7;
  border: ${({ withBorder }) =>
    withBorder ? '2px solid #f7f7f7' : '2px solid #3E6AE0'};
  border-radius: 20px;
  cursor: pointer;
  ${cocoRegular};
  font-size: calc(0.5em + 1vmin);

  @media ${noTablet} {
    width: 30%;
  }
`;
