import React from 'react'
import Main from './views/pages/Main'

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
    return (
        <Main />
    )
}

// export default App
export default withAuthenticator(App);
