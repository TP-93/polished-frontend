// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';
import { ArrowIosDownwardOutline } from 'styled-icons/evaicons-outline';

import { useUserProvider } from '../../context/user';

import CloseModalBtn from '../common/Buttons/CloseModal';
import { cocoBold, noDesktop, cocoRegular } from '../../styles/constants';

interface Props {
  hasDesigns: any;
  selectedSize: string;
  closePopUp: () => void;
  toggleCartModal: (status: boolean) => void;
}

const CustomizePopUp = ({
  hasDesigns,
  selectedSize,
  closePopUp,
  toggleCartModal,
}: Props) => {
  const router = useHistory();
  const { id, slug } = useParams<any>();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: { customisePopUpPerks },
  } = languages[currentLanguage];

  const {
    asideTitle1,
    asideTitle2,
    asideTitle3,
    mainTitle,
    customizeBtn,
    addToCartBtn,
    perk1,
    perk2,
    perk3,
    perk4,
  } = customisePopUpPerks;

  const setOpenCustomize = () => {
    if (id) router.push(`/product-customize-edit/${id}/${selectedSize}`);

    if (slug) router.push(`/product-customize-create/${slug}/${selectedSize}`);
  };

  return (
    <ModalWrapper>
      <CloseModalBtn close={closePopUp} />

      <Aside>
        <AsideTitle>{asideTitle1}</AsideTitle>
        <AsideTitle>{asideTitle2}</AsideTitle>
        <AsideTitle>{asideTitle3}</AsideTitle>
      </Aside>

      <Content>
        <ContentTitle>{mainTitle}</ContentTitle>

        <ButtonsWrapper>
          <Button onClick={setOpenCustomize} disabled={!hasDesigns}>
            {customizeBtn}
          </Button>

          <Button
            onClick={() => {
              toggleCartModal(true);
              closePopUp();
            }}
          >
            {addToCartBtn}
          </Button>
        </ButtonsWrapper>

        <PerksList>
          <ListItem>
            <CheckIconWrapper>
              <ArrowIosDownwardOutline />
            </CheckIconWrapper>
            <p>
              {perk1.start} <strong>{perk1.strong}</strong> {perk1.end}
            </p>
          </ListItem>
          <ListItem>
            <CheckIconWrapper>
              <ArrowIosDownwardOutline />
            </CheckIconWrapper>
            <p>
              {perk2.start} <strong>{perk2.strong}</strong>
              {perk2.end}
            </p>
          </ListItem>
          <ListItem>
            <CheckIconWrapper>
              <ArrowIosDownwardOutline />
            </CheckIconWrapper>
            <p>
              {perk3.start} <strong>{perk3.strong}</strong> {perk3.end}
            </p>
          </ListItem>
          <ListItem>
            <CheckIconWrapper>
              <ArrowIosDownwardOutline />
            </CheckIconWrapper>
            <p>
              {perk4.start}
              <strong>{perk4.strong}</strong>
              {perk4.end}
            </p>
          </ListItem>
        </PerksList>
      </Content>
    </ModalWrapper>
  );
};

export default CustomizePopUp;

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  opacity: 1;
  width: calc(100vw * 45 / 100);

  @media ${noDesktop} {
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: calc(100vw * 95 / 100);
  }
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 35%;
  padding: 15px;
  background-color: black;
  opacity: 0.8;
  border-radius: 20px 0 0 20px;

  @media ${noDesktop} {
    width: 100%;
    border-radius: 20px 20px 0 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: black;
  padding: 15px;
  border-radius: 0 20px 20px 0;

  @media ${noDesktop} {
    width: 100%;
    border-radius: 0 0 20px 20px;
  }
`;

const AsideTitle = styled.div`
  width: 100%;
  padding: 0;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-align: left;
  color: #979797;
  ${cocoRegular};
  font-size: calc(0.45em + 1vmin);

  &:first-child {
    margin-bottom: 2rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContentTitle = styled.h1`
  text-transform: uppercase;
  color: #f7f7f7;
  text-align: center;
  width: 100%;
  ${cocoBold};
  font-size: calc(0.65em + 1vmin);
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  padding: 8% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 2%;
  text-align: center;
  outline: none;
  border: 1px solid #ffffff;
  border-radius: 50px;
  color: #f7f7f7;
  background: none;
  cursor: pointer;
  margin-bottom: 4%;
  ${cocoBold};
  font-size: calc(0.4em + 1vmin);

  &:first-child {
    background-color: #3e6ae1;
    border: 1px solid transparent;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PerksList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: #f7f7f7;
  position: relative;
  margin-bottom: 2%;
  ${cocoRegular};
  font-size: calc(0.35em + 1vmin);
  line-height: calc(0.35em + 2vmin);

  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-color: lightgrey;

  & > svg {
    width: 20px;
    color: #000;

    & > path {
      fill: #000;
    }
  }
`;
