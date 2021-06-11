pragma solidity >=0.4.22 <0.9.0;

contract SmartLicense3 {
    string public licensee = "Licensee 1";
    string public licensor = "Radio And Television Broadcasting And Communications Equipment";
    string public devices = "320";
    string public startDate = "10/08/2021";
    string constant contractId = "SmartLicense3";
    uint256 public dueAmount = 1240;
    uint256 public ip = 5555;
    event PaymentAcknowledged(uint256 _amount, uint256 _dueAmount, uint256 _timestamp);
    event RoyaltyComputed(uint256 _amount, uint256 _dueAmount, uint256 _timestamp, uint256 _deadline);
    uint256 aux_time = 0; 

    function acknowledgePayment(uint256 amount) public {
        setDueAmount(dueAmount - amount);
        emit PaymentAcknowledged(amount, dueAmount, block.timestamp);
    }

    function computeRoyalty(uint256 amount) public {
        setDueAmount(dueAmount + amount);
        aux_time = aux_time + 864000;
        emit RoyaltyComputed(amount, dueAmount, block.timestamp, block.timestamp + aux_time - 950400);
    }
    function setDueAmount(uint256 x) public {
        dueAmount = x;
    }

    function getContractType() public pure returns (string memory) {
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
}
