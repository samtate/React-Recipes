import React, { Component } from 'react';

import LoggedOut from '../LoggedOut';
import RecipeCard from '../RecipeCard';

import { makeStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import AddFAB from '../AddFAB';
import { flexbox } from '@material-ui/system';

class Landing extends Component {

  render() {
    if (!this.props.authUser) {
      return <LoggedOut />
    } else {
      return (
        <>
          <Recipes authUser={this.props.authUser} />
        </>
        )
    }
  }
}

class RecipesBase extends Component {
  state = {
    title: '',
    image: '',
    ingredientsNo: 1,
    ingredients: [],
    loading: false,
    recipes: [],
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .recipes(this.props.authUser)
      .on('value', snapshot => {
      const recipeObject = snapshot.val();
        if (recipeObject) {
          const recipeList = Object.keys(recipeObject).map(key => ({
            ...recipeObject[key],
            uid: key,
          }));
          this.setState({
            recipes: recipeList,
            loading: false,
          });
        } else {
          this.setState({ recipes: null, loading: false });
        }
    });
  }

  addIngredient = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      ingredientsNo: prevState.ingredientsNo + 1
    }))
  }

  onChangeText = (event, field, i) => {
    const value = event.target.value;

    if (field !== 'ingredients') {
      this.setState({ [field]: value });
    } else {
      const ingreds = this.state.ingredients;
      ingreds[i] = value;
      this.setState({ ingredients: ingreds })
    }
  };

  onChangeFile = (files) => {
    let b64 = ''
    const reader = new FileReader();

    reader.onloadend = function() {
      b64 = reader.result;
      this.setState({ image: b64 });
    }.bind(this);

    if (files[0].size > 10485760 ) {
      alert('file too large! 10MB Maximum');
      document.getElementById('filepicker').value = '';
    } else {
      reader.readAsDataURL(files[0]);
    }
  };

  onCreateRecipe = (event, authUser, title, image, cookingTime, type, ingredients, recipeText) => {
    event.preventDefault();

    this.props.firebase.recipes(authUser).push({
      title: title,
      image: image,
      ingredients: ingredients,
      cookingTime: cookingTime,
      type: type,
      recipeText: recipeText,
      userId: authUser.uid,
    });

  };

  onEditRecipe = (recipe, title, image, cookingTime, ingredients, recipeText) => {
    const { uid, ...recipeSnapshot } = recipe;
    this.props.firebase.recipe(this.props.authUser,recipe.uid).set({
      ...recipeSnapshot,
      title,
      image,
      ingredients,
      cookingTime,
      recipeText,
    });
  };

  onRemoveRecipe = uid => {
    const confirm = window.confirm('Are you sure you want to delete this recipe?');
    if (confirm) this.props.firebase.recipe(this.props.authUser,uid).remove();
  };

  render() {
    const { recipes, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {recipes ? (
              <RecipeList
                authUser={authUser}
                recipes={recipes}
                onChangeText={this.onChangeText}
                onChangeFile={this.onChangeFile}
                onCreateRecipe={this.onCreateRecipe}
                onEditRecipe={this.onEditRecipe}
                onRemoveRecipe={this.onRemoveRecipe}
              />
            ) : (
              <div>There are no recipes ...</div>
            )}

            <AddFAB
              onCreateRecipe={this.onCreateRecipe}
            />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const useStyles = makeStyles({
  container: {
    maxWidth: '960px',
    paddingTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
});

function RecipeList({ authUser, recipes, onChangeText, onChangeFile, onCreateRecipe, onRemoveRecipe, onEditRecipe }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
    {recipes.map(recipe => (
      <React.Fragment key={recipe.uid}>
          {authUser.uid === recipe.userId && (
            <RecipeCard
              recipe={recipe}
              onEditRecipe={onEditRecipe}
              onRemoveRecipe={onRemoveRecipe}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const Recipes = withFirebase(RecipesBase);

export default Landing;
