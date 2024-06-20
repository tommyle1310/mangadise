'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store, persistor, AppStore } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = store;
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
