import * as React from 'react';
import styles from './TestUrl.module.scss';
import { ITestUrlProps } from './ITestUrlProps';
import { sp } from '@pnp/sp/presets/all';

export interface ITestUrlState {
  userName: string;
  accessCount: number;
}

export default class TestUrl extends React.Component<ITestUrlProps, ITestUrlState> {
  constructor(props: ITestUrlProps) {
    super(props);
    this.state = {
      userName: '',
      accessCount: 0
    };
  }

  public componentDidMount(): void {
    this.getUserName();
    this.incrementAccessCount();
  }

  private async getUserName(): Promise<void> {
    try {
      const currentUser = await sp.web.currentUser.get();
      this.setState({ userName: currentUser.Title });
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  }

  private async incrementAccessCount(): Promise<void> {
    try {
      const list = sp.web.lists.getByTitle('Visitors');
      const { userName } = this.state;

      await list.items.add({
        Title: userName
      });

      this.setState((prevState) => ({ accessCount: prevState.accessCount + 1 }));
    } catch (error) {
      console.error('Error incrementing access count:', error);
    }
  }

  public render(): React.ReactElement<ITestUrlProps> {
    return (
      <div className={styles.testUrl}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Bienvenue, {this.state.userName}!</span>
              <p className={styles.subTitle}>Vous avez accédé à cette page {this.state.accessCount} fois.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
