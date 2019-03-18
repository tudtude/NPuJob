
export const createItem = item => {
 if( item === 'Input' ){
    return {
        type: 'Input',
        Label: 'Default label',
        Placeholder: 'Default placeholder',
        Required: false,
        key:null
    }
 } else if( item === 'Header'){
     return {
        type: 'Header',
        Text: 'Default text'
     }
 } else if( item === 'ChoiceGroup'){
     return {
         type: 'ChoiceGroup',
         options: [
            {
              key: 'A',
              text: 'Option A',
            },
            {
              key: 'B',
              text: 'Option B'
            }
        ],
        Label: 'Default label',
        Required: false,
     }
 }
}

export const reOrder = ( configItems, dragIndex, item ) => {
    let newConfigItems = [ ...configItems ]
    newConfigItems.splice( dragIndex, 1 )
    newConfigItems.splice( item, 0, configItems[dragIndex])
    return newConfigItems
}
