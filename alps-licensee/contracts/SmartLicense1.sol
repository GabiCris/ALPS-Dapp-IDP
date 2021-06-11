pragma solidity >=0.4.22 <0.9.0;

contract SmartLicense1 {
    string public licensee = "Licensee 1";
    event PaymentAcknowledged(uint256 _amount, uint256 _dueAmount, uint256 _timestamp);
    event RoyaltyComputed(uint256 _amount, uint256 _dueAmount, uint256 _timestamp, uint256 _deadline);
    string public licensor = "Other Specialty Stores";
    string public devices = "150";
    string public startDate = "10/08/2021";
    string public contractId = "SmartLicense1";
    uint256 public dueAmount = 100;
    uint256 public ip = 1111;
    uint256 aux_time = 0; 

    constructor() public {
        setDevices("666");
    }

    function acknowledgePayment(uint256 amount) public {
        setDueAmount(dueAmount - amount);
        emit PaymentAcknowledged(amount, dueAmount, block.timestamp);
    }

    function computeRoyalty(uint256 amount) public {
        setDueAmount(dueAmount + amount);
        aux_time = aux_time + 864000;
        emit RoyaltyComputed(amount, dueAmount, block.timestamp, block.timestamp + aux_time - 950400);
    }

    function getContractType() public returns (string memory) {
        return contractId;
    }

    function setLicensee(string memory x) public {
        licensee = x;
    }

    function setLicensor(string memory x) public {
        licensor = x;
    }

    function setDevices(string memory x) public {
        devices = x;
    }

    function setStartDate(string memory x) public {
        startDate = x;
    }

    function setDueAmount(uint256 x) public {
        dueAmount = x;
    }
}
