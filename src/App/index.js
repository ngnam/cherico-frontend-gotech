import 'core-js/stable'
import { hot } from 'react-hot-loader/root'

// HMR対応するのためReactより先にインポートする必要あり
// https://github.com/gaearon/react-hot-loader#getting-started
import rootRender from 'helpers/rootRender'

import App from './App'

import 'css/index.scss'
import 'swiper/css/swiper.min.css'

rootRender(process.env.NODE_ENV === 'development' ? hot(App) : App)
