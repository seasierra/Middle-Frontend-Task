import React, { useState } from 'react'
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'

export const MapMarker = ({ position }: { position: google.maps.LatLngLiteral }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true)
  const [markerRef, marker] = useAdvancedMarkerRef()

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position}
        title={'AdvancedMarker that opens an Infowindow when clicked.'}
      />
      {infowindowOpen && (
        <InfoWindow anchor={marker} maxWidth={200} onCloseClick={() => setInfowindowOpen(false)}>
          This is an example for the{' '}
          <code style={{ whiteSpace: 'nowrap' }}>&lt;AdvancedMarker /&gt;</code> combined with an
          Infowindow.
        </InfoWindow>
      )}
    </>
  )
}
