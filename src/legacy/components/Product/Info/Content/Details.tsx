// @ts-nocheck
import { Box as Box } from '@mui/material';

import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { useMediaQuery } from '@mui/material';
import { fontFamily } from '../../../../styles/constants';

interface Props {
  faq: string;
  description: string;
}

export default function Details({ faq, description }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const descriptionContent = useEditor({
    content: description,
    editable: false,
    extensions: [StarterKit],
  });

  const faqContent = useEditor({
    content: faq,
    editable: false,
    extensions: [StarterKit],
  });

  return (
    <Box
      sx={{
        maxHeight: isMobile ? '98vh' : '70vh',
        overflow: 'hidden auto',
        'div:first-child': {
          mb: '2rem',
        },
        '*': {
          fontFamily,
          textAlign: 'justify',
          fontSize: '0.65rem',
          lineHeight: '20px',
          color: '#575757',
        },
      }}
    >
      <EditorContent editor={descriptionContent} />

      <EditorContent editor={faqContent} />
    </Box>
  );
}
