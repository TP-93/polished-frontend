// @ts-nocheck
import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { cocoRegular } from '../../../../../styles/constants';
import { useUserProvider } from '../../../../../context/user';

interface Props {
  productId: string;
  colorSelectionProducts: any[];
}

export default function ColorSelector({
  productId,
  colorSelectionProducts,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const router = useHistory();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Product } = languages[currentLanguage];
  const {
    colorPickersData: { selectColorTitle },
  } = Product;

  const designRedirectHandler = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  if (!colorSelectionProducts?.length) return null;

  return (
    <Stack sx={{ p: '1rem 0 0 0' }}>
      <Box sx={{ p: '0 0 0.5rem 0', borderBottom: '1px solid #C6C6C8' }}>
        <Typography
          variant="body1"
          sx={{ ...cocoRegular, fontSize: '0.75rem', color: '#4c4c4c' }}
        >
          {selectColorTitle}
        </Typography>
      </Box>

      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ pt: '1rem', overflow: 'auto' }}
      >
        {[
          colorSelectionProducts.find((i) => i.id === productId),
          ...colorSelectionProducts.filter((i) => i.id !== productId),
        ].map((product) => {
          if (!product) return null;

          const { id, slug, imageGroups } = product || {};

          const previewUrl: string = imageGroups[0]?.url;

          return (
            <img
              key={id}
              src={previewUrl}
              onClick={() => designRedirectHandler(slug)}
              style={{
                display: 'block',
                width: isMobile ? '25%' : '18%',
                height: 'auto',
                cursor: 'pointer',
                border: productId === id ? '1px solid #000' : 'none',
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}
