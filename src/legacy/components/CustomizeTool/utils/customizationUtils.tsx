// @ts-nocheck
import { ReactNode } from 'react';
import ApolloClient from 'apollo-boost';
import { find, flatten, cloneDeep } from 'lodash';

import {
  getDesignsForProduct_product_designs as DesignInterface,
  getDesignsForProduct_product_designs_layers as LayerInterface,
} from '../../../apollo/queries/types/getDesignsForProduct';
import { finalizeEditingSession } from '../../../apollo/mutations/psdServer';
import { changedTextLayersFragment } from '../../../apollo/fragments/types/changedTextLayersFragment';
import { getUserDesign_userDesign_customizedDesigns as CustDesignInterface } from '../../../apollo/queries/types/getUserDesign';
import {
  isDesignSame,
  isDesignEmpty,
  IndividualDesign,
  EditingInitState,
  RawIndividualDesign,
} from '../../../context/customize';

import { Layer } from '../../../../types/globalTypes';
import { GUEST_TOKEN_NAME } from '../../../constants';
import { Layer as DesignLayer } from '../../../interfaces/product';

interface LayersProps {
  layer: LayerInterface;
  staticLayers: (LayerInterface | null)[];
  toggledLayers: number[];
}

export const getStaticLayers = (designs: any, selectedDesignId: any) => {
  const filteredDesigns = designs
    ? designs.filter((d: any) => d && d.id === selectedDesignId)
    : [];
  const selectedDesign = filteredDesigns.length > 0 ? filteredDesigns[0] : null;
  const layers = selectedDesign ? selectedDesign.layers : [];

  let staticLayers: any = [];

  if (layers) {
    staticLayers = layers.filter((layer: any) => {
      if (layer) {
        const { layerType, options } = layer;

        const firstOption = options && options[0];

        if (options && firstOption && firstOption.editable)
          return layerType !== 'toggle' && !firstOption.editable.length;
      }

      return false;
    });
  }

  return staticLayers;
};

export const getSortedLayers = ({
  layer,
  staticLayers,
  toggledLayers,
}: LayersProps) => {
  const { options } = layer;

  const firstOption = options && options[0];

  if (options && firstOption) {
    const { id } = firstOption;

    const currentOption: any = toggledLayers[id || NaN]
      ? options.find((option) =>
          Boolean(option && option.id === toggledLayers[id || NaN]),
        )
      : options[0];

    const sortedLayers = staticLayers
      .concat({ ...layer, options: currentOption ? [currentOption] : [] })
      .sort((a, b) => {
        if (a && b) return a.position - b.position;
        return 0;
      });

    const notNullLayers: LayerInterface[] = [];

    sortedLayers.forEach((l) => {
      if (l) notNullLayers.push(l);
    });

    return { currentOption, sortedLayers: notNullLayers };
  }

  return {
    currentOption: null,
    sortedLayers: [],
  };
};

interface Props {
  changedLayersWithColor: { [key: string]: string };
  changedLayersWithText: { [key: string]: string };
  toggledLayers: { [key: number]: number };
  onlyToggleLayers: DesignLayer[];
  layerIds: number[];
}

export const makeCustomizationJSON: (args: any) => Layer[] = ({
  changedLayersWithColor,
  changedLayersWithText,
  toggledLayers,
  onlyToggleLayers,
  layerIds,
}: Props) => {
  const layers: { [key: string]: Layer } = {};
  const colorChangedLayersKeys = Object.keys(changedLayersWithColor);
  const textChangedLayersKeys = Object.keys(changedLayersWithText);
  const toggledLayersValues = Object.values(toggledLayers);

  colorChangedLayersKeys.forEach((key) => {
    if (!layers[key]) layers[key] = { id: -1, position: -1, changes: {} };
    layers[key].id = Number(key);
    layers[key].changes.selectedColor = changedLayersWithColor[key];
  });

  textChangedLayersKeys.forEach((key) => {
    if (!layers[key]) layers[key] = { id: -1, position: -1, changes: {} };
    layers[key].id = Number(key);
    layers[key].changes.text = changedLayersWithText[key];
  });

  toggledLayersValues.forEach((val) => {
    if (!layers[val]) layers[val] = { id: -1, position: -1, changes: {} };
    layers[val].id = Number(val);
    layers[val].changes.selectedToggle = true;
  });

  if (
    colorChangedLayersKeys.length ||
    textChangedLayersKeys.length ||
    toggledLayersValues.length
  ) {
    onlyToggleLayers.forEach((layer: DesignLayer) => {
      const onlyToggleLayerIds = layer.options.map((o) => o.id);
      const validToggleIds = onlyToggleLayerIds.filter((id) =>
        layerIds.includes(id),
      );

      const isEdited = toggledLayersValues.some((id) => {
        return validToggleIds.some((validId) => validId === id);
      });

      if (validToggleIds.length && (!toggledLayers || !isEdited)) {
        layers[validToggleIds[0]] = {
          id: validToggleIds[0],
          position: layer.position,
          changes: { selectedToggle: true },
        };
      }
    });
  }

  return Object.values(layers);
};

