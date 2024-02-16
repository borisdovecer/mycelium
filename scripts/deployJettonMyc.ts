import { toNano } from '@ton/core';
import { JettonMyc } from '../wrappers/JettonMyc';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonMyc = provider.open(await JettonMyc.fromInit());

    await jettonMyc.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(jettonMyc.address);

    // run methods on `jettonMyc`
}
