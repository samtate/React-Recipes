import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import ReactMarkdown from 'react-markdown';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 345,
    margin: '20px'
  },
  media: {
    height: 140,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    position: 'relative',
  },
  cover: (recipe) => ({
    width: '100%',
    height: '20vh',
    'background-size': 'cover',
    background: `url("${recipe.image}") no-repeat center center`,
  }),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecipeCard({ recipe, onEditRecipe, onRemoveRecipe }) {

  const ingredients = Object.values(recipe.ingredients);
  const ingredientKeys = Object.keys(recipe.ingredients);

  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false)
  const [previewMode, setPreviewMode] = React.useState(false)
  const [editTitle, setEditTitle] = React.useState(recipe.title)
  const [editCookingTime, setEditCookingTime] = React.useState(recipe.cookingTime)
  const [editImage, setEditImage] = React.useState(recipe.image)
  const [editIngreds, setEditIngreds] = React.useState(ingredients)
  const [editRecipeText, setEditRecipeText] = React.useState(recipe.recipeText)

  const classes = useStyles(recipe);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const filteredIngreds = editIngreds.filter(Boolean);
    if (
      editTitle !== recipe.title ||
      editImage !== recipe.image ||
      editCookingTime !== recipe.cookingTime ||
      editRecipeText !== recipe.recipeText ||
      JSON.stringify(editIngreds) !== JSON.stringify(ingredients)
      ) {
      if (window.confirm("You have unsaved changes, are you sure you want to close and lose them?")) {
        setOpen(false);
        setEditMode(false);
        setPreviewMode(false);
        onEditRecipe(recipe, editTitle, editImage, editCookingTime, filteredIngreds, editRecipeText);
      }
    } else {
      setOpen(false);
      setEditMode(false);
      setPreviewMode(false);
      onEditRecipe(recipe, editTitle, editImage, editCookingTime, filteredIngreds, editRecipeText);
    }
  };

  const onToggleEditMode = () => {
    setEditMode(!editMode);
    setEditTitle(recipe.title);
    setEditIngreds(ingredients)
    setEditRecipeText(recipe.recipeText);
    setEditCookingTime(recipe.cookingTime);
  };

  const onTogglePreviewMode = () => {
    setPreviewMode(!previewMode);
  }

  const onChangeEditText = (event, field) => {
    const value = event.target.value

    if (field==='title') {
      setEditTitle(value);
    } else if (field==='recipeText') {
      setEditRecipeText(value);
    } else if (field==='cookingTime') {
      setEditCookingTime(value);
    }
  };

  const onChangeFile = files => {
    let b64 = ''
    const reader = new FileReader();

    reader.onloadend = function() {
      b64 = reader.result;
      setEditImage(b64);
    }

    if (files[0].size > 10485760 ) {
      alert('file too large! 10MB Maximum');
    } else {
      reader.readAsDataURL(files[0]);
    }
  };

  const onChangeEditIngreds = (event, i) => {
    const value = event.target.value;
    const ingreds = [...editIngreds];
    ingreds[i] = value;
    setEditIngreds(ingreds);
  };

  const onSaveEditText = () => {
    const filteredIngreds = editIngreds.filter(Boolean);
    onEditRecipe(recipe, editTitle, editImage, editCookingTime, filteredIngreds, editRecipeText);
    setEditMode(false);
    setPreviewMode(false);
    setEditIngreds(filteredIngreds);
  };

  const addIngredient = () => {
    editIngreds.push('');
    onEditRecipe(recipe, editTitle, editImage, editCookingTime, editIngreds, editRecipeText);
  }

  const getRecipeTypeText = type => {
    switch (type) {
      case 'brek':
        return 'Breakfast';
      case 'lAndD':
        return 'Lunch & Dinner';
      case 'snack':
        return 'Snack';

      default:
        break;
    }
  }

  const mobile = useMediaQuery('(max-width:600px)');

  return (
      <>
        <Card
          onClick={handleClickOpen}
          className={classes.card}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={recipe.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {recipe.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {recipe.cookingTime} || {getRecipeTypeText(recipe.type)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          fullWidth
          fullScreen={mobile}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appbar}>
            <Toolbar>
              {mobile && (
                <IconButton
                  className={classes.menuButton}
                  aria-label="close"
                  color="inherit"
                  edge="start"
                  onClick={handleClose}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Typography className={classes.title} variant="h6">Recipe</Typography>
              {!editMode && (
                <IconButton
                  aria-label="delete"
                  color="inherit"
                  onClick={() => onRemoveRecipe(recipe.uid)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {editMode ? (
                <IconButton
                  aria-label="finish editing"
                  color="inherit"
                  onClick={onSaveEditText}
                >
                  <CheckCircleIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="edit"
                  color="inherit"
                  onClick={onToggleEditMode}
                >
                  <EditIcon />
                </IconButton>
              )}
              {!mobile && (
                <IconButton
                  aria-label="close"
                  color="inherit"
                  edge="end"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
          <div>
            <div className={classes.cover} alt="Recipe" style={ {backgroundImage:`url(${editImage})`, backgroundSize: 'cover' } }>
              <>
                {editMode ? (
                  <>
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      id="file"
                      className={classes.file}
                      onChange={event => onChangeFile(event.target.files)}
                    />
                    <label htmlFor="file" className="filePickerLabel"><CloudUploadIcon /> Add Recipe Image...</label>
                  </>
                ) : '' }
              </>
            </div>
            <Container>
              <Typography className={classes.title} variant="h4">
                {editMode ? (
                  <Input
                    type="text"
                    value={editTitle}
                    onChange={event => onChangeEditText(event, 'title')}
                  />
                ) : (
                  <>{recipe.title}</>
                )}
              </Typography>
              <Typography variant="h6">
                {editMode ? (
                  <Input
                    type="text"
                    value={editCookingTime}
                    onChange={event => onChangeEditText(event, 'cookingTime')}
                  />
                ) : (
                  <>{recipe.cookingTime}</>
                )}
              </Typography>
              <Typography className={classes.title} variant="h6">Ingredients:</Typography>
              <ul>
                {ingredients.map((ingred, i) => (
                  <li key={ingredientKeys[i]}>
                    {editMode ? (
                      <>
                        <Input
                          type="text"
                          value={editIngreds[i] || ''}
                          onChange={(e) => onChangeEditIngreds(e,i)}
                        />
                        <>
                        {(i === ingredients.length - 1) ? (
                          <Button onClick={addIngredient}>
                            Add
                          </Button>
                        ) : ''}
                        </>
                      </>
                    ) : (
                      <>{ingred}</>
                    )}
                  </li>
                ))}
              </ul>
              {editMode ? (
                <>
                {previewMode ? (
                  <ReactMarkdown source={editRecipeText} />
                ) : (
                  <TextField
                    type="text"
                    multiline={true}
                    rows={5}
                    value={editRecipeText}
                    onChange={event => onChangeEditText(event, 'recipeText')}
                  />
                )}
                <Button onClick={onTogglePreviewMode}>Preview</Button>
                </>
              ) : (
                <ReactMarkdown source={recipe.recipeText} />
              )}
            </Container>
          </div>
        </Dialog>
      </>
  )
}
