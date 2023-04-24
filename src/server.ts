import { initializeSetup, startSetup } from './setup';
import { getEnvOrFail, log, rocketEmoji, successConnectionMsg } from '@jym272ticketing/common/dist/utils';

const { server } = initializeSetup();

const PORT = getEnvOrFail('PORT');
// some comment
void (async () => {
  try {
    await startSetup(server);
    server.listen(PORT, () => successConnectionMsg(`${rocketEmoji} Server is running on port ${PORT}`));
  } catch (error) {
    log(error);
    process.exitCode = 1;
  }
})();
