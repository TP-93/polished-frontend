// @ts-nocheck
import { useState } from 'react';

import { TypedMutation } from '../../apollo/types';
import { createUserDesign } from '../../apollo/mutations/product';
import { getDesignsForProduct_product_designs as DesignInterface } from '../../apollo/queries/types/getDesignsForProduct';

import {
  createUserDesignVariables,
  createUserDesign as createUserDesignData,
} from '../../apollo/mutations/types/createUserDesign';

import { useCustomizationStateValue } from '../../context/customize';

import { removeDesign } from './utils/customizationUtils';
import { CTChildProps } from '../../interfaces/customize';
import { GUEST_TOKEN_NAME } from '../../constants';
import {
  getNewDesignId,
  createNewDesignInput,
} from './utils/createMutationsInputs';

export const CreateUserDesignMutation = TypedMutation<
  createUserDesignData,
  createUserDesignVariables
>(createUserDesign);

interface QueryProps {
  loading: boolean;
  client?: any;
}

interface Props {
  designs: (DesignInterface | null)[] | null;
  currentProductId: string;
  children: (arg: CTChildProps) => JSX.Element[] | JSX.Element;
}

export default ({ children, designs, currentProductId }: Props) => {
  const guestToken = localStorage.getItem(GUEST_TOKEN_NAME);
  // can be set to false in .env to not spawn the server with likely invalid dev server requests
  const allowPsdServerInteractions =
    process.env.REACT_APP_ALLOW_PSD_SERVER_REQUESTS === 'true';

  const [finalizing, setFinalizing] = useState(false);

  const {
    state: {
      designs: customizationContextDesigns,
      currentDesign,
      selectedDesignId,
      editingInitState,
      newTextEditingSession,
    },
    dispatch,
  } = useCustomizationStateValue();

  const { loadedDesigns } = newTextEditingSession || {};

  return (
    <CreateUserDesignMutation>
      {(createUserDesignMutation, { loading, client }: QueryProps): any => {
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

            const userDesignInput = createNewDesignInput({
              designs,
              guestToken,
              currentDesign,
              currentProductId,
              editingInitState,
              selectedDesignId,
              customizationContextDesigns,
            });

            newUserDesignId = await getNewDesignId({
              client,
              guestToken,
              userDesignInput,
              createUserDesignMutation,
            });

            // await removeDesignHandler();
          } catch (error) {
            console.log('error from create mutation');
          } finally {
            // if (newUserDesignId) setFinalizing(false);
            setFinalizing(false);
          }

          return newUserDesignId;
        };

        return children({
          client,
          loading,
          finalizing,
          processDesign,
          removeDesignHandler,
        });
      }}
    </CreateUserDesignMutation>
  );
};
