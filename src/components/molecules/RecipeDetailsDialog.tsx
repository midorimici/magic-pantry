import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { Cancel, CheckCircle } from '@mui/icons-material'

type Ing = {
  id: number
  name: string
}

type Props = {
  missed?: Ing[]
  used?: Ing[]
  recipe?: RecipeDetail
  onCloseDialog: () => void
}

export const RecipeDetailsDialog: React.FC<Props> = ({ missed, used, recipe, onCloseDialog }) => {
  return (
    <Dialog open={recipe !== undefined} onClose={onCloseDialog}>
      {recipe && (
        <>
          <Image alt={recipe.title} height={360} src={recipe.image} width={600} />
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogContent>
            <List>
              {used &&
                used.map((ing: Ing) => (
                  <ListItem key={ing.id} dense>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={ing.name} />
                  </ListItem>
                ))}
              {missed &&
                missed.map((ing: Ing) => (
                  <ListItem key={ing.id} dense>
                    <ListItemIcon>
                      <Cancel color="error" />
                    </ListItemIcon>
                    <ListItemText primary={ing.name} />
                  </ListItem>
                ))}
            </List>
            <Typography variant="body2">
              <span dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </Typography>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
