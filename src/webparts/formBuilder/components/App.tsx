import * as React from 'react';
import styles from './FormBuilder.module.scss';
import Items from './Items';
import ConfigItems from './ConfigItems'
import Preview from './Preview'
import { createItem, reOrder } from './methods.js'

export class App extends React.Component<any, any> {

  itemsList = [
    { name: 'Text', type: 'Header' },
    { name: 'Input text', type: 'Input' },
    { name: 'Choice Group', type: 'ChoiceGroup' }
  ];
  
  state = {
    configItems: [],
    tempConfigItems: [],
    dragIndex: null,
    currentDiff: 0
  }

  onDragOver = e => e.preventDefault()

  onDragEnd = () => this.setState({ dragIndex: null, currentDiff: 0, tempConfigItems: [] })

  onDragOverItem = (e, item) => {
    e.preventDefault()
    let { configItems, dragIndex, currentDiff, tempConfigItems } = this.state
    let diff = dragIndex - item
    if (dragIndex === null || currentDiff === diff ) return
    if (tempConfigItems.length < 1) tempConfigItems = configItems
    configItems = reOrder(tempConfigItems, dragIndex, item)
    this.setState({ configItems, tempConfigItems, currentDiff: diff })
  }

  onDrop = e => {
    e.preventDefault()
    let { configItems } = this.state
    let item = e.dataTransfer.getData('data')
    if (!item) return
    let newConfigItem = createItem(item)
    this.setState({ configItems: [...configItems, newConfigItem] })
  }

  onDragStart = (e, item) => e.dataTransfer.setData("data", item);
  
  onConfigDragStart = (e, item) => {
    e.dataTransfer.setData('configItem', item)
    this.setState({ dragIndex: item })
  }

  delItem = key => {
    let { configItems } = this.state
    configItems.splice(key, 1)
    this.setState({ configItems })
  }

  onChange = (key, item, e) => {
    let { configItems } = this.state
    configItems[key][item] = e
    this.setState({ configItems })
  }

  onChangeOption = (key_item, items, item, e) => {
    let { configItems } = this.state
    configItems[key_item]['options'][items][item] = e
    this.setState({ configItems })
  }

  addOptions = ( options, key_item ) => {
    let { configItems } = this.state
    configItems[key_item]['options'].push( options)
    this.setState({ configItems })
  }

  delOption = ( key_item, item ) => {
    let { configItems } = this.state
    configItems[key_item]['options'].splice(item, 1)
    this.setState({ configItems })
  }

  public render() {

    let { configItems } = this.state

    return (
      <div className='ms-Grid'>
        <div className='ms-Grid-row' style={{ display: 'flex' }}>
          <div className={styles.appPannel}>
            <Items
              itemsList={this.itemsList}
              onDragStart={this.onDragStart}
            />
          </div>
          <div
            className={styles.appDropArea}
            onDragOver={this.onDragOver}
            onDragEnd={this.onDragEnd}
            onDrop={e => this.onDrop(e)}
          >
            <ConfigItems
              configItems={configItems}
              delItem={this.delItem}
              onChange={this.onChange}
              onConfigDragStart={this.onConfigDragStart}
              onDragOverItem={this.onDragOverItem}
              onDragEnd={this.onDragEnd}
              onChangeOption={this.onChangeOption}
              addOptions={this.addOptions}
              delOption={this.delOption}
            />
          </div>
        </div>
        <div className='ms-Grid-row'>
          <div className={styles.appPreview}>
            <Preview
              configItems={configItems}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
