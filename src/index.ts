import { Pool } from 'multiprocessor';

async function main() {
  const poolSize = 4;

  const pool = new Pool(poolSize);
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onSuccess = (result: number, input: number, index: number) => {
    console.log(`Task #${index} result: ${result}`);
  };

  const onError = (error: string, input: number, index: number) => {
    console.error(`Task #${index} error: ${error}`);
  };

  const result = await pool.map(input, calcSinTask, {
    onTaskSuccess: (result: number, input: number, index: number) => {
      console.log(`Task #${index} | result: ${result}, input: ${input}`);
    },
    onTaskError: (error: string, input: number, index: number) => {
      console.log(`Task #${index} | error: ${error}, input: ${input}`);
    }
  });
  pool.close();

  console.log('Map result:', result);
}

async function calcSinTask(x: number): Promise<number> {
  const dirName = __dirname.replace('/node_modules/multiprocessor/lib', '/src');
  const { calcSin } = await import(`${dirName}/tasks`);
  return calcSin(x);
}

main().then(() => {
  console.log('Main process finished!');
});
