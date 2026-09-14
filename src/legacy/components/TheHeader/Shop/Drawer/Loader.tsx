// @ts-nocheck
import { Stack as Stack } from '@mui/material';
import { Skeleton as Skeleton } from '@mui/material';

const emptyColumns = Array(4).fill(null);
const emptyColumRows = Array(5).fill(null);

export default function Loader() {
  return (
    <Stack
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{ minHeight: '40vh', pl: '20px', backgroundColor: '#fff' }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        flexBasis="65%"
        justifyContent="space-between"
      >
        {emptyColumns.map((_, columnIndex: number) => (
          <Stack
            key={columnIndex}
            display="flex"
            flexDirection="column"
            flexBasis="23%"
          >
            {emptyColumRows.map((__, rowIndex: number) => (
              <Skeleton
                key={columnIndex + rowIndex}
                variant="text"
                sx={{ fontSize: '2rem' }}
              />
            ))}
          </Stack>
        ))}

        {/* <Stack display="flex" flexDirection="column" flexBasis="23%"> */}
        {/*  {emptyArray.map(() => ( */}
        {/*    <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> */}
        {/*  ))} */}
        {/* </Stack> */}

        {/* <Stack display="flex" flexDirection="column" flexBasis="23%"> */}
        {/*  {emptyArray.map(() => ( */}
        {/*    <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> */}
        {/*  ))} */}
        {/* </Stack> */}

        {/* <Stack display="flex" flexDirection="column" flexBasis="23%"> */}
        {/*  {emptyArray.map((_, index: number) => ( */}
        {/*    <Skeleton */}
        {/*      key={index + 20} */}
        {/*      variant="text" */}
        {/*      sx={{ fontSize: '2rem' }} */}
        {/*    /> */}
        {/*  ))} */}
        {/* </Stack> */}
      </Stack>

      <Skeleton
        variant="rounded"
        sx={{ flexBasis: '30%', width: '100%', height: '40vh' }}
      />
    </Stack>
  );
}
