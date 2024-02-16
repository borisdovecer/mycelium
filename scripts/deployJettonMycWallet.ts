import { toNano } from '@ton/core';
import { JettonMycWallet } from '../wrappers/JettonMycWallet';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonMycWallet = provider.open(await JettonMycWallet.fromInit());

    await jettonMycWallet.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(jettonMycWallet.address);

    // run methods on `jettonMycWallet`
}
