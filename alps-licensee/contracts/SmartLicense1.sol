pragma solidity >=0.4.22 <0.9.0;

contract SmartLicense1 {
    string public licensee = "Licensee 1";
    string public licensor = "Other Specialty Stores";
    string public devices = "150";
    string public startDate = "10/08/2021";
    string public contractId = "SmartLicense1";
    uint256 public dueAmount = 100;

    constructor() public {
        setDevices("666");
    }

    function acknowledgePayment(uint256 amount) public {
        setDueAmount(dueAmount - amount);
    }

    function computeRoyalty(uint256 amount) public {
        setDueAmount(dueAmount + amount);
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
