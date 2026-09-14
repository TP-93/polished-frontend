// @ts-nocheck
import { find, cloneDeep } from 'lodash';

import { isAuthenticated } from '../../../apollo/queries/auth';
import { getDesignsForProduct_product_designs as DesignInterface } from '../../../apollo/queries/types/getDesignsForProduct';

import { IndividualDesign, EditingInitState } from '../../../context/customize';

import {
  Layer,
  UserDesignInput,
  SingleCustomizedPrintDesign,
  UpdateCustomizedPrintDesignInput,
} from '../../../../types/globalTypes';

import { makeId } from '../../../utils/idUtils';
import {
  getOnlyToggleLayers,
  getEmptyCreateInput,
  getEmptyUpdateInput,
  makeCustomizationJSON,
  getCurrentDesignforMutation,
} from './customizationUtils';
import { GUEST_TOKEN_NAME } from '../../../constants';
import { Layer as DesignLayer } from '../../../interfaces/product';

export interface BulkEditInput {
  token: string | null;
  input: UpdateCustomizedPrintDesignInput[];
}

export interface CreateNewDesignInput {
  designs: (DesignInterface | null)[] | null;
  guestToken: string | null;
  currentDesign: IndividualDesign;
  currentProductId: string;
  editingInitState: EditingInitState;
  selectedDesignId: string;
  includeInitState?: boolean;
  customizationContextDesigns: any;
}

export interface GetDesignsToEvaluate {
  currentDesign: IndividualDesign;
  editingInitState: EditingInitState;
  selectedDesignId: string;
  includeInitState?: boolean;
  customizationContextDesigns: any;
}

const getDesignsToEvaluate = ({
  currentDesign,
  editingInitState,
  selectedDesignId,
  includeInitState,
  customizationContextDesigns,
}: GetDesignsToEvaluate) => {
  const currentDesignToCopy = getCurrentDesignforMutation(
    currentDesign,
    editingInitState,
    selectedDesignId,
  );

  const designsToEvaluate: {
    [key: string]: IndividualDesign;
  } = includeInitState
    ? {
        ...cloneDeep(editingInitState),
        ...cloneDeep(customizationContextDesigns),
        ...currentDesignToCopy,
      }
    : {
        ...cloneDeep(customizationContextDesigns),
        ...currentDesignToCopy,
      };

  return designsToEvaluate;
};

export const createNewDesignInput = ({
  designs,
  guestToken,
  currentDesign,
  editingInitState,
  selectedDesignId,
  includeInitState,
  currentProductId,
  customizationContextDesigns,
}: CreateNewDesignInput) => {
  const userDesignInput: UserDesignInput = {
    name: null,
    token: guestToken,
    // product: currentProductId,
    product: makeId('Product', currentProductId),
    designs: [],
  };

  const designsToEvaluate = getDesignsToEvaluate({
    currentDesign,
    editingInitState,
    selectedDesignId,
    includeInitState,
    customizationContextDesigns,
  });

  const onlyToggleLayers = getOnlyToggleLayers(designs, designsToEvaluate);

  Object.entries(designsToEvaluate).forEach((designObj) => {
    const currentDesignObj = designObj[1];

    const { changedLayersWithColor, changedLayersWithText, toggledLayers } =
      currentDesignObj;

    const layerIds: number[] = [];

    find(designs, ['id', designObj[0]]).layers.forEach((l: DesignLayer) => {
      const ids = l.options.map((o) => o.id);

      layerIds.push(...ids);
    });

    const layers = makeCustomizationJSON({
      layerIds,
      toggledLayers,
      onlyToggleLayers,
      changedLayersWithText,
      changedLayersWithColor,
    });

    const input: SingleCustomizedPrintDesign = getEmptyCreateInput(
      designObj[0],
    );

    if (layers.length) {
      layers.forEach((l: Layer) => {
        const foundDesign = find(designs, ['id', designObj[0]]);

        const obj = find(foundDesign.layers, (o: DesignLayer) => {
          const ids = o.options.map((option) => option.id);
          return ids.includes(l.id);
        });
        // eslint-disable-next-line no-param-reassign
        l.position = obj.position;
      });

      input.customizations = { layers };

      userDesignInput.designs.push(input);
    }
  });

  return userDesignInput;
};

export interface GetNewDesignId {
  client: any;
  guestToken: string | null;
  userDesignInput: UserDesignInput;
  createUserDesignMutation: any;
}

export const getNewDesignId = async ({
  client,
  guestToken,
  userDesignInput,
  createUserDesignMutation,
}: GetNewDesignId) => {
  let newUserDesignId: string | null = null;

  if (userDesignInput.designs.length) {
    const variables = { input: userDesignInput };

    const res = await createUserDesignMutation({ variables });

    if (res?.data?.userDesignCreate) {
      const { errorList, userDesign } = res.data.userDesignCreate;

      if (errorList?.length) {
        console.error(errorList);
      } else if (userDesign) {
        newUserDesignId = userDesign.id;

        if (userDesign.token) {
          const {
            data: { isLoggedIn },
          } = await client.query({
            query: isAuthenticated,
          });

          if (!isLoggedIn && !guestToken) {
            localStorage.setItem(GUEST_TOKEN_NAME, userDesign.token);
          }
        }
      }
    }
  }

  return newUserDesignId;
};

export interface GetUserDesignInput {
  designs: (DesignInterface | null)[] | null;
  guestToken: string | null;
  currentDesign: IndividualDesign;
  editingInitState: EditingInitState;
  selectedDesignId: string;
  customizedDesignMapping: Record<string, string>;
  customizationContextDesigns: any;
}

export const getUserDesignInput = ({
  designs,
  guestToken,
  currentDesign,
  editingInitState,
  selectedDesignId,
  customizedDesignMapping,
  customizationContextDesigns,
}: GetUserDesignInput): BulkEditInput => {
  const userDesignInput: BulkEditInput = {
    token: guestToken,
    input: [],
  };

  const designsToEvaluate = getDesignsToEvaluate({
    currentDesign,
    editingInitState,
    selectedDesignId,
    customizationContextDesigns,
  });

  const onlyToggleLayers = getOnlyToggleLayers(designs, designsToEvaluate);

  Object.entries(designsToEvaluate).forEach((designArr) => {
    const currentDesignArr = designArr[1];
    const { changedLayersWithColor, changedLayersWithText, toggledLayers } =
      currentDesignArr;

    const layerIds: number[] = [];

    find(designs, ['id', designArr[0]]).layers.forEach((l: DesignLayer) => {
      const ids = l.options.map((o) => o.id);
      layerIds.push(...ids);
    });

    const layers = makeCustomizationJSON({
      layerIds,
      toggledLayers,
      onlyToggleLayers,
      changedLayersWithText,
      changedLayersWithColor,
    });

    const input: UpdateCustomizedPrintDesignInput = getEmptyUpdateInput(
      customizedDesignMapping[designArr[0]],
    );

    if (layers.length) {
      layers.forEach((l: Layer) => {
        const foundDesign = find(designs, ['id', designArr[0]]);

        const obj = find(foundDesign.layers, (o: DesignLayer) => {
          const ids = o.options.map((option) => option.id);
          return ids.includes(l.id);
        });

        // eslint-disable-next-line no-param-reassign
        if (obj) l.position = obj.position;
      });

      input.customizations = { layers };

      userDesignInput.input.push(input);
    }
  });

  return userDesignInput;
};
