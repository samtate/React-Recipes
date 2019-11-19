import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import RecipeCard from '../RecipeCard';

class RecipePage extends Component {
  render() {
    return(
      this.props.recipes ? this.props.recipes.map((recipe) =>
        <>
          <RecipeCard recipe={recipe} key={recipe.key}/>
        </>
      ) : ''
    );
  }
}
export default RecipePage;
