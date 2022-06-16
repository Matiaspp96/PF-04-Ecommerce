export default function formValidate(buyer){
    const error = {};

    if(!buyer.shipping.state){
        error.state = 'You must select a state'
    }
    if(!buyer.shipping.street){
        error.street = 'Street address is required'
    }
    if(!buyer.shipping.zip){
        error.zip = 'Postal code is required'
    }

    return error
}