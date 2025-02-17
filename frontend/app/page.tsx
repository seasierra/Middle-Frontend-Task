'use client'

import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { MapMarker } from '@/components/MapMarker'

const center = {
  lat: 50.4504,
  lng: 30.5245,
}

const App = () => (
  <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''} id>
    <Map
      style={{ width: '100vw', height: '100vh' }}
      mapId="f76dc5964efb5f0f"
      defaultCenter={center}
      defaultZoom={11}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      <MapMarker position={{ lat: 50.4504, lng: 30.5245 }} />
    </Map>
  </APIProvider>
)

export default App
