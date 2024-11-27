import { main } from '../../index.js';

main().catch((error: Error) => {
  console.error('Failed creating a new solver.');
  console.error(error);
  process.exit(1);
});
