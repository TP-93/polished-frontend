// @ts-nocheck
import React, { useState } from 'react';

import { TypedMutation } from '../../apollo/types';
import {
  deleteCustomizedDesign,
  bulkUpdateCustomizedDesign,
} from '../../apollo/mutations/product';
import {
  bulkUpdateCustomizedDesignVariables,
  bulkUpdateCustomizedDesign as bulkUpdateCustomizedDesignData,
} from '../../apollo/mutations/types/bulkUpdateCustomizedDesign';
import { getDesignsForProduct_product_designs as DesignInterface } from '../../apollo/queries/types/getDesignsForProduct';

import { useCustomizationStateValue } from '../../context/customize';

import { CTChildProps } from '../../interfaces/customize';
import { removeDesign } from './utils/customizationUtils';
import { GUEST_TOKEN_NAME } from '../../constants';

import {
  getNewDesignId,
  getUserDesignInput,
  createNewDesignInput,
} from './utils/createMutationsInputs';
import { CreateUserDesignMutation } from './CreateMutation';

const EditDesignsMutation = TypedMutation<
  bulkUpdateCustomizedDesignData,
  bulkUpdateCustomizedDesignVariables
>(bulkUpdateCustomizedDesign);

interface QueryProps {
  client?: any;
  loading: boolean;
}

interface Props {
  designs: (DesignInterface | null)[] | null;
  children: (arg: CTChildProps) => JSX.Element[] | JSX.Element;
  userDesignId: string;
  currentProductId: string;
  customizedDesignMapping: Record<string, string>;
}

export default ({
  designs,
  children,
  userDesignId,
  currentProductId,
  customizedDesignMapping,
}: Props) => {
  const guestToken = localStorage.getItem(GUEST_TOKEN_NAME);
  // can be set to false in .env to not spawn the server with likely invalid dev server requests
  const allowPsdServerInteractions =
    process.env.REACT_APP_ALLOW_PSD_SERVER_REQUESTS === 'true';

  const [finalizing, setFinalizing] = useState(false);

  const { state, dispatch } = useCustomizationStateValue();

  const {
    designs: customizationContextDesigns,
    currentDesign,
    selectedDesignId,
    editingInitState,
    newTextEditingSession: { loadedDesigns },
  } = state;

  return (
    <CreateUserDesignMutation>
      {(createUserDesignMutation, { loading: loadingNew }) => (
        <EditDesignsMutation>
          {(editUserDesignMutation, { loading, client }: QueryProps): any => {
            let newUserDesignId: string | null = null;

            const removeDesignHandler = async () => {
              await removeDesign(
                loadedDesigns,
                dispatch,
                allowPsdServerInteractions,
                client,
              );
            };

            const processDesign = async () => {
              try {
                setFinalizing(true);

                const userInput = getUserDesignInput({
                  designs,
                  guestToken,
                  currentDesign,
                  editingInitState,
                  selectedDesignId,
                  customizedDesignMapping,
                  customizationContextDesigns,
                });

                if (!userInput.input.length) return null;

                const isInputValid = userInput.input.every(({ id }) => !!id);

                if (isInputValid) {
                  const variables = {
                    input: userInput.input,
                    token: userInput.token,
                  };

                  const res = await editUserDesignMutation({ variables });

                  if (res?.data?.customizedDesignBulkUpdate) {
                    const { errorList } = res.data.customizedDesignBulkUpdate;

                    if (errorList?.length) console.error(errorList);
                  }
                } else {
                  const userDesignInput = createNewDesignInput({
                    designs,
                    guestToken,
                    currentDesign,
                    editingInitState,
                    selectedDesignId,
                    currentProductId,
                    includeInitState: true,
                    customizationContextDesigns,
                  });

                  newUserDesignId = await getNewDesignId({
                    client,
                    guestToken,
                    userDesignInput,
                    createUserDesignMutation,
                  });
                }

                // await removeDesignHandler();
              } finally {
                setFinalizing(false);

                if (newUserDesignId) {
                  client.mutate({
                    mutation: deleteCustomizedDesign,
                    variables: {
                      token: guestToken,
                      ids: [userDesignId],
                    },
                  });
                }

                // transitionToDesignPage();
              }

              // eslint-disable-next-line consistent-return
              return newUserDesignId;
            };

            return children({
              client,
              finalizing,
              processDesign,
              removeDesignHandler,
              loading: loading || loadingNew,
            });
          }}
        </EditDesignsMutation>
      )}
    </CreateUserDesignMutation>
  );
};
