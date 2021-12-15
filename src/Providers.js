import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { store } from 'app/store';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%, -50%)',
              }}>
              <Spin />
            </div>
          }>
          {children}
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default Providers;
