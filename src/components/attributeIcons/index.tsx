import { Component } from 'react';
import classNames from 'classnames';
import cls from './index.module.scss';

interface IAttributeIcons {
  items: Array<{ displayValue: string; value: string; id: string }>;
  handleAttribute: (idx: number) => void;
  attributeIdx: number;
}

export default class AttributeIcons extends Component<IAttributeIcons> {
  render() {
    const { items, handleAttribute, attributeIdx } = this.props;

    return (
      <div className={cls.sizeContainer}>
        {items.map(({ value }, idx) => (
          <div
            key={value}
            onClick={() => handleAttribute(idx)}
            className={classNames(cls.sizeBox, {
              [cls.selected]: attributeIdx === idx,
            })}
          >
            {value}
          </div>
        ))}
      </div>
    );
  }
}
