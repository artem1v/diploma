import { ChangeEvent } from 'react';
import styles from './progressbar.module.css';

interface ProgressbarProps {
  value: number;
  // step: number;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Progressbar({
  value,
  // step,
  // onChange,
}: ProgressbarProps) {
  return (
    <input
      className={styles.styledProgressInput}
      type="range"
      min="0"
      max={100}
      value={value}
      step={0.1}
      // onChange={onChange}
      readOnly={true}
    />
  );
}
