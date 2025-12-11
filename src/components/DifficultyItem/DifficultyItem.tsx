export default function DifficultyItem({ difficulty }: { difficulty: string }) {
  let levelDivision: number = 1;

  const levelDefiner: string[] = [
    '#D9D9D9',
    '#D9D9D9',
    '#D9D9D9',
    '#D9D9D9',
    '#D9D9D9',
  ];

  const updateDifficultyLevel = (
    levelDefiner: string[],
    levelDivision: number,
  ): string[] => {
    const activeColor = '#00C1FF';
    const inactiveColor = '#D9D9D9';

    return levelDefiner.map((color, index) =>
      index < levelDivision ? activeColor : inactiveColor,
    );
  };

  switch (difficulty) {
    case 'начальный':
      levelDivision = 1;
      break;
    case 'средний':
      levelDivision = 3;
      break;
    case 'сложный':
      levelDivision = 5;
      break;
  }

  const difficultyLevel = updateDifficultyLevel(levelDefiner, levelDivision);

  return (
    <>
      <svg
        width="4"
        height="5"
        viewBox="0 0 4 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0.625C2.29837 0.625 2.58452 0.743527 2.7955 0.954505C3.00647 1.16548 3.125 1.45163 3.125 1.75V3.25C3.125 3.54837 3.00647 3.83452 2.7955 4.04549C2.58452 4.25647 2.29837 4.375 2 4.375C1.70163 4.375 1.41548 4.25647 1.2045 4.04549C0.993526 3.83452 0.875 3.54837 0.875 3.25V1.75C0.875 1.45163 0.993526 1.16548 1.2045 0.954505C1.41548 0.743527 1.70163 0.625 2 0.625Z"
          fill={difficultyLevel[0]}
        />
      </svg>

      <svg
        width="4"
        height="7"
        viewBox="0 0 4 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0.375C2.29837 0.375 2.58452 0.493527 2.7955 0.704505C3.00647 0.915483 3.125 1.20163 3.125 1.5V5.25C3.125 5.54837 3.00647 5.83452 2.7955 6.04549C2.58452 6.25647 2.29837 6.375 2 6.375C1.70163 6.375 1.41548 6.25647 1.2045 6.04549C0.993526 5.83452 0.875 5.54837 0.875 5.25V1.5C0.875 1.20163 0.993526 0.915483 1.2045 0.704505C1.41548 0.493527 1.70163 0.375 2 0.375Z"
          fill={difficultyLevel[1]}
        />
      </svg>

      <svg
        width="4"
        height="9"
        viewBox="0 0 4 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0.125C2.29837 0.125 2.58452 0.243527 2.7955 0.454505C3.00647 0.665483 3.125 0.951631 3.125 1.25V7.25C3.125 7.54837 3.00647 7.83452 2.7955 8.04549C2.58452 8.25647 2.29837 8.375 2 8.375C1.70163 8.375 1.41548 8.25647 1.2045 8.04549C0.993527 7.83452 0.875 7.54837 0.875 7.25V1.25C0.875 0.951631 0.993527 0.665483 1.2045 0.454505C1.41548 0.243527 1.70163 0.125 2 0.125Z"
          fill={difficultyLevel[2]}
        />
      </svg>

      <svg
        width="4"
        height="12"
        viewBox="0 0 4 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0.875C2.29837 0.875 2.58452 0.993526 2.79549 1.2045C3.00647 1.41548 3.125 1.70163 3.125 2V10.25C3.125 10.5484 3.00647 10.8345 2.79549 11.0455C2.58452 11.2565 2.29837 11.375 2 11.375C1.70163 11.375 1.41548 11.2565 1.2045 11.0455C0.993527 10.8345 0.875 10.5484 0.875 10.25V2C0.875 1.70163 0.993527 1.41548 1.2045 1.2045C1.41548 0.993526 1.70163 0.875 2 0.875Z"
          fill={difficultyLevel[3]}
        />
      </svg>

      <svg
        width="4"
        height="14"
        viewBox="0 0 4 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0.625C2.29837 0.625 2.58452 0.743526 2.79549 0.954505C3.00647 1.16548 3.125 1.45163 3.125 1.75V12.25C3.125 12.5484 3.00647 12.8345 2.79549 13.0455C2.58452 13.2565 2.29837 13.375 2 13.375C1.70163 13.375 1.41548 13.2565 1.20451 13.0455C0.993528 12.8345 0.875 12.5484 0.875 12.25V1.75C0.875 1.45163 0.993528 1.16548 1.20451 0.954505C1.41548 0.743526 1.70163 0.625 2 0.625Z"
          fill={difficultyLevel[4]}
        />
      </svg>
    </>
  );
}
