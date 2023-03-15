import { initializeSetup, startSetup } from './setup';
import { getEnvOrFail, log, successConnectionMsg } from '@utils/index';

const { server } = initializeSetup();

const PORT = getEnvOrFail('PORT');

void (async () => {
  try {
    await startSetup(server);
    server.listen(PORT, () =>
      successConnectionMsg(`${String.fromCodePoint(0x1f680)} Server is running on port ${PORT}`)
    );
  } catch (error) {
    log(error);
    process.exitCode = 1;
  }
})();