export const convertCustomizations = (
  customizations: string,
  design: DesignInterface,
) => {
  const data = JSON.parse(customizations);

  const { layers }: { layers: Layer[] } = data;

  const result: RawIndividualDesign = {
    toggledLayers: {},
    changedLayersWithText: {},
    changedLayersWithColor: {},
  };

  layers.forEach((layer: Layer) => {
    const { changes } = layer;

    if (changes) {
      if (changes?.selectedToggle && design?.layers) {
        const originalLayer = design.layers.find((l) => {
          if (l?.options && l?.layerType === 'toggle') {
            return l.options.some((option) => {
              if (option) return option.id === layer.id;

              return false;
            });
          }

          return false;
        });

        const firstOption = originalLayer?.options && originalLayer.options[0];
        // ID of first option is used as id of toggle-groups in Preview component
        const key = firstOption?.id ? firstOption.id : layer.id;

        result.toggledLayers[key] = layer.id;
      }

      if (changes.text) result.changedLayersWithText[layer.id] = changes.text;

      if (changes.selectedColor)
        result.changedLayersWithColor[layer.id] = changes.selectedColor;
    }
  });

  return result;
};

export const customizationsToRaw = (
  cDesigns: CustDesignInterface[],
  originalDesigns: DesignInterface[],
) => {
  const editingInitState: EditingInitState = {};

  cDesigns.forEach((d: CustDesignInterface) => {
    if (d?.printDesign?.id) {
      const { id } = d.printDesign;

      const originalDesign = originalDesigns.find(
        (originalD) => originalD.id === id,
      );

      // OR check is added to avoid TS error

      editingInitState[id] = convertCustomizations(
        d.customizations,
        originalDesign || originalDesigns[0],
      );
    }
  });

  return editingInitState;
};

export const makeCustomizedDesignMapping = (
  cDesigns: CustDesignInterface[],
) => {
  const mapping: Record<string, string> = {};

  cDesigns.forEach((d: CustDesignInterface) => {
    if (d.printDesign) {
      mapping[d.printDesign.id] = d.id;
    }
  });

  return mapping;
};

export const getCurrentDesignforMutation = (
  currentDesign: IndividualDesign,
  editingInitState: EditingInitState,
  selectedDesignId: string,
) => {
  const empty = isDesignEmpty(currentDesign);

  if (!empty) {
    const design = { [selectedDesignId]: cloneDeep(currentDesign) };

    const same = isDesignSame(
      currentDesign,
      editingInitState,
      selectedDesignId,
    );

    if (!same) return design;
  }

  return {};
};

export const getOnlyToggleLayers = (
  designs: (DesignInterface | null)[] | null,
  designsToEvaluate: Record<string, IndividualDesign>,
) =>
  designs
    ? designs
        .reduce((current: LayerInterface[], next) => {
          if (next && designsToEvaluate[next.id] && next.layers) {
            const notNullLayers: LayerInterface[] = [];
            next.layers.forEach((layer) => {
              if (layer) notNullLayers.push(layer);
            });

            return current.concat(notNullLayers);
          }
          return current;
        }, [])
        .filter((layer) => layer.layerType === 'toggle')
    : [];

export const getEmptyCreateInput = (id: string) => ({
  printDesign: id,
  customizations: {
    layers: [],
  },
});

export const getEmptyUpdateInput = (id: string) => ({
  id,
  customizations: {
    layers: [],
  },
});

// shared mutation logic
const finalizeSession = async (
  client: ApolloClient<ReactNode>,
  loadedDesigns: string[],
) => {
  if (!loadedDesigns.length) return;

  await client.mutate({
    mutation: finalizeEditingSession,
    variables: {
      psdNames: loadedDesigns,
      token: localStorage.getItem(GUEST_TOKEN_NAME),
    },
  });
};

export const removeDesign = async (
  loadedDesigns: string[],
  dispatch: (arg: Record<string, string>) => void,
  allowPsdServerInteractions: boolean,
  client: ApolloClient<ReactNode>,
) => {
  if (allowPsdServerInteractions) await finalizeSession(client, loadedDesigns);

  dispatch({
    type: 'RESET_CUSTOMIZATION',
  });
};

export const injectTextChanges = (
  designs: (DesignInterface | null)[] | null,
  changedTextLayers: changedTextLayersFragment[],
) => {
  changedTextLayers.forEach((changedLayer: changedTextLayersFragment) => {
    const { printDesignId } = changedLayer;

    if (printDesignId && designs && designs.length) {
      const design: DesignInterface = find(designs, ['id', printDesignId]);

      if (design) {
        const { layers } = design;

        if (layers && layers.length) {
          // @ts-ignore
          const options = flatten(layers.map((l) => l.options));

          if (options.length) {
            const option = options.filter(
              (o: any) => o.id === changedLayer.layerId,
            )[0];

            if (option) {
              option.src = changedLayer.src;
              option.rectangle = JSON.parse(changedLayer.rectangle);
            }
          }
        }
      }
    }
  });
};
