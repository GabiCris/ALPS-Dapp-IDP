pragma solidity >=0.4.22 <0.9.0;

contract SmartLicense2 {
    string public licensee = "Licensee 1";
    string public licensor = "Motor Vehicles";
    string public devices = "540";
    string public startDate = "10/08/2021";
    string constant contractId = "SmartLicense2";
    uint256 public dueAmount = 250;

    function acknowledgePayment(uint256 amount) public {
        setDueAmount(dueAmount - amount);
    }

    function computeRoyalty(uint256 amount) public {
        setDueAmount(dueAmount + amount);
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
