import { toNano } from '@ton/core';
import { MyceliymDao } from '../wrappers/MyceliymDao';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const myceliymDao = provider.open(await MyceliymDao.fromInit());

    await myceliymDao.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(myceliymDao.address);

    // run methods on `myceliymDao`
}
