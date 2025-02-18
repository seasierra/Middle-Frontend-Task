import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@radix-ui/react-alert-dialog'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'
import { ArrowLeft, Pencil, Trash } from 'lucide-react'
import { Button } from './ui/button'

export const RemoveDialog: React.FC<{ onConfirm: () => void; children: React.ReactNode }> = ({
  onConfirm,
  children,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center justify-center h-full fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
        </AlertDialogHeader>
        <footer className="flex gap-2 justify-center mt-2">
          <AlertDialogCancel asChild>
            <Button variant="outline">
              <ArrowLeft />
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onConfirm}>
              <Trash />
            </Button>
          </AlertDialogAction>
        </footer>
      </AlertDialogContent>
    </AlertDialog>
  )
}
