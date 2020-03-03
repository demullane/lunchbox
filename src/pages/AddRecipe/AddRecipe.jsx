import React from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form';
import { useAuth } from '../../context/auth';
import Styles from './AddRecipeStyles'

const AddRecipe = (props) => {
  const { authTokens } = useAuth();

  const onSubmit = (values) => {
    console.log('authTokens: ', authTokens.auth_token)
    const fakeValues = {
      title: 'Beef and Broccoli',
      website: 'http://www.google.com',
      ingredients: ['1 Cup Beef', '2 Cups Broccoli'],
      directions: ['Cut the beef in strips', 'Steam the broccoli for 10 minutes'],
      notes: 'Add extra flour'
    };
    console.log('Recipe values: ', values);
    axios.post('http://localhost:3001/recipes',
      { ...fakeValues },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization': authTokens.auth_token,
        }
      },
    ).then(result => {
      if (result.status === 201) {
        console.log('Successfully added a new recipe')
      } else {
        console.log('You really messed up', result)
      }
    }).catch(e => {
      console.log('You really messed up', e)
    });
  }

  const validate = () => {
    return true;
  }

  return (
    <Styles>
      <h1>Add Recipe</h1>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <Field
                name="title"
                component="input"
                type="text"
                placeholder="Mom's Meatloaf"
              />
            </div>
            <div>
              <label>Website</label>
              <Field
                name="website"
                component="input"
                type="text"
                placeholder="http://wwww.food.com/meatloaf"
              />
            </div>
            <div>
              <label>Ingredients</label>
              <Field
                name="ingredients"
                component="textarea"
                placeholder="1 T Flour, 1 Cup of Water, etc."
              />
            </div>
            <div>
              <label>Directions</label>
              <Field
                name="directions"
                component="textarea"
                placeholder="1. Stir all ingredients together"
              />
            </div>
            <div>
              <label>Notes</label>
              <Field
                name="notes"
                component="textarea"
                placeholder="Add extra flour for high altitude"
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    </Styles>
  )
}

export default AddRecipe;
