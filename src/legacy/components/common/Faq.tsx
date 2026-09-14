// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';

import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { useLazyQuery } from 'react-apollo';

import { fontFamily } from '../../styles/constants';
import { getCategoryFaq } from '../../apollo/queries/categories';
import { useUserProvider } from '../../context/user';

interface Props {
  slug: string;
}

export default function Faq({ slug }: Props) {
  const {
    state: { currentLanguage: lang },
  } = useUserProvider();

  const [text, setText] = React.useState<string>('');

  const [faqRequest, _] = useLazyQuery(getCategoryFaq, {
    fetchPolicy: 'network-only',
    variables: {
      slug,
      lang,
    },
    onError: (error) => {
      console.log({ error });
    },
    onCompleted: (data) => {
      if (data?.category?.faq?.length > 0) {
        setText(data.category.faq);
      }
    },
  });

  React.useEffect(() => {
    if (slug?.length) {
      faqRequest();
    }
  }, [slug, lang]);

  const editor = useEditor(
    {
      content: text,
      editable: false,
      extensions: [StarterKit],
    },
    [text],
  );

  if (text.length === 0) return null;

  return (
    <Box
      sx={{
        p: '1rem 5px 5rem 5px',
        '*': {
          fontFamily,
          fontSize: '0.6rem',
          textAlign: 'center',
          color: '#0a0a0a',
        },
      }}
    >
      <EditorContent editor={editor} />
    </Box>
  );
}
