// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

import Swal from 'sweetalert2';
import MediaQuery from 'react-responsive';
import styled, { css } from 'styled-components';
import { withRouter, match } from 'react-router-dom';
import { MutationUpdaterFn } from 'apollo-boost';

import { PlusCircle, MinusCircle } from 'styled-icons/boxicons-solid';
import { MutationFunction, MutationResult } from 'react-apollo';

import { getCheckout } from '../../../apollo/queries/checkout';
import { TypedMutation } from '../../../apollo/types';
import {
  deleteCheckout,
  updateCheckoutLine,
  deleteCheckoutLine,
} from '../../../apollo/mutations/checkout';
import {
  checkoutDeleteVariables,
  checkoutDelete as checkoutDeleteData,
} from '../../../apollo/mutations/types/checkoutDelete';
import {
  checkoutLinesUpdateVariables,
  checkoutLinesUpdate as checkoutLinesUpdateData,
} from '../../../apollo/mutations/types/checkoutLinesUpdate';
import {
  checkoutLineDeleteVariables,
  checkoutLineDelete as checkoutLineDeleteData,
} from '../../../apollo/mutations/types/checkoutLineDelete';
import { getProductsByIds_products_edges_node_stockItems as StockItems } from '../../../apollo/queries/types/getProductsByIds';
import { createCheckout_checkoutCreate_quantityErrors as ServerQuantityError } from '../../../apollo/mutations/types/createCheckout';
import { useUserProvider } from '../../../context/user';

import {
  red,
  pink,
  grey,
  green,
  black,
  platinum,
  cocoBold,
  cocoRegular,
  raisinBlack,
  tablet,
  desktop,
  noTablet,
  noDesktop,
} from '../../../styles/constants';
import ErrorMessage from '../../common/Errors';
import { OrderLine } from '../../../interfaces/product';
import { ReactComponent as Close } from '../../../assets/images/icons/close_white.svg.tsx';
import { ReactComponent as DeleteIcon } from '../../../assets/images/icons/trash_icon.svg.tsx';

const quantityIconSize = 24;

interface MutationProps {
  update: MutationUpdaterFn;
  children: (
    mutateFn: MutationFunction<checkoutDeleteData, checkoutDeleteVariables>,
    result: MutationResult<checkoutDeleteData>,
  ) => JSX.Element | null;
}

interface Props {
  checkoutId?: string;
  history: any;
  location: any;
  match: match;
  product: OrderLine;
  fixed?: boolean;
  delBtn?: boolean;
  token: string | null;
  disabled: boolean;
  linesNumber: number;
  setDisabled: (flag: boolean) => void;
  quantityErrors?: (ServerQuantityError | null)[];
  setQuantityErrors?: (errors: (ServerQuantityError | null)[]) => void;
}

const DeleteCheckoutMutationWrapper = ({ update, children }: MutationProps) => {
  const DeleteCheckout = TypedMutation<
    checkoutDeleteData,
    checkoutDeleteVariables
  >(deleteCheckout, update);
  return <DeleteCheckout>{children}</DeleteCheckout>;
};

const UpdateCheckoutLineMutation = TypedMutation<
  checkoutLinesUpdateData,
  checkoutLinesUpdateVariables
>(updateCheckoutLine);

const DeleteCheckoutLineMutation = TypedMutation<
  checkoutLineDeleteData,
  checkoutLineDeleteVariables
>(deleteCheckoutLine, (cache, res) => {
  if (res?.data?.checkoutLineDelete?.checkout) {
    const { checkout } = res.data.checkoutLineDelete;
    const { token } = checkout;

    cache.writeQuery({
      query: getCheckout,
      data: { checkout },
      variables: { token },
    });
  }
});

