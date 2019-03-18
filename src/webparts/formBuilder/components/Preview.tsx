import * as React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export class Preview extends React.Component<any, any> {

    displayHtml = configItems => {
        return configItems.map((element, key) => {
            if (element.type === 'Input') {
                return <TextField 
                    label={element.Label} 
                    placeholder={element.Placeholder} 
                    required={element.Required}
                    style={{ margin: '5px' }} 
                    key={key} />
            } else if (element.type === 'Header') {
                return <div key={key} style={{ margin: '5px 0px' }}> { element.Text } </div>
            } else if (element.type === 'ChoiceGroup') {
                return <ChoiceGroup 
                    options={element.options}
                    label={ element.Label }
                    required={element.Required}
                    key={key}
                />
            }
        })
    }

    render() {
        let { configItems } = this.props
        return (
            <div>
                <div style={{ textAlign: 'center', fontSize:'1.5em' }}>Form view</div>
                <div style={{ borderStyle: 'solid', padding: '15px', margin: "10px"}}>
                    {
                        configItems.length < 1 ? <div style={{ textAlign: 'center'}}> There is no Items </div> :
                        this.displayHtml(configItems)
                    }
                    {
                        configItems.length < 1 ? null:
                        <div style={{ display: 'flex', direction:'ltr', marginTop:'15px'}}>
                            <PrimaryButton>Save</PrimaryButton>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Preview
