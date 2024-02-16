import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MyceliymDao } from '../wrappers/MyceliymDao';
import '@ton/test-utils';

describe('MyceliymDao', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let myceliymDao: SandboxContract<MyceliymDao>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        myceliymDao = blockchain.openContract(await MyceliymDao.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await myceliymDao.send(
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
            to: myceliymDao.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and myceliymDao are ready to use
    });
});