const CartSummaryListItem = ({
  product,
  token,
  disabled,
  setDisabled,
  linesNumber,
  quantityErrors,
  setQuantityErrors,
  checkoutId,
  delBtn,
}: Props) => {
  const quantityRef = useRef<HTMLInputElement>(null);

  const [quantityError, setQuantityError] = useState<any>();
  const [networkError, setNetworkError] = useState<any>();
  const [withoutFound, setWithoutFound] = useState<any>();
  const [imageUrl, setImageUrl] = useState(product.imageGroups[0].url);

  const {
    state: { languages, currency, currentLanguage },
  } = useUserProvider();

  const { Cart } = languages[currentLanguage];
  const { cartSummaryItem } = Cart;
  const { errors: errorsProvider, total, deleteProductModal } = cartSummaryItem;
  const { deleteTitle, deleteConfirm, deleteCancel } = deleteProductModal;

  useEffect(() => {
    if (quantityErrors) {
      const error = quantityErrors.find((e: any) => {
        if (e) {
          const { size, productId } = product;

          return e.productId === productId && size === e.size;
        }

        return false;
      });

      if (error && error.message) {
        const filtered = quantityErrors.filter((e: any) => e !== error);

        setWithoutFound(filtered);

        setQuantityError(error.message);
      }
    }
  }, [quantityErrors]);

  const deleteProduct = (callback: () => void) => {
    Swal.fire({
      title: deleteTitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: deleteConfirm,
      cancelButtonText: deleteCancel,
      confirmButtonColor: red,
      cancelButtonColor: green,
    }).then((result) => {
      if (result.value) callback();
      else if (result.dismiss === Swal.DismissReason.cancel) return false;

      return true;
    });
  };

  const onQuantityChange = async (
    checkoutLinesUpdate: any,
    e: React.ChangeEvent<HTMLInputElement> | null,
    value: string,
  ) => {
    const newQuantity = e ? e.target.value : value;

    if (networkError) setNetworkError('');

    if (quantityError) {
      setQuantityError('');

      if (setQuantityErrors && withoutFound) {
        setQuantityErrors(withoutFound);
        setWithoutFound(undefined);
      }
    }

    const { productId, size, userDesignId, selectedImageGroupId } = product;

    setDisabled(true);

    try {
      const res = await checkoutLinesUpdate({
        variables: {
          checkoutId,
          currency,
          lang: currentLanguage,
          lines: [
            {
              productId,
              size,
              userDesignId,
              quantity: Number(newQuantity) || 1,
              lineId: product.cartId,
              selectedImageGroupId,
            },
          ],
          token,
        },
      });

      if (res && res.data && res.data.checkoutLinesUpdate) {
        const {
          checkout,
          errors,
          quantityErrors: qE,
        } = res.data.checkoutLinesUpdate;

        if (qE && setQuantityErrors) {
          setQuantityErrors(qE);
        } else if (!checkout || (errors && errors.length)) {
          setNetworkError(errorsProvider.sizeChangeError);
        }
      }
    } catch (error) {
      setNetworkError(errorsProvider.quantityChangeError);
    }
    setDisabled(false);
  };

  useEffect(() => {
    const { imageGroups, selectedImageGroupId, userDesignUrl } = product;

    if (userDesignUrl) {
      setImageUrl(userDesignUrl);
    } else {
      const found = imageGroups.find(
        (group) => group.id === selectedImageGroupId,
      );

      if (found) setImageUrl(found.url);
    }
  }, [product]);

  const { price, discountPrice, lineTotalPrice } = product;
  const isDiscount = discountPrice && discountPrice.localized;

  return (
    <ListItemContainer className="checkout-product">
      <ImageContainer className="checkout-product-image">
        <ProductImage alt={product.name} src={`${imageUrl}?${Date.now()}`} />
      </ImageContainer>

      <InfoWrapper className="checkout-product-info">
        <ProductTitle>{product.name}</ProductTitle>
        <Info className="checkout-product-size">
          <Span>Size</Span>
          <UpdateCheckoutLineMutation>
            {(checkoutLineUdpate) => {
              return (
                <SizeSelector
                  disabled={disabled}
                  value={product.size}
                  onChange={async (e: any) => {
                    if (networkError) setNetworkError('');

                    if (checkoutId) {
                      const {
                        productId,
                        quantity,
                        userDesignId,
                        selectedImageGroupId,
                      } = product;

                      setDisabled(true);

                      try {
                        const res = await checkoutLineUdpate({
                          variables: {
                            checkoutId,
                            token,
                            lines: [
                              {
                                size: e.target.value,
                                productId,
                                userDesignId,
                                quantity,
                                lineId: product.cartId,
                                selectedImageGroupId,
                              },
                            ],
                            currency,
                            // @ts-ignore
                            lang: currentLanguage,
                          },
                        });

                        if (res?.data?.checkoutLinesUpdate) {
                          const { checkout, errors } =
                            res.data.checkoutLinesUpdate;

                          if (!checkout || (errors && errors.length))
                            setNetworkError(errorsProvider.sizeChangeError);
                        } else {
                          setNetworkError(errorsProvider.sizeChangeError);
                        }
                      } catch (error) {
                        setNetworkError(errorsProvider.sizeChangeError);
                      } finally {
                        setDisabled(false);
                      }
                    }
                  }}
                >
                  {(product.stockItems as StockItems[]).map((size) => (
                    <option
                      key={String(size.size)}
                      value={String(size.size)}
                      disabled={!size.isInStock}
                    >
                      {size.size}
                    </option>
                  ))}
                </SizeSelector>
              );
            }}
          </UpdateCheckoutLineMutation>
        </Info>

        <Info className="checkout-product-unit-price">
          <Span>Price</Span>

          {isDiscount ? (
            <div>
              <OldPrice>{price.localized}</OldPrice>
              <NewPrice>
                {discountPrice ? discountPrice.localized : ''}
              </NewPrice>
            </div>
          ) : (
            <Span>{price.localized}</Span>
          )}
        </Info>

        <Info className="checkout-product-quantity">
          <Span>Quantity</Span>
          <UpdateCheckoutLineMutation>
            {(checkoutLinesUpdate) => {
              return (
                <Flex>
                  <MinusBtn
                    disabled={disabled}
                    onClick={() => {
                      if (quantityRef && quantityRef.current) {
                        const { value } = quantityRef.current;

                        const newValue = String(
                          Number(value) - 1 > 0 ? Number(value) - 1 : 1,
                        );

                        quantityRef.current.value = newValue;

                        onQuantityChange(checkoutLinesUpdate, null, newValue);
                      }
                    }}
                  >
                    <MinusCircle size={quantityIconSize} />
                  </MinusBtn>

                  <Quantity
                    aria-label={`Quantity: ${product.name}`}
                    type="number"
                    ref={quantityRef}
                    min={1}
                    max={100}
                    disabled={disabled}
                    value={product.quantity}
                    onChange={(e: any) => {
                      onQuantityChange(checkoutLinesUpdate, e, '1');
                    }}
                  />

                  <PlusBtn
                    disabled={disabled}
                    onClick={() => {
                      if (quantityRef && quantityRef.current) {
                        const { value } = quantityRef.current;
                        const newValue = String(
                          Number(value) + 1 < 101 ? Number(value) + 1 : 100,
                        );
                        quantityRef.current.value = newValue;
                        onQuantityChange(checkoutLinesUpdate, null, newValue);
                      }
                    }}
                  >
                    <PlusCircle size={quantityIconSize} />
                  </PlusBtn>
                </Flex>
              );
            }}
          </UpdateCheckoutLineMutation>
        </Info>

        {product.stockMessage && <StockMsg>{product.stockMessage}</StockMsg>}
      </InfoWrapper>

      <MediaQuery query={tablet}>
        <Total className="checkout-product-line-total">
          <strong>{total}</strong> {lineTotalPrice}
        </Total>
      </MediaQuery>

      {delBtn !== false && <DeleteCheckoutMutationWrapper
        update={(cache, res) => {
          if (res?.data) {
            cache.writeQuery({
              query: getCheckout,
              data: { checkout: null },
              variables: {
                token,
              },
            });
          }
        }}
      >
        {(checkoutDelete) => {
          return (
            <DeleteCheckoutLineMutation>
              {(checkoutLineDelete) => {
                return (
                  <DeleteBtn
                    role="none"
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      if (checkoutId) {
                        deleteProduct(async () => {
                          setDisabled(true);

                          if (linesNumber > 1) {
                            try {
                              const res = await checkoutLineDelete({
                                variables: {
                                  currency,
                                  lang: currentLanguage,
                                  token,
                                  checkoutId,
                                  lineId: product.cartId,
                                },
                              });

                              if (res?.data?.checkoutLineDelete) {
                                const { checkout, errors } =
                                  res.data.checkoutLineDelete;

                                if (!checkout || (errors && errors.length)) {
                                  setNetworkError(
                                    errorsProvider.removeProductError,
                                  );
                                }
                              } else {
                                setNetworkError(
                                  errorsProvider.removeProductError,
                                );
                              }
                            } catch (e) {
                              setNetworkError(
                                errorsProvider.removeProductError,
                              );
                            } finally {
                              setDisabled(false);
                            }
                          } else {
                            try {
                              const res = await checkoutDelete({
                                variables: {
                                  token,
                                  currency,
                                  checkoutId,
                                },
                              });

                              if (res?.data?.checkoutDelete) {
                                const { errors } = res.data.checkoutDelete;

                                if (errors && errors.length) {
                                  setNetworkError(
                                    errorsProvider.failedDeleteCart,
                                  );
                                }
                              } else {
                                setNetworkError(
                                  errorsProvider.failedDeleteCart,
                                );
                              }
                            } catch (error) {
                              setNetworkError(errorsProvider.failedDeleteCart);
                            }
                          }
                        });
                      }
                    }}
                  >
                    <MobileDeleteIcon />
                    <Icon />
                  </DeleteBtn>
                );
              }}
            </DeleteCheckoutLineMutation>
          );
        }}
      </DeleteCheckoutMutationWrapper>}

      <ErrorMessage>{quantityError}</ErrorMessage>

      <MediaQuery query={noTablet}>
        <MobileTotal className="checkout-product-line-total">
          <strong>{total}</strong>
          {lineTotalPrice}
        </MobileTotal>
      </MediaQuery>
    </ListItemContainer>
  );
};

