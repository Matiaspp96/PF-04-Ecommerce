export function formValidations(product){
    let errors = {};
    if(!product.name){
      errors.name = 'Name is required'
    }else if(product.name.length < 5){
        errors.name = 'Please pick a name of at least 5 letters'
    }
  
    if(!product.description){
      errors.description = 'Description is required'
    }else if(product.description.length < 10){
        errors.description = 'Descriptions must be at least 10 letters long'
    }

    if(!product.category.length){
        errors.category = 'Category is required'
      }
  
    if(!product.price){
      errors.price = 'Price is required'
    } else if(product.price < 0){
        errors.price = 'Negative numbers are not allow'
    }

    if(!product.image){
        errors.image = 'Image is required. Please pick a file and press the save button.'
      }
  
    return errors
  }

  export  function categoryValidation(category){
    let errors = {};
    if(!category.name){
      errors.name = 'Category name is required'
    }
    return errors
  }