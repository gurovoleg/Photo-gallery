import React from 'react'
import Alert from 'react-s-alert'
import { settings } from './settings'
// Styles
// import 'react-s-alert/dist/s-alert-default.css' // default
import './alerts.css'
// Effects
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
// import 'react-s-alert/dist/s-alert-css-effects/scale.css'
// import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
// import 'react-s-alert/dist/s-alert-css-effects/flip.css'
// import 'react-s-alert/dist/s-alert-css-effects/genie.css'
// import 'react-s-alert/dist/s-alert-css-effects/jelly.css'
// import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

const AlertComponent = () => <Alert {...settings} />

export default AlertComponent
