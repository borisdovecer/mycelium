import "@stdlib/deploy";
import "./messages";

contract JettonMycWallet with Deployable {

    parent: Address;
    owner: Address;
    balance: Int as coins;

    init(parent: Address, owner: Address) {
        self.parent = parent;
        self.owner = owner;
        self.balance = 0;
    }

    receive(msg: InternalAdd) {
        if (msg.origin == self.parent) {
            require(sender() == self.parent, "Parent Only!");
        } else {
            let init: StateInit = initOf JettonMycWallet(self.parent, msg.origin);
            require(sender() == contractAddress(init), "Some Error IDK...");
        }
        self.balance = self.balance + msg.amount;
    }

    receive(msg: Transfer){
        require(sender() == self.owner, "Access Denied!");
        require(self.balance >= msg.amount, "Insufficient Balance!!");
        self.balance = self.balance - msg.amount;
        let init: StateInit = initOf JettonMycWallet(self.parent, msg.to);
        send(SendParameters {
            to: contractAddress(init),
            body: InternalAdd{amount: msg.amount, origin: self.owner}.toCell(),
            value: ton("0.03"),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });
        self.reply("Transferred".asComment());
    }

}


