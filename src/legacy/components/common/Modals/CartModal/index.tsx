// @ts-nocheck
import React from 'react';
import { Query } from 'react-apollo';

import {
  createCheckout,
  addCheckoutLine,
} from '../../../../apollo/mutations/checkout';
import { getCheckout } from '../../../../apollo/queries/checkout';
import { TypedMutation } from '../../../../apollo/types';
import { Checkout as CheckoutData } from '../../../../apollo/queries/types/Checkout';
import {
  createCheckoutVariables,
  createCheckout as createCheckoutData,
} from '../../../../apollo/mutations/types/createCheckout';
import {
  checkoutLinesAddVariables,
  checkoutLinesAdd as MutationCheckoutData,
} from '../../../../apollo/mutations/types/checkoutLinesAdd';
import { useUserProvider } from '../../../../context/user';

import CartModal from './Container';
import { GUEST_TOKEN_NAME } from '../../../../constants';

const AddLineMutation = TypedMutation<
  MutationCheckoutData,
  checkoutLinesAddVariables
>(addCheckoutLine);

const CreateCheckoutMutation = TypedMutation<
  createCheckoutData,
  createCheckoutVariables
>(createCheckout, (cache, res) => {
  if (res?.data?.checkoutCreate?.checkout) {
    const { checkout } = res.data.checkoutCreate;

    cache.writeQuery({
      query: getCheckout,
      data: { checkout },
      variables: { token: checkout.token },
    });
  }
});

interface GetCheckoutProps {
  data: CheckoutData;
}

interface Props {
  product: any;
  designId: any;
  selectedSize: string;
  userDesignName: null | string;
  checkoutImages: any;
  close: () => void;
  networkErrorHandler: () => void;
  removeDesignHandler?: () => void;
}

const CartModalWrapper = ({
  product,
  designId,
  selectedSize,
  userDesignName,
  checkoutImages,
  close,
  networkErrorHandler,
  removeDesignHandler,
}: Props) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency, currentLanguage },
  } = useUserProvider();

  const vars = { token, currency, lang: currentLanguage };

  return (
    <Query query={getCheckout} variables={vars}>
      {({ data: checkoutData }: GetCheckoutProps) => {
        const checkoutId = checkoutData?.checkout?.id;

        return (
          <CreateCheckoutMutation>
            {(checkoutCreate, { client }) => (
              <AddLineMutation>
                {(checkoutLinesAdd) => {
                  const addToCartHandler = async () => {
                    if (product) {
                      // name
                      const { id, imageGroups } = product;

                      const selectedImageGroupId = designId
                        ? null
                        : imageGroups && imageGroups[0]?.id;

                      if (checkoutId) {
                        try {
                          const res = await checkoutLinesAdd({
                            variables: {
                              checkoutId,
                              token,
                              lines: [
                                {
                                  size: selectedSize,
                                  quantity: 1,
                                  productId: id,
                                  userDesignId: designId || undefined,
                                  selectedImageGroupId,
                                },
                              ],
                              currency,
                              lang: currentLanguage,
                            },
                          });

                          if (res?.data?.checkoutLinesAdd) {
                            const { errors } = res.data.checkoutLinesAdd;

                            if (errors?.length) {
                              networkErrorHandler();
                            }
                          }
                        } catch (_) {
                          networkErrorHandler();
                        }
                      }

                      if (!checkoutId) {
                        try {
                          const res = await checkoutCreate({
                            variables: {
                              currency,
                              lang: currentLanguage,
                              input: {
                                token,
                                lines: [
                                  {
                                    size: selectedSize,
                                    quantity: 1,
                                    productId: id,
                                    userDesignId: designId || undefined,
                                    selectedImageGroupId,
                                  },
                                ],
                              },
                            },
                          });

                          if (res?.data?.checkoutCreate) {
                            const { checkout, errors } =
                              res.data.checkoutCreate;

                            if (errors?.length) {
                              networkErrorHandler();
                            } else if (checkout) {
                              // force cache update for logged-in user
                              if (!token && client) {
                                client.writeQuery({
                                  query: getCheckout,
                                  variables: {
                                    token: null,
                                  },
                                  data: { checkout },
                                });
                              }
                            } else {
                              networkErrorHandler();
                            }
                          } else {
                            networkErrorHandler();
                          }
                        } catch (_) {
                          networkErrorHandler();
                        }
                      }
                    }
                  };

                  return (
                    <CartModal
                      product={product}
                      selectedSize={selectedSize}
                      userDesignName={userDesignName || null}
                      checkoutImages={checkoutImages}
                      close={close}
                      addToCartHandler={addToCartHandler}
                      removeDesignHandler={removeDesignHandler}
                    />
                  );
                }}
              </AddLineMutation>
            )}
          </CreateCheckoutMutation>
        );
      }}
    </Query>
  );
};

export default CartModalWrapper;
