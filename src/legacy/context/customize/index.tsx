// @ts-nocheck
/* eslint-disable no-param-reassign */

// TODO: do not allow  textEditingSession manipulations if active is false

import React, { useContext } from 'react';
import produce from 'immer';
import { isEmpty, isEqual } from 'lodash';

import { Rectangle } from '../../interfaces/product';
import contextProviderFactory from '../contextCreator';

// used to check if currentDesign contains any moodifications whatsoever
export const isDesignEmpty = (currentDesign: IndividualDesign) => {
  return (
    isEmpty(currentDesign.changedLayersWithColor) &&
    isEmpty(currentDesign.changedLayersWithText) &&
    isEmpty(currentDesign.toggledLayers)
  );
};

export const isDesignSame = (
  currentDesign: IndividualDesign,
  editingInitState: EditingInitState,
  selectedDesignId: string,
) => {
  return isEqual(editingInitState[selectedDesignId] || {}, {
    toggledLayers: currentDesign.toggledLayers,
    changedLayersWithText: currentDesign.changedLayersWithText,
    changedLayersWithColor: currentDesign.changedLayersWithColor,
  });
};

// used when editingExisting is true
export const isDesignEmptyOrSame = (
  currentDesign: IndividualDesign,
  editingInitState: EditingInitState,
  selectedDesignId: string,
) =>
  isDesignEmpty(currentDesign) ||
  isDesignSame(currentDesign, editingInitState, selectedDesignId);

export interface TextEditingSession {
  img: HTMLImageElement | null;
  rect: Rectangle | null;
  value?: string;
  status: string;
  layerId: number | null;
  // show whether the connection to the Windows server is active
  active?: boolean;
  // graphQL ids of designs already opened in WS
  loadedDesigns: string[];
}

export interface RawIndividualDesign {
  toggledLayers: { [key: number]: number };
  changedLayersWithText: { [key: string]: string };
  changedLayersWithColor: { [key: string]: string };
}

export interface IndividualDesign extends RawIndividualDesign {
  hover: any;
  selectedLayerId: number;
}

export type EditingInitState = Record<string, RawIndividualDesign>;

interface CustomizationContextInterface {
  designs?: { [key: string]: IndividualDesign };
  currentDesign: IndividualDesign;
  editingExisting: boolean;
  // GraphQL id
  selectedDesignId: string;
  // key is GraphQl id of corresponding print design
  editingInitState?: EditingInitState;
  oldTextEditingSession: {
    id: any;
    img: any;
    rect: any;
  };
  newTextEditingSession: TextEditingSession;
  isChangesResetApplied: boolean;
}

interface ToolProviderProps {
  children: JSX.Element[] | JSX.Element;
  editingExisting?: boolean;
  editingInitState?: EditingInitState;
}

interface ActionProps {
  type: string;
  payload?: any;
}

const designInitialState = {
  toggledLayers: {},
  selectedLayerId: -1,

  schemes: [],
  schemeId: -1,

  hover: {},
  hoverSchemes: [],
  hoverLayersWithText: {},

  changedLayersWithText: {},
  changedLayersWithColor: {},
};

const textEditingSessionInitial = {
  img: null,
  rect: null,
  value: undefined,
  active: undefined,
  status: 'closed',
  layerId: null,
  loadedDesigns: [],
};

const customizationInitialState = {
  designs: {},
  currentDesign: { ...designInitialState },
  editingExisting: false,
  selectedDesignId: '',
  editingInitState: {},
  oldTextEditingSession: {
    id: null,
    img: null,
    rect: null,
  },
  newTextEditingSession: { ...textEditingSessionInitial },
  isChangesResetApplied: false,
};

export const CustomizationContext =
  React.createContext<CustomizationContextInterface>(customizationInitialState);

