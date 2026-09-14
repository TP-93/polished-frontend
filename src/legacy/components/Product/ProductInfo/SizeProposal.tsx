// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import styled, { css } from 'styled-components';

import {
  cocoBold,
  cocoRegular,
  desktop,
  noDesktop,
  noTablet,
  red,
  tablet,
} from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

const GET_SIZE = gql`
  query getSizeValues($height: Int!, $weight: Int!, $productId: ID!) {
    productSizeReference(
      height: $height
      weight: $weight
      productId: $productId
    ) {
      size
    }
  }
`;

interface Props {
  productId: string;
}

const SizeProposal = ({ productId }: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Product } = languages[currentLanguage];
  const { productInfo } = Product;
  const {
    proposal,
    bigLengthError,
    bigWeightError,
    emptyValuesError,
    floatNumberError,
  } = productInfo;
  const {
    heightLabelText,
    heightPlaceholder,
    weightLabelText,
    weightPlaceholder,
    getSizeBtnText,
    enterParametersText,
    noValueForParameters,
    sizeResponseText,
  } = proposal;

  const [height, setHeight] = useState<any>('');
  const [weight, setWeight] = useState<any>('');
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>(enterParametersText);
  const [skipQuery, setSkipQuery] = useState<any>(true);

  const isHeightInvalid = !Number(height);
  const isWeightInvalid = !Number(weight);

  const isBtnDisabled = isHeightInvalid || isWeightInvalid;

  useEffect(() => {
    if (error.length) {
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }, [error]);

  const submitHandler = () => {
    const pattern = /^[0-9]+$/;

    if (!pattern.test(height) || !pattern.test(weight))
      return setError(floatNumberError);

    if (Number.parseInt(height, 10) <= 0 || Number.parseInt(weight, 10) <= 0)
      return setError(emptyValuesError);

    if (Number.parseInt(height, 10) > 250) return setError(bigLengthError);

    if (Number.parseInt(weight, 10) > 300) return setError(bigWeightError);

    return setSkipQuery(false);
  };

  const completedHandler = () => {
    setSkipQuery(true);
  };

  const vars = {
    height: Number.parseInt(height, 10),
    weight: Number.parseInt(weight, 10),
    productId,
  };

  return (
    <Query
      skip={skipQuery}
      query={GET_SIZE}
      variables={vars}
      onError={completedHandler}
      onCompleted={completedHandler}
      fetchPolicy="network-only"
    >
      {({ data, loading }: { data: any; loading: boolean }) => {
        if (!loading && data) {
          if (data.productSizeReference)
            setStatus(
              `${sizeResponseText.replace(
                '__%__',
                data.productSizeReference.size,
              )}`,
            );

          if (!data.productSizeReference) setStatus(noValueForParameters);

          setHeight('');
          setWeight('');
        }

        return (
          <SizesForm>
            <InputWrapper>
              <Label>{heightLabelText}</Label>
              <InputContainer>
                <Input
                  maxLength={3}
                  disabled={loading}
                  placeholder={heightPlaceholder}
                  value={height}
                  onChange={(e: any) => {
                    const { value } = e.target;

                    setHeight(value);
                  }}
                />
                <MeasureUnit>cm</MeasureUnit>
              </InputContainer>
            </InputWrapper>

            <InputWrapper>
              <Label>{weightLabelText}</Label>
              <InputContainer>
                <Input
                  disabled={loading}
                  value={weight}
                  maxLength={3}
                  placeholder={weightPlaceholder}
                  onChange={(e: any) => {
                    const { value } = e.target;
                    setWeight(value);
                  }}
                />
                <MeasureUnit>kg</MeasureUnit>
              </InputContainer>
            </InputWrapper>

            <ProposalButton
              onClick={submitHandler}
              disabled={isBtnDisabled || loading}
            >
              {getSizeBtnText}
            </ProposalButton>

            <SizeCalculation>{status}</SizeCalculation>

            {error?.length > 0 && <Error>{error}</Error>}
          </SizesForm>
        );
      }}
    </Query>
  );
};

export default SizeProposal;

const SizesForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media ${noTablet} {
    width: 100%;
  }
  @media ${tablet} {
    width: 75%;
  }
  @media ${desktop} {
    width: 40%;
  }
`;

const textStyles = css`
  ${cocoRegular};
  font-size: calc(0.35em + 1vmin);

  @media ${noDesktop} {
    font-size: calc(0.45em + 1vmin);
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  ${textStyles};
`;

const Label = styled.div`
  width: 50%;
  padding: 10px 20px;
  background-color: #8c8c8c;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  ${textStyles};
`;

const InputContainer = styled.div`
  display: flex;
  width: 50%;
  padding: 10px 25px;
  background-color: #1c1c1e;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;

  @media ${noTablet} {
    padding: 10px 25px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: #979797;
  background-color: #1c1c1e;
  ${textStyles};
`;

const MeasureUnit = styled.span`
  color: #979797;
  ${cocoRegular};
`;

const ProposalButton = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 2%;
  border-radius: 50px;
  background-color: #3e6ae1;
  border: none;
  outline: none;
  ${textStyles};
  color: #f7f7f7;
  cursor: pointer;

  &:disabled {
    opacity: 0.8;
  }
`;

const SizeCalculation = styled.div`
  margin-top: 20px;
  ${textStyles};
  color: #f7f7f7;
`;

const Error = styled.p`
  color: ${red};
  ${textStyles};
  ${cocoBold};
`;
