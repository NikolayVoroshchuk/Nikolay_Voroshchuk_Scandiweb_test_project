import { Component } from 'react';
import cls from './index.module.scss';

export default class SnackBar extends Component {
  state = {
    isActive: false,
  }
  message = '';
  openSnackBar = (message: string) => {
    this.message = message;
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 3000);
    });
  }
  render() {
    const { isActive } = this.state;

    if (!isActive) return null;

    return (
      <div className={cls.snackbar}>
        {this.message}
      </div>
    )
  }
}
