'use client'

import React from 'react'
import { Map, MapMouseEvent } from '@vis.gl/react-google-maps'
import { MapMarker } from '@/components/MapMarker'
import { useMarksList } from '@/api/marks'

const center = {
  lat: 50.4504,
  lng: 30.5245,
}

const App = () => {
  const { data: marksListData } = useMarksList()

  const [newMarker, setNewMarker] = React.useState<google.maps.LatLngLiteral | null>(null)

  const handleMapClick = ({ detail: { latLng } }: MapMouseEvent) => {
    setNewMarker(latLng)
  }

  return (
    <Map
      style={{ width: '100vw', height: '100vh' }}
      mapId="f76dc5964efb5f0f"
      defaultCenter={center}
      defaultZoom={11}
      zoomControl
      clickableIcons={false}
      gestureHandling={'greedy'}
      onClick={handleMapClick}
    >
      {marksListData?.marks.map((mark, index) => (
        <MapMarker
          key={mark.id}
          id={mark.id}
          position={{ lat: mark.x, lng: mark.y }}
          markName={mark.name}
          comment={mark.comment}
        />
      ))}
      {newMarker && <MapMarker create position={newMarker} onClose={() => setNewMarker(null)} />}
    </Map>
  )
}

export default App
