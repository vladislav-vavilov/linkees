import '@/index.css'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { App } from '@/App.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { store } from '@/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster theme='dark' position='bottom-center' richColors closeButton />
    </BrowserRouter>
  </Provider>
)
