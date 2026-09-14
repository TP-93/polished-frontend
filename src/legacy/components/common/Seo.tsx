// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';

import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { useLazyQuery } from 'react-apollo';

import { fontFamily } from '../../styles/constants';
import { useUserProvider } from '../../context/user';
import { getCategorySeoText } from '../../apollo/queries/categories';

interface Props {
  slug: string;
}

export default function SeoText({ slug }: Props) {
  const {
    state: { currentLanguage: lang },
  } = useUserProvider();

  const [text, setText] = React.useState<string>('');

  const [seoTextRequest, _] = useLazyQuery(getCategorySeoText, {
    fetchPolicy: 'network-only',
    variables: {
      slug,
      lang,
    },
    onError: (error) => {
      console.log({ error });
    },
    onCompleted: (data) => {
      if (data?.category?.SEOCategoryText?.length > 0) {
        setText(data.category.SEOCategoryText);
      }
    },
  });

  React.useEffect(() => {
    if (slug?.length) {
      seoTextRequest();
    }
  }, [slug, lang]);

  const editor = useEditor(
    {
      content: text,
      editable: false,
      extensions: [
        // @ts-ignore
        StarterKit,
        Link.configure({
          openOnClick: true,
          linkOnPaste: true,
        }),
      ],
    },
    [text],
  );

  if (text.length === 0) return null;

  return (
    <Box
      sx={{
        p: '2rem 5px 3rem 5px',
        '*': {
          fontFamily,
          fontSize: '0.6rem',
          textAlign: 'center',
          color: '#0a0a0a',
        },
        a: {
          color: '#2754f8',
        },
      }}
    >
      <EditorContent editor={editor} />
    </Box>
  );
}
