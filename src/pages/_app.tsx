import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '@/redux/store'
import { Provider } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
          <Toaster />
         <Component {...pageProps} />
         </Provider>
}
