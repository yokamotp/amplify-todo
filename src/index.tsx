import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import './index.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

Amplify.configure({
    Auth: {
        identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_COGNITO_REGION
    },
    Storage: {
        AWSS3: {
            bucket: process.env.REACT_APP_S3_BUCKET,
            region: process.env.REACT_APP_S3_REGION
        }
    }
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Authenticator>
            {({ signOut, user }) => (
                <Provider store={store}>
                    <ChakraProvider>
                        <App />
                    </ChakraProvider>
                </Provider>
            )}
        </Authenticator>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

