import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'

type Props = {
  recipe?: RecipeDetail
  onCloseDialog: () => void
}

export const RecipeDetailsDialog: React.FC<Props> = ({ recipe, onCloseDialog }) => {
  return (
    <Dialog open={recipe !== undefined} onClose={onCloseDialog}>
      {recipe && (
        <>
          <Image alt={recipe.title} height={360} src={recipe.image} width={600} />
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              <span dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </Typography>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
