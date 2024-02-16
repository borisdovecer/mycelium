import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { JettonMycWallet } from '../wrappers/JettonMycWallet';
import '@ton/test-utils';

describe('JettonMycWallet', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonMycWallet: SandboxContract<JettonMycWallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonMycWallet = blockchain.openContract(await JettonMycWallet.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonMycWallet.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonMycWallet.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonMycWallet are ready to use
    });
});
