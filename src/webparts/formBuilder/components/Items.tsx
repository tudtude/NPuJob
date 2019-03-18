import * as React from 'react'
import styles from './FormBuilder.module.scss'

export class Items extends React.Component<any, any> {

  onDragStart = ( e, item )=> {
    console.log( 'DragStart', e, item  )
  }

  public render() {

    let { onDragStart, itemsList } = this.props 

    return (
      <div>
        <h2 className={styles.head} > Item List </h2>
        {
          itemsList.map(item => {
            return (
              <div
                onDragStart={ e => onDragStart( e, item.type ) }
                draggable
                key={item.name}
                className={styles.item}
                style={{ cursor: 'move '}}
              >
                {item.name}
              </div>        
            )
          })
        }
      </div>
    )
  }
}

export default Items