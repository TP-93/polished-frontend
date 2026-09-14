// @ts-nocheck
import Box from '@mui/material/Box';

import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { useMediaQuery } from '@mui/material';
import { fontFamily } from '../../../../styles/constants';

interface Props {
  shippingFaq: string;
}

export default function ShippingInfo({ shippingFaq }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const editor = useEditor({
    content: shippingFaq,
    editable: false,
    extensions: [StarterKit],
  });

  return (
    <Box
      sx={{
        maxHeight: isMobile ? '98vh' : '70vh',
        overflow: 'hidden auto',
        width: '100%',
        '*': {
          fontFamily,
          textAlign: 'justify',
          fontSize: '0.7rem',
          lineHeight: '20px',
        },
      }}
    >
      <EditorContent editor={editor} />
    </Box>
  );
}
