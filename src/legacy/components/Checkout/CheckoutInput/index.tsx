// @ts-nocheck
import React, { Component } from 'react';
import styled from 'styled-components';
import {
  black,
  cocoBold,
  cocoRegular,
  green,
  grey,
  platinum,
  red,
} from '../../../styles/constants';
import { ReactComponent as Check } from '../../../assets/images/icons/arrows/check_icon_fat_white.svg.tsx';

interface State {
  labelActive: boolean;
}

interface Props {
  type: string;
  error?: string;
  value: string;
  disabled?: boolean;
  name: string;
  id?: string;
  label: string;
  updateValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (name: string, value: string) => void;
  autoComplete?: string;
  onFocus?: (target: EventTarget & HTMLInputElement) => void;
}

class CheckoutInput extends Component<Props, State> {
  state = {
    labelActive: false,
  };

  private input: React.RefObject<HTMLInputElement> = React.createRef();

  componentDidMount() {
    if (this.input.current === null) return;
    if (this.input.current.value.trim() !== '') {
      this.setState({
        labelActive: true,
      });
    }
  }

  componentDidUpdate() {
    const { labelActive } = this.state;
    if (this.input.current === null) return;
    if (this.input.current.value.trim() !== '' && !labelActive) {
      // eslint-disable-next-line
      this.setState({
        labelActive: true,
      });
    }
  }

  toggleLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.trim() !== '') {
      this.setState({
        labelActive: true,
      });
    } else {
      this.setState({
        labelActive: false,
      });
    }
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { updateValue } = this.props;
    this.toggleLabel(event);
    updateValue(event);
  };

  onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validate } = this.props;
    const { name, value } = event.target;
    if (validate) validate(value, name);
  };

  onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    const { target } = e;
    if (onFocus) onFocus(target);
  };

  render() {
    const { labelActive } = this.state;
    const { type, error, value, disabled, name, id, label, autoComplete } =
      this.props;

    return (
      <Wrapper>
        <InputGroup>
          <Input
            ref={this.input}
            type={type}
            id={id}
            style={error ? { borderColor: red } : { borderColor: platinum }}
            disabled={disabled}
            onBlur={this.onBlur}
            onChange={this.onChange}
            name={name}
            value={value}
            autoComplete={autoComplete}
            onFocus={this.onFocus}
          />
          <Label
            style={error ? { color: red } : { color: grey }}
            labelActive={labelActive}
          >
            {label}
          </Label>
          {value && !error && <CheckIcon />}
        </InputGroup>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const InputGroup = styled.div`
  position: relative;
`;

interface LabelProps {
  labelActive: boolean;
}

const Label = styled.label`
  position: absolute;
  top: ${(p: LabelProps) => (p.labelActive ? '14px' : '50%;')};
  left: 15px;
  transform: translateY(-50%);
  text-transform: uppercase;
  ${cocoBold};
  font-size: ${(p: LabelProps) => (p.labelActive ? '12px' : '14px;')};
  color: ${(p: LabelProps) => (p.labelActive ? black : grey)};
  transition: all 0.15s ease-in-out;
  z-index: -1;
`;

export const Input = styled.input`
  ${cocoRegular};
  font-size: 16px;
  color: ${black};
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: 1px solid ${platinum};
  padding: 17px 15px 0 15px;
  background: transparent;
  &:disabled {
    background: ${platinum};
    cursor: not-allowed;
  }
  &:disabled + label {
    z-index: 1;
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }
  &:focus + label {
    font-size: 12px;
    top: 14px;
    color: ${black};
  }
`;

const CheckIcon = styled(Check)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: auto;
  path {
    fill: ${green};
  }
`;

export const ErrorMsg = styled.span`
  ${cocoRegular};
  color: ${red};
  font-size: 12px;
  margin-top: 3px;
  display: inline-block;
`;

export default CheckoutInput;
