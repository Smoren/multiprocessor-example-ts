# Typescript Multiprocessor Example With Import

## What is multiprocessor?

[Multiprocessor](https://github.com/Smoren/multiprocessor-ts) is a Javascript/Typescript library that allows you to run 
tasks in parallel using child processes.

## How it works

```typescript
// File: src/index.ts
import { Pool } from 'multiprocessor';

const poolSize = 4;

const pool = new Pool(poolSize);
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = await pool.map(input, calcSinTask, {
  onTaskSuccess: (result: number, input: number, index: number) => {
    console.log(`Task #${index} | result: ${result}, input: ${input}`);
  },
  onTaskError: (error: string, input: number, index: number) => {
    console.log(`Task #${index} | error: ${error}, input: ${input}`);
  }
});
pool.close();

console.log(result);
// [ 0.8414, 0.9092, 0.1411, ... ]

async function calcSinTask(x: number): Promise<number> {
  const dirName = __dirname.replace('/node_modules/multiprocessor/lib', '/src');
  const { calcSin } = await import(`${dirName}/path/to/your/module`);
  return calcSin(x);
}
```

```typescript
// File: src/path/to/your/module.ts
export function calcSin(x: number): number {
  let result = 0;
  let sign = 1;
  let power = x;
  let factorial = 1;

  for (let n = 0; n < 1000000; n++) {
    if (n > 0) {
      factorial *= (2 * n) * (2 * n + 1);
      power *= x * x;
      sign *= -1;
    }

    const delta = calcDelta(sign, power, factorial);

    if (isNaN(result + delta)) {
      return result
    }

    result += delta;
  }

  return result;
}

function calcDelta(sign: number, power: number, factorial: number): number {
  return sign * (power / factorial);
}
```

## How to run

```bash
git clone https://github.com/Smoren/multiprocessor-example-ts.git
cd multiprocessor-example-ts
npm i
npm run main
```

## License

Multiprocessor TS is licensed under the MIT License.
