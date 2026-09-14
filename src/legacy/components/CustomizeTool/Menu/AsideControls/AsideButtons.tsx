// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import { isAuthenticated } from '../../../../apollo/queries/auth';
import { useCustomizationStateValue } from '../../../../context/customize';

import GuideModal from './GuideModal';
import ModalPortal from '../../../common/Modals/ModalPortal';
import ConfirmModal from './ConfirmModal';
import { cocoRegular, desktop } from '../../../../styles/constants';
import { ReactComponent as GuideModalIcon } from '../../../../assets/images/customize-tool/buttons/guideIcon.svg.tsx';
import { ReactComponent as SaveDesignIcon } from '../../../../assets/images/customize-tool/buttons/saveDesignIcon.svg.tsx';
import { ReactComponent as ResetDesignIcon } from '../../../../assets/images/customize-tool/buttons/resetIcon.svg.tsx';

const isEmptyObject = (obj: any) => JSON.stringify(obj) === '{}';

interface Props {
  titles: any;
  isTextEditing: boolean;
  saveDesign: () => string;
  setCartProcessError: (error: string) => void;
  toggleSavingProcess: (status: boolean) => void;
  resetSelectionHandler: () => void;
}

const AsideButtons = ({
  titles,
  saveDesign,
  isTextEditing,
  setCartProcessError,
  toggleSavingProcess,
  resetSelectionHandler,
}: Props) => {
  const [isGuideModal, toggleGuideModal] = useState<boolean>(false);
  const [isResetModal, toggleResetModal] = useState<boolean>(false);
  const [isConfirmModal, toggleConfirmModal] = useState<boolean>(false);

  const { state, dispatch } = useCustomizationStateValue();
  const {
    currentDesign: { changedLayersWithColor, changedLayersWithText },
  } = state;

  const saveText =
    'Your design has been successfully saved. Go to my account -> my designs to view your design.';
  const resetText = 'Are you sure you want to reset the design?';
  const createError = 'Design cannot be saved. try again later!';

  const toggleGuideModalHandler = () => toggleGuideModal((prev) => !prev);
  const toggleResetModalHandler = () => toggleResetModal((prev) => !prev);
  const toggleConfirmModalHandler = () => toggleConfirmModal((prev) => !prev);

  const resetAction = () => {
    dispatch({
      type: 'RESET_DESIGN',
    });
    resetSelectionHandler();
  };

  const resetDesignHandler = () => {
    return toggleResetModalHandler();
  };

  const saveDesignHandler = async () => {
    try {
      toggleSavingProcess(true);

      const newDesignId = await saveDesign();

      if (newDesignId) {
        toggleSavingProcess(false);
        toggleConfirmModalHandler();

        return null;
      }
    } catch (error) {
      setCartProcessError(createError);
    } finally {
      toggleSavingProcess(false);
    }

    return null;
  };

  const noChangesDetected =
    isEmptyObject(changedLayersWithColor) &&
    isEmptyObject(changedLayersWithText);

  return (
    <>
      <BtnsWrapper>
        <Button color="#ff453a" onClick={resetDesignHandler}>
          <ResetIcon />
          <span>{titles.reset}</span>
        </Button>

        <Button
          color="#ffd60a"
          onClick={toggleGuideModalHandler}
          disabled={isTextEditing}
        >
          <GuideIcon />
          <span>{titles.guide}</span>
        </Button>

        <Query query={isAuthenticated}>
          {({ data }: { data: any }) => {
            if (!data) return null;

            if (data?.isLoggedIn)
              return (
                <Button
                  color="#8f8f8f"
                  disabled={noChangesDetected || isTextEditing}
                  onClick={saveDesignHandler}
                >
                  <SaveIcon />
                  <span>{titles.save}</span>
                </Button>
              );

            return null;
          }}
        </Query>
      </BtnsWrapper>

      <ModalPortal isOpen={isGuideModal} close={toggleGuideModalHandler}>
        <GuideModal close={toggleGuideModalHandler} />
      </ModalPortal>

      <ModalPortal isOpen={isResetModal} close={toggleResetModalHandler}>
        <ConfirmModal
          text={resetText}
          isReset={true}
          close={toggleResetModalHandler}
          resetAction={resetAction}
        />
      </ModalPortal>

      <ModalPortal isOpen={isConfirmModal} close={toggleConfirmModalHandler}>
        <ConfirmModal
          text={saveText}
          isReset={false}
          close={toggleConfirmModalHandler}
        />
      </ModalPortal>
    </>
  );
};

export default AsideButtons;

const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button<{ color: string; isDisabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 2%;
  background-color: transparent;
  text-transform: capitalize;
  border: 2px solid ${({ color }) => color};
  color: ${({ color }) => color};
  border-radius: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);

  @media (min-width: 1360px) {
    font-size: calc(0.35em + 1vmin);
  }

  &:last-child {
    margin-bottom: 0;
  }

  > svg {
    flex-basis: 15%;
    height: 2vh;
  }

  > span {
    flex-basis: 85%;
    text-align: left;
    padding-left: 5px;
  }

  @media ${desktop} {
    &:hover {
      background-color: ${({ color }) => color};
      color: #fff;
      opacity: 1;

      & > svg {
        & path {
          fill: #fff;
        }
      }
    }
  }
`;

const ResetIcon = styled(ResetDesignIcon)``;
const GuideIcon = styled(GuideModalIcon)``;
const SaveIcon = styled(SaveDesignIcon)``;
