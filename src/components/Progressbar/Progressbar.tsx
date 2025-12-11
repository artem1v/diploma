import styles from './progressbar.module.css';

interface ProgressbarProps {
  value: number;
}

export default function Progressbar({ value }: ProgressbarProps) {
  return (
    <input
      className={styles.styledProgressInput}
      type="range"
      min="0"
      max={100}
      value={value}
      step={0.1}
      readOnly={true}
    />
  );
}
