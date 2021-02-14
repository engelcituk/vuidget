export function setCategories( state, categories) {
    state.categories = categories;
}

export function setCategory(state, categoryName){
  //const categoria = find(state.categories, { id: category }) //category solo es un id
  // const resultado = state.categories.find( categoria => categoria.id === category );
  state.selectedCategory = categoryName;
}

export function setCategoriesError(state, errorMessage){
    state.errorCategories = true;
    state.errorMessageCategories = errorMessage;
    state.categories =  [];
}