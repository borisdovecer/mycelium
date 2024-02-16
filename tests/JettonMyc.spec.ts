import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { JettonMyc } from '../wrappers/JettonMyc';
import '@ton/test-utils';

describe('JettonMyc', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonMyc: SandboxContract<JettonMyc>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonMyc = blockchain.openContract(await JettonMyc.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonMyc.send(
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
            to: jettonMyc.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonMyc are ready to use
    });
});
