import React, { useState } from 'react'
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import { Mark, useAddMark, useDeleteMark, useEditMark } from '@/api/marks'
import { Button } from './ui/button'
import { Pencil, Send, Trash } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { RemoveDialog } from './RemoveDialog'

export const MapMarker = ({
  id,
  position,
  comment,
  markName,
  create = false,
  onClose,
}: {
  position: google.maps.LatLngLiteral
  id?: number
  markName?: string
  comment?: string
  create?: boolean
  onClose?: () => void
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(create || false)
  const [isEditing, setIsEditing] = useState(create || false)
  const [markerRef, marker] = useAdvancedMarkerRef()

  const { mutate: addMark } = useAddMark()
  const { mutate: editMark } = useEditMark()
  const { mutate: deleteMark } = useDeleteMark()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries()) as unknown as Omit<Mark, 'id' | 'x' | 'y'>

    const markData = {
      x: position.lat,
      y: position.lng,
      ...data,
    }

    if (id) {
      editMark({
        id,
        ...markData,
      })
      setIsEditing(false)
    } else {
      addMark(markData)
      onClose?.()
    }
  }

  const handleDelete = () => {
    deleteMark(id || 0)
  }

  const handleClose = () => {
    setInfowindowOpen(false)
    setIsEditing(false)
    onClose?.()
  }

  return (
    <>
      <AdvancedMarker ref={markerRef} onClick={() => setInfowindowOpen(true)} position={position} />
      {infowindowOpen && (
        <InfoWindow
          className="px-2 py-1 w-[200px]"
          anchor={marker}
          zIndex={create ? 1000 : 100}
          headerContent={markName ? 'Mark' : 'New mark'}
          onCloseClick={handleClose}
          disableAutoPan
        >
          {!isEditing ? (
            <>
              {markName && <span className="font-black text-lg">{markName}</span>}
              <p>{comment}</p>
              <footer className="flex gap-2 justify-end mt-2">
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Pencil />
                </Button>
                <RemoveDialog onConfirm={handleDelete}>
                  <Button variant="destructive">
                    <Trash />
                  </Button>
                </RemoveDialog>
              </footer>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input required name="name" type="text" placeholder="Name" defaultValue={markName} />

              <Textarea required name="comment" placeholder="Comment" defaultValue={comment} />
              <footer className="flex gap-2 justify-end mt-2">
                <Button type="submit">
                  <Send /> Submit
                </Button>
              </footer>
            </form>
          )}
        </InfoWindow>
      )}
    </>
  )
}
