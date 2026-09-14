// @ts-nocheck
import React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useLazyQuery } from 'react-apollo';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { TextField as TextField } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { InputAdornment as InputAdornment } from '@mui/material';

import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { NumericFormat } from 'react-number-format';
import { useMediaQuery } from '@mui/material';
import {
  cocoBold,
  fontFamily,
  cocoRegular,
} from '../../../../styles/constants';
import ErrorMessage from '../../../common/Errors';
import { useUserProvider } from '../../../../context/user';
import { getSizeProposal } from '../../../../apollo/mutations/product';

const validationSchema = yup.object({
  height: yup.string(),
  weight: yup.string(),
  productId: yup.string(),
});

interface Props {
  productId: any;
  sizeReference: string;
}

export default function SizeProposal({ productId, sizeReference }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Product } = languages[currentLanguage];
  const { productInfo } = Product;
  const {
    proposal,
    // bigLengthError,
    // bigWeightError,
    // emptyValuesError,
    // floatNumberError,
  } = productInfo;
  const {
    heightLabelText,
    heightPlaceholder,
    weightLabelText,
    weightPlaceholder,
    getSizeBtnText,
    // enterParametersText,
    noValueForParameters,
    sizeResponseText,
  } = proposal;

  const editor = useEditor({
    content: sizeReference,
    extensions: [StarterKit],
    editable: false,
  });

  const [getSizeProposalRequest, { data, loading, error }] = useLazyQuery(
    getSizeProposal,
    {
      onCompleted: () => {
        formik.setFieldValue('height', '');
        formik.setFieldValue('weight', '');
      },
    },
  );

  const formik = useFormik({
    validationSchema,
    initialValues: {
      height: '',
      weight: '',
      productId,
    },
    onSubmit: (values) => {
      const payload = {
        productId: values.productId,
        height: Number(values.height),
        weight: Number(values.weight),
      };

      getSizeProposalRequest({
        variables: { ...payload },
      });
    },
  });

  return (
    <Box
      sx={{
        maxHeight: isMobile ? '98vh' : '70vh',
        overflow: 'hidden auto',
        '*': { fontFamily },
      }}
    >
      <Box
        sx={{
          fontFamily,
          textAlign: 'justify',
          fontSize: '0.7rem',
          lineHeight: '20px',
        }}
      >
        <EditorContent editor={editor} />
      </Box>

      <Box sx={{ mt: '2rem' }}>
        <Stack
          sx={{
            mb: '0.5rem',
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              ...cocoRegular,
              fontWeight: 600,
              fontSize: '0.75rem',
              color: '#050505',
            }}
          >
            {heightLabelText}
          </Typography>

          <NumericFormat
            id="height"
            name="height"
            placeholder={heightPlaceholder}
            value={formik.values.height}
            required
            allowNegative={false}
            allowLeadingZeros={false}
            decimalScale={0}
            customInput={TextField}
            isAllowed={(values) => {
              const { formattedValue, floatValue }: any = values;

              return formattedValue === '' || floatValue <= 250;
            }}
            onValueChange={(values) => {
              formik.setFieldValue('height', values.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    color: '#050505',
                    '.MuiTypography-root': {
                      ...cocoRegular,
                      color: '#050505',
                      fontWeight: 600,
                      fontSize: '0.8rem !important',
                    },
                  }}
                >
                  CM
                </InputAdornment>
              ),
            }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': { borderRadius: 0 },
              '& .MuiInputBase-input::placeholder': {
                ...cocoRegular,
                color: '#000',
                opacity: 1,
                fontSize: '0.5rem',
                fontWeight: 600,
              },
            }}
          />
        </Stack>

        <Stack
          sx={{
            mb: '1rem',
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              ...cocoRegular,
              fontWeight: 600,
              fontSize: '0.75rem',
              color: '#050505',
            }}
          >
            {weightLabelText}
          </Typography>

          <NumericFormat
            id="weight"
            name="weight"
            placeholder={weightPlaceholder}
            value={formik.values.weight}
            required
            allowNegative={false}
            allowLeadingZeros={false}
            decimalScale={0}
            customInput={TextField}
            isAllowed={(values) => {
              const { formattedValue, floatValue }: any = values;

              return formattedValue === '' || floatValue <= 300;
            }}
            onValueChange={(values) => {
              formik.setFieldValue('weight', values.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    color: '#050505',
                    '.MuiTypography-root': {
                      ...cocoRegular,
                      color: '#050505',
                      fontWeight: 600,
                      fontSize: '0.8rem !important',
                    },
                  }}
                >
                  KG
                </InputAdornment>
              ),
            }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': { borderRadius: 0 },
              '& .MuiInputBase-input::placeholder': {
                ...cocoRegular,
                color: '#050505',
                opacity: 1,
                fontSize: '0.5rem',
                fontWeight: 600,
              },
            }}
          />
        </Stack>

        <LoadingButton
          type="submit"
          disabled={
            formik.values?.height?.length === 0 ||
            formik.values?.weight?.length === 0
          }
          fullWidth
          loading={loading}
          onClick={formik.submitForm}
          sx={{
            mb: '1rem',
            padding: '0.7rem',
            color: '#fff',
            fontSize: '0.7rem',
            boxShadow: '10px 10px 20px #00000040',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            borderRadius: 0,
            textTransform: 'uppercase',
            ...cocoBold,
            ':disabled': {
              color: '#fff',
              opacity: 0.45,
              cursor: 'not-allowed',
            },
          }}
        >
          {getSizeBtnText}
        </LoadingButton>
      </Box>

      {data && (
        <Typography
          variant="body1"
          sx={{
            ...cocoRegular,
            fontSize: 'calc(0.3em + 1vmin)',
            textAlign: 'center',
          }}
        >
          {data?.productSizeReference?.size
            ? `${sizeResponseText.replace(
                '__%__',
                data.productSizeReference.size,
              )}`
            : noValueForParameters}
        </Typography>
      )}

      {error && <ErrorMessage>{}</ErrorMessage>}
    </Box>
  );
}
