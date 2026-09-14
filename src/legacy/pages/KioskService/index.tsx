// @ts-nocheck
import * as React from 'react';
import { ApolloError, gql } from 'apollo-boost';

import Swal from 'sweetalert2';
import { Query } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';

import PageWrapper from '../../components/common/PageDetails/PageWrapper';
import { KIOSK_API_RECORD } from '../../constants';

const GET_KIOSK_ID = gql`
  query getKioskId($password: String!, $serviceId: String!) {
    kiosk(password: $password, serviceId: $serviceId) {
      serviceId
      apiCode
      isEnabled
    }
  }
`;

interface QueryResult {
  data: any;
  loading: boolean;
  error?: ApolloError;
}

export default function KioskService() {
  const router = useHistory();

  const [kioskData, setKioskData] = React.useState<any>({
    serviceId: '',
    password: '',
  });

  const [errorMsg, setError] = React.useState<string>('');
  const [skipQuery, setSkipQuery] = React.useState<boolean>(true);

  const kioskDataChangeHandler = (e: any) => {
    const {
      target: { name, value },
    } = e;

    setKioskData((prev: any) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const completedHandler = () => {
    setSkipQuery(true);
  };

  const submitHandler = () => {
    const { serviceId, password } = kioskData;

    if (!serviceId.length || !password.length) {
      return setError('Empty fields are required!');
    }

    return setSkipQuery(false);
  };

  return (
    <PageWrapper>
      <Stack
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Query
          skip={skipQuery}
          query={GET_KIOSK_ID}
          variables={kioskData}
          onError={completedHandler}
          onCompleted={completedHandler}
          fetchPolicy="network-only"
        >
          {({ data, loading, error }: QueryResult) => {
            if (!loading && data) {
              Swal.fire({
                icon: 'success',
                title: 'Terminal authorized!',
              });

              if (data?.kiosk?.serviceId) {
                localStorage.setItem(KIOSK_API_RECORD, data.kiosk.apiCode);

                setKioskData({
                  serviceId: '',
                  password: '',
                });

                router.replace('/');
              }
            }

            if (error && !loading) {
              Swal.fire({
                icon: 'warning',
                title: 'Authorization failed!',
              });
            }

            return (
              <Stack sx={{ width: '500px' }}>
                <TextField
                  margin="normal"
                  label="Service-id"
                  name="serviceId"
                  error={errorMsg.length > 0 && !kioskData.serviceId.length}
                  value={kioskData.serviceId}
                  inputProps={{ maxLength: 20 }}
                  onChange={kioskDataChangeHandler}
                />

                <TextField
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  value={kioskData.password}
                  error={errorMsg.length > 0 && !kioskData.password.length}
                  inputProps={{ maxLength: 30 }}
                  onChange={kioskDataChangeHandler}
                />

                <LoadingButton
                  variant="contained"
                  sx={{ marginTop: '1rem' }}
                  size="large"
                  loading={loading}
                  onClick={submitHandler}
                >
                  Login
                </LoadingButton>
              </Stack>
            );
          }}
        </Query>
      </Stack>
    </PageWrapper>
  );
}
