import axios from 'axios';

class TastyTreatsAPI {
    #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
    #RECIPES = '/recipes/popular'

  async getRecipesData() {
    try {
      const response = await axios.get(
        `${this.#BASE_URL}${this.#RECIPES}`
      );
      return response.data;
    } catch (error) {
      console.log('Sorry, there are no recipes. Please try again.')
    }
  }

}

export default TastyTreatsAPI;
