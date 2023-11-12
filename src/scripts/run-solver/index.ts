import { main } from '../../index';

main().catch((error: Error) => {
  console.error('Failed running solver.');
  console.error(error);
  process.exit(1);
});
