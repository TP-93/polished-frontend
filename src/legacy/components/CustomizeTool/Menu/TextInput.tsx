// @ts-nocheck
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { editText } from '../../../apollo/mutations/psdServer';
import { TypedMutation } from '../../../apollo/types';
import {
  EditTextLayer,
  EditTextLayerVariables,
} from '../../../apollo/mutations/types/EditTextLayer';

import { useUserProvider } from '../../../context/user';
import { useCustomizationStateValue } from '../../../context/customize';

import { getSortedLayers, getStaticLayers } from '../utils/customizationUtils';
import loadImage from '../../../utils/loadImage';
import ErrorMessage from '../../common/Errors';
import { Rectangle } from '../../../interfaces/product';
import { GUEST_TOKEN_NAME } from '../../../constants';
import { grey, noDesktop, cocoRegular } from '../../../styles/constants';

interface InfoProps {
  minChars: string;
  maxChars: string;
  notices: any;
}

const InputNotice = ({ minChars, maxChars, notices }: InfoProps) => {
  let info: string = '';

  const { notice1, notice2, notice3 } = notices;

  if (maxChars && minChars)
    info = notice1.replace('_min_', minChars).replace('_max_', maxChars);

  if (maxChars) info = notice2.replace('_max_', maxChars);

  if (minChars) info = notice3.replace('_min_', minChars);

  return <Notice>{info}</Notice>;
};

const EditTextMutation = TypedMutation<EditTextLayer, EditTextLayerVariables>(
  editText,
);

interface Props {
  layer: any;
  designs: any;
  toggleTextEditingStatus: any;
}

export default ({ layer, designs, toggleTextEditingStatus }: Props) => {
  const ref = useRef<any>(null);

  const [isFocus, toggleFocus] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputErrors, setErrors] = useState<any>({ text: '' });

  // can be set to false in .env to not spawn the server with likely invalid dev server requests
  const allowPsdServerInteractions =
    process.env.REACT_APP_ALLOW_PSD_SERVER_REQUESTS === 'true';

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      colorPickersData: {
        textInput: { confirmBtn, placeHolder, notices },
      },
    },
  } = languages[currentLanguage];

  const { state, dispatch } = useCustomizationStateValue();

  const {
    currentDesign: { toggledLayers, selectedLayerId },
    selectedDesignId,
  } = state;

  const staticLayers = getStaticLayers(designs, selectedDesignId);

  const {
    currentOption: { minChars, maxChars },
  } = getSortedLayers({
    layer,
    staticLayers,
    toggledLayers,
  });

  const confirmHandler = async (editDesignText: any) => {
    setErrors({ text: '' });
    setLoading(true);
    toggleTextEditingStatus(true);

    const { length } = inputValue;
    const isValidValue = length >= (minChars || 1) && length <= (maxChars || 1);

    if (isValidValue) {
      if (allowPsdServerInteractions) {
        const res = await editDesignText({
          variables: {
            input: {
              text: inputValue,
              layerId: selectedLayerId,
              designId: selectedDesignId,
            },
            token: localStorage.getItem(GUEST_TOKEN_NAME),
          },
        });

        if (res?.data?.editTextLayer) {
          const { success, newTextLayerImgUrl, rectangle, errors } =
            res.data.editTextLayer;

          if (errors?.length) {
            const textErrors = errors.filter(
              (err: any) => err.field === 'text',
            );

            if (textErrors?.length) {
              const newErrors = {
                text: textErrors.map((err: any) => err.message).join('. '),
              };

              setErrors(newErrors);
            }
          }

          const rect: Rectangle = JSON.parse(rectangle);

          if (success && newTextLayerImgUrl) {
            loadImage(newTextLayerImgUrl).then((img) => {
              dispatch({
                type: 'OPEN_TEXT_EDITING_SESSION',
                payload: {
                  img,
                  rect,
                  value: inputValue,
                },
              });

              dispatch({
                type: 'INIT_SAVING_TEXT_LAYER',
              });

              dispatch({
                type: 'APPLY_NEW_LAYER_TEXT',
              });

              dispatch({
                type: 'CLOSE_TEXT_EDITING_SESSION',
              });
            });
          }
        }
      }
    }

    setLoading(false);
    setInputValue('');
    toggleTextEditingStatus(false);

    toggleFocus(false);
  };

  const clickOutsideFormHandler = (e: any) => {
    if (window.innerWidth < 1024) {
      e.stopPropagation();

      const {
        target: { localName: name },
      } = e;

      if (!isFocus && name === 'input') {
        toggleFocus(true);
        document.body.style.touchAction = 'none';
      }
      if (isFocus && name !== 'input' && name !== 'button') {
        toggleFocus(false);
        document.body.removeAttribute('style');
      }
    }
  };

  return (
    <EditTextMutation>
      {(editDesignText, { error }) => {
        if (error) {
          return (
            <ErrorMessage>
              {error?.message || 'Er is iets fout gegaan'}
            </ErrorMessage>
          );
        }

        return (
          <Container
            ref={ref}
            isFocus={isFocus}
            onClick={clickOutsideFormHandler}
          >
            <InputRow>
              <Input
                value={inputValue}
                disabled={isLoading}
                maxLength={maxChars}
                minLength={minChars}
                placeholder={placeHolder}
                onChange={(e: any) => {
                  if (e.target.value.length > maxChars)
                    setInputValue(e.target.value.slice(0, maxChars));

                  if (e.target.value.length <= maxChars)
                    setInputValue(e.target.value);
                }}
              />
              <SubmitBtn
                disabled={isLoading}
                onClick={() => confirmHandler(editDesignText)}
              >
                {isLoading ? 'Loading...' : confirmBtn}
              </SubmitBtn>
            </InputRow>

            <InputNotice
              minChars={minChars}
              maxChars={maxChars}
              notices={notices}
            />

            {inputErrors?.text && <RedNotice>{inputErrors.text}</RedNotice>}
          </Container>
        );
      }}
    </EditTextMutation>
  );
};

const fixedStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #2c2c2e;
  transition: all 0.15s ease-in-out;
  overflow: hidden;
`;

const staticStyles = css`
  position: relative;
  z-index: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2% 5px 0 0;
  transition: all 0.15s ease-in-out;

  @media ${noDesktop} {
    padding: 0;
  }
`;

const Container = styled.div<{ isFocus?: boolean }>`
  ${({ isFocus }) => (isFocus ? fixedStyles : staticStyles)};
  user-select: none;
`;

const InputRow = styled.div<{ isFixed?: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  width: 72%;
  padding: 1.5%;
  opacity: 0.75;
  text-align: center;
  outline: none;
  border: 2px solid #f7f7f7;
  border-radius: 50px;
  color: #f7f7f7;
  background-color: transparent;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);

  &::placeholder {
    color: #979797;
    user-select: none;
    text-transform: uppercase;
  }
`;

const SubmitBtn = styled.button`
  width: 27%;
  padding: 1.5%;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #3e6ae0;
  color: #fff;
  border-radius: 50px;
  text-transform: uppercase;
  opacity: 0.85;
  user-select: none;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);
`;

const Notice = styled.div`
  color: ${grey};
  text-align: center;
  user-select: none;
  margin-top: 2%;
  font-size: calc(0.35em + 1vmin);
  ${cocoRegular};
`;

const RedNotice = styled(Notice)`
  max-width: 400px;
  color: red;
`;
