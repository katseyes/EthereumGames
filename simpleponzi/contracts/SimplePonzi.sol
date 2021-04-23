pragma solidity ^0.7.3;

contract SimplePonzi 
{
    address payable public currentInvestor;
    uint public currentInvestment = 0;
    
    //Declare an Event
    event Deposit(address indexed _from, uint _value);




    fallback () external payable 
    {
        // new investments must be 10% greater than current
        uint minimumInvestment = currentInvestment * 11/10;
        require(msg.value > minimumInvestment);
        // document new investor
        address payable previousInvestor = currentInvestor;
        currentInvestor = msg.sender;
        currentInvestment = msg.value;
        // payout previous investor
        previousInvestor.transfer(msg.value);

        //Emit an event
        emit Deposit(msg.sender, msg.value);
    }
}