interface SpanProps {
  size?: string;
  bold?: boolean;
}

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const btnResetStyles = css`
  border: none;
  background: none;
  outline: none;
  padding: 0;
  margin: 0;

  @media ${desktop} {
    display: none;
  }
`;

const PlusBtn = styled.button<{ disabled: boolean }>`
  ${btnResetStyles};
  color: ${(p) => (p.disabled ? grey : black)};
`;

const MinusBtn = styled.button<{ disabled: boolean }>`
  ${btnResetStyles};
  color: ${(p) => (p.disabled ? grey : black)};
`;

const ListItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0 40px 0;
  touch-action: manipulation;
  border: 2px solid ${platinum};
  border-radius: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  @media ${noTablet} {
    flex-direction: column;
  }

  @media ${tablet} {
    padding-bottom: 10px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
`;

const ProductImage = styled.img`
  display: block;
  width: auto;
  height: 100%;
  margin: auto;
`;

const ProductTitle = styled.h2`
  ${cocoBold};
  font-size: ${(p: SpanProps) => p.size || '16px'};
  color: ${black};
  text-transform: uppercase;
  margin-bottom: 30px;

  @media ${noDesktop} {
    margin-bottom: 10px;
    font-size: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;

  @media ${noDesktop} {
    margin-bottom: 5px;
  }
`;

const Span = styled.span`
  ${cocoRegular};
  color: ${black};
  text-transform: uppercase;
  font-size: ${(p: SpanProps) => p.size || undefined};
  font-weight: ${(p: SpanProps) => (p.bold ? 'bold' : 'regular')};
  font-size: 12px;

  @media ${desktop} {
    font-size: 16px;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 23px;
  right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  @media ${noDesktop} {
    top: 10px;
    right: 15px;
    width: 20px;
    height: 20px;
  }
`;

const iconStyles = css`
  width: 20px;
  height: auto;
`;

const MobileDeleteIcon = styled(Close)`
  ${iconStyles};
  path {
    fill: ${black};
  }
  @media ${desktop} {
    display: none;
  }
`;

const Icon = styled(DeleteIcon)`
  ${iconStyles}

  path {
    fill: ${red};
  }

  @media ${noDesktop} {
    display: none;
  }
`;

const StockMsg = styled.div`
  ${cocoRegular};
  font-size: 14px;
  color: #129c10;

  @media ${noDesktop} {
    font-size: 12px;
  }
`;

const Total = styled(Span)`
  position: absolute;
  right: 20px;
  bottom: 10px;
`;

const MobileTotal = styled.span`
  ${cocoRegular};
  color: ${black};
  text-transform: uppercase;
  font-size: 12px;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const SizeSelector = styled.select`
  width: 50px;
  height: 30px;
  border: none;
  border-bottom: 3px solid ${black};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;

  @media ${desktop} {
    font-size: 16px;
  }
`;

const Quantity = styled.input`
  ${cocoBold};
  font-size: 14px;
  height: 30px;
  border: none;
  text-align: center;
  width: 35px;

  @media ${desktop} {
    font-size: 16px;
    width: 50px;
    border-bottom: 3px solid ${black};
    text-align: right;
    -moz-appearance: textfield;
  }
`;

const OldPrice = styled(Span)`
  ${cocoRegular};
  color: ${raisinBlack};
  font-size: 12px;
  text-decoration: line-through;
  margin-right: 5px;

  @media ${desktop} {
    font-size: 16px;
  }
`;
const NewPrice = styled(Span)`
  ${cocoBold};
  color: ${pink};
  font-size: 12px;

  @media ${desktop} {
    font-size: 16px;
  }
`;

export default withRouter(CartSummaryListItem);
