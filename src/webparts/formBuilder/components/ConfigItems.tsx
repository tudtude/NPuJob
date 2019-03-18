import * as React from 'react'
import styles from './FormBuilder.module.scss'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';


export class ConfigItems extends React.Component<any, any> {

    displayChoice = ( choices, key_item) => {
        let { onChangeOption, delOption } = this.props
        return choices.map((choice, items) => {
            return <div
                    style={{ padding: '5px 0px'}}
                    key={items}
                    className='ms-Grid-row'
                >
                <TextField
                    className='ms-Grid-col ms-md4'
                    value={choice.key}
                    prefix='key'
                    onChanged={ e => onChangeOption( key_item, items, 'key', e )}
                />
                <TextField
                    className='ms-Grid-col ms-md5'
                    value={choice.text}
                    prefix='value'
                    onChanged={ e => onChangeOption( key_item, items, 'text', e )}
                />
                <PrimaryButton
                    onClick={e => delOption( key_item, items )}
                >-</PrimaryButton>
            </div>

        })
    }

    render() {
        let { 
            addOptions,
            configItems, 
            delItem, 
            onChange, 
            onConfigDragStart, 
            onDragOverItem, 
            onDragEnd } = this.props
        return (
            <div>
                <h2 className={styles.head}> Form Items configuration </h2>
                {
                    configItems.length < 1 ? <div style={{ textAlign: 'center', color: 'withe' }}> Please drage item to me </div> :
                        configItems.map((configItem, key_item) => (
                            <div
                                className={styles.item2}
                                key={key_item}
                                draggable
                                onDragStart={e => onConfigDragStart(e, key_item)}
                                onDragOver={e => onDragOverItem(e, key_item)}
                                onDragEnd={onDragEnd}
                            >
                                <PrimaryButton onClick={() => delItem(key_item)}>Delete item {key_item} </PrimaryButton>

                                {
                                    Object.keys(configItem).map(item => {
                                        if (item !== 'key' && item !== 'type' && item !== 'options') {
                                            return <TextField
                                                key={item}
                                                label={item}
                                                value={configItem[item]}
                                                onChanged={e => onChange(key_item, item, e)}
                                            />
                                        }
                                        if (item === 'options') {

                                            return <div style={{ marginTop: '15px' }}>
                                                Choice List
                                                        <div style={{ paddingLeft: '15px' }}>
                                                    {this.displayChoice(configItem[item], key_item )}
                                                    <PrimaryButton 
                                                        style={{ marginTop: '5px'}}
                                                        onClick={e => addOptions({ key: 'key', text: 'Optios'}, key_item )}
                                                    > Add Item </PrimaryButton>
                                                </div>
                                            </div>
                                        }

                                    })
                                }

                            </div>
                        ))

                }

            </div>
        )
    }
}

export default ConfigItems
