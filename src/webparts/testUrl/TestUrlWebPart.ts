import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import TestUrl from './components/TestUrl';
import { ITestUrlProps } from './components/ITestUrlProps';

export interface ITestUrlWebPartProps {
  description: string;
}

export default class TestUrlWebPart extends BaseClientSideWebPart<ITestUrlWebPartProps> {

 

  public render(): void {
    const element: React.ReactElement<ITestUrlProps> = React.createElement(
      TestUrl,
      
    );

    ReactDom.render(element, this.domElement);
  }




 



  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  
}
