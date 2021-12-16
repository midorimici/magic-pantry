import Image from 'next/image'
import {
  Box,
  CardContent,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { Cancel, CheckCircle } from '@mui/icons-material'
import { DrawerLarge, DrawerSmall } from 'components/atoms'

type Ing = {
  id: number
  name: string
}

type Props = {
  missed?: Ing[]
  used?: Ing[]
  recipe?: RecipeDetail
  onCloseDrawer: () => void
}

export const RecipeDetailsDrawer: React.FC<Props> = ({ missed, used, recipe, onCloseDrawer }) => {
  const DrawerContents = () => {
    if (recipe) {
      return (
        <Box>
          <CardMedia
            component={() => (
              <Image alt={recipe.title} height={360} src={recipe.image} width={600} />
            )}
          />
          <CardContent>
            <Typography variant="h6">{recipe.title}</Typography>
            <Typography>
              from{' '}
              <Link
                href={recipe.sourceUrl || recipe.spoonacularSourceUrl}
                target="_blank"
                rel="noopener"
              >
                {recipe.sourceName || 'unknown'}
              </Link>
            </Typography>
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
          </CardContent>
        </Box>
      )
    }

    return null
  }

  return (
    <>
      <DrawerLarge>
        <Toolbar sx={{ bgcolor: 'primary.main' }} />
        <DrawerContents />
      </DrawerLarge>
      <DrawerSmall open={recipe !== undefined} onCloseDrawer={onCloseDrawer}>
        <DrawerContents />
      </DrawerSmall>
    </>
  )
}