export const customizationToolReducer = (state: any, action: ActionProps) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft: any) => {
    switch (action.type) {
      case 'ADD_SELECTED_LAYER_ID':
        draft.currentDesign.selectedLayerId = action.payload;
        break;

      case 'REMOVE_SELECTED_LAYER_ID':
        draft.currentDesign.selectedLayerId = '';
        break;

      case 'TOGGLE_LAYER':
        draft.currentDesign.toggledLayers[draft.currentDesign.selectedLayerId] =
          action.payload;
        break;

      case 'REMOVE_TOGGLE_LAYER':
        delete draft.currentDesign.toggledLayers[
          draft.currentDesign.selectedLayerId
        ];
        break;

      case 'CHANGE_LAYER_COLOR':
        draft.currentDesign.changedLayersWithColor[
          draft.currentDesign.selectedLayerId
        ] = action.payload;
        break;

      case 'ADD_HOVER_COLOR':
        draft.currentDesign.hover[action.payload.id] = action.payload.color;
        break;

      case 'REMOVE_HOVER_COLOR':
        draft.currentDesign.hover = {};
        break;

      case 'CHANGE_ACTIVE_DESIGN':
        if (draft.selectedDesignId) {
          if (
            (!draft.editingExisting && !isDesignEmpty(draft.currentDesign)) ||
            (draft.editingExisting &&
              !isDesignEmptyOrSame(
                draft.currentDesign,
                draft.editingInitState,
                draft.selectedDesignId,
              ))
          ) {
            draft.designs[draft.selectedDesignId] = draft.currentDesign;
          }
        }

        if (
          draft.designs[action.payload] !== undefined &&
          action.payload !== state.selectedDesignId
        ) {
          draft.currentDesign = draft.designs[action.payload];
        } else if (draft.designs[action.payload] === undefined) {
          if (
            draft.editingExisting &&
            draft.editingInitState[action.payload] !== undefined
          ) {
            draft.currentDesign = {
              ...draft.editingInitState[action.payload],
              selectedLayerId: -1,
              hover: {},

              schemes: [],
              schemeId: -1,
              hoverSchemes: [],
              hoverLayersWithText: {},
            };
          } else {
            draft.currentDesign = { ...designInitialState };
          }
        }

        draft.selectedDesignId = action.payload;
        break;

      // new
      case 'UPDATE_CHANGED_COLORS':
        action.payload.forEach((item: any) => {
          const { id, color } = item;
          draft.currentDesign.changedLayersWithColor[id] = color;
        });
        break;

      case 'RESET_DESIGN':
        draft.currentDesign = { ...designInitialState };
        draft.newTextEditingSession = {
          ...textEditingSessionInitial,
          status: 'closed',
        };
        draft.designs = {};
        draft.isChangesResetApplied = true;
        break;

      case 'RESET_CHANGES':
        draft.isChangesResetApplied = action.payload;
        break;

      case 'ADD_HOVER_COLORS_SCHEME':
        action.payload.forEach((values: any) => {
          const { id, color } = values;
          draft.currentDesign.hover[id] = color;
        });

        draft.currentDesign.hoverSchemes =
          draft.currentDesign.hoverSchemes.length > 0
            ? [...draft.currentDesign.hoverSchemes, action.payload]
            : [action.payload];

        draft.currentDesign.schemeId += 1;
        break;

      case 'SELECT_PREVIOUS_HOVER_COLORS_SCHEME':
        if (draft.currentDesign.schemeId - 1 === -1) {
          draft.currentDesign.hover = {};
          draft.currentDesign.hoverSchemes = [];
        }

        if (draft.currentDesign.schemeId - 1 >= 0) {
          draft.currentDesign.hoverSchemes[
            draft.currentDesign.schemeId - 1
          ].forEach((values: any) => {
            const { id, color } = values;
            draft.currentDesign.hover[id] = color;
          });
        }

        draft.currentDesign.schemeId -= 1;

        draft.currentDesign.hoverSchemes =
          draft.currentDesign.hoverSchemes.slice(0, -1);
        break;

      case 'APPLY_HOVER_SCHEME':
        draft.currentDesign.changedLayersWithColor = {
          ...draft.currentDesign.changedLayersWithColor,
          ...draft.currentDesign.hover,
        };
        draft.currentDesign.hover = {};
        draft.currentDesign.hoverSchemes = [];
        draft.currentDesign.schemeId = -1;
        break;

      case 'CANCEL_HOVER_CHANGES':
        draft.currentDesign.hover = {};
        draft.currentDesign.schemeId = -1;
        draft.currentDesign.hoverSchemes = [];
        break;

      case 'APPLY_GENERATED_COLORS':
        action.payload.forEach((values: any) => {
          const { id, color } = values;
          draft.currentDesign.changedLayersWithColor[id] = color;
        });

        draft.currentDesign.schemes =
          draft.currentDesign.schemes.length > 0
            ? [...draft.currentDesign.schemes, action.payload]
            : [action.payload];

        draft.currentDesign.schemeId += 1;
        break;

      case 'SELECT_PREVIOUS_GENERATED_COLORS_SCHEME':
        if (draft.currentDesign.schemeId - 1 === -1) {
          draft.currentDesign.schemes = [];
          draft.currentDesign.changedLayersWithColor = {};
        }

        if (draft.currentDesign.schemeId - 1 >= 0) {
          draft.currentDesign.schemes[draft.currentDesign.schemeId - 1].forEach(
            (values: any) => {
              const { id, color } = values;
              draft.currentDesign.changedLayersWithColor[id] = color;
            },
          );
        }

        draft.currentDesign.schemeId -= 1;
        draft.currentDesign.schemes = draft.currentDesign.schemes.slice(0, -1);
        break;
      //

      case 'RESET_CUSTOMIZATION':
        return { ...customizationInitialState };

      case 'OPEN_TEXT_EDITING_SESSION':
        draft.newTextEditingSession = {
          status: 'open',
          img: action.payload.img,
          rect: action.payload.rect,
          value: action.payload.value,
          active: draft.newTextEditingSession.active,
          layerId: draft.currentDesign.selectedLayerId,
          loadedDesigns: draft.newTextEditingSession.loadedDesigns,
        };
        break;

      case 'INIT_SAVING_TEXT_LAYER':
        draft.newTextEditingSession.status = 'saving';
        break;

      case 'SAVE_OLD_TEXT_LAYER_IMAGE':
        draft.oldTextEditingSession = {
          id: action.payload.id,
          img: action.payload.img,
          rect: action.payload.rect,
        };
        break;

      case 'APPLY_NEW_LAYER_TEXT':
        draft.currentDesign.changedLayersWithText[
          draft.currentDesign.selectedLayerId
        ] = draft.newTextEditingSession.value;
        break;

      case 'CLOSE_TEXT_EDITING_SESSION':
        draft.newTextEditingSession = {
          ...draft.newTextEditingSession,
          status: 'closed',
          img: null,
          rect: null,
          layerId: null,
        };
        break;

      case 'TOGGLE_TEXT_EDITING_SESSION_SERVER_CONNECTION_STATUS':
        draft.newTextEditingSession.active = action.payload;
        break;

      case 'ADD_LOADED_DESIGNS_TO_EDITING_SESSION':
        draft.newTextEditingSession.loadedDesigns.push(action.payload);
        break;

      default:
        return state;
    }
  });

const RawCustomizationToolProvider =
  contextProviderFactory(CustomizationContext);

export const useCustomizationStateValue: () => any = () =>
  useContext(CustomizationContext);

interface ToolProviderProps {
  children: JSX.Element[] | JSX.Element;
  editingExisting?: boolean;
  editingInitState?: EditingInitState;
}

export const CustomizationToolProvider = ({
  children,
  editingExisting = false,
  editingInitState = {},
}: ToolProviderProps) => {
  const initState = !editingExisting
    ? customizationInitialState
    : { ...customizationInitialState, editingExisting: true, editingInitState };

  return (
    <RawCustomizationToolProvider
      initialState={initState}
      reducer={customizationToolReducer}
    >
      {children}
    </RawCustomizationToolProvider>
  );
};
