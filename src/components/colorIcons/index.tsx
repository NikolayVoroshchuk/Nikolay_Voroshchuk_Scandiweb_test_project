import { Component } from 'react';
import classNames from 'classnames';
import cls from './index.module.scss';

interface IColorIcons {
  items: Array<{ displayValue: string; value: string; id: string }>;
  handleAttribute: (idx: number) => void;
  attributeIdx: number;
}

export default class ColorIcons extends Component<IColorIcons> {
  render() {
    const { items, handleAttribute, attributeIdx } = this.props;

    return (
      <div className={cls.colorContainer}>
        {items.map(({ value }, idx) => (
          <div
            key={value}
            style={{ backgroundColor: value }}
            onClick={() => handleAttribute(idx)}
            className={classNames(cls.colorBox, {
              [cls.selected]: attributeIdx === idx,
            })}
          />
        ))}
      </div>
    );
  }
}
