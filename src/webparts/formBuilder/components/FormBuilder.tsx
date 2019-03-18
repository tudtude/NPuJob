import * as React from 'react'
import { IFormBuilderProps } from './IFormBuilderProps'
import App from './App'

export default class FormBuilder extends React.Component<IFormBuilderProps, any > {
  public render(): React.ReactElement<IFormBuilderProps> {
    return (
      <App description={this.props}/>  
    );
  }
}
