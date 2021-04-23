pragma solidity >=0.4.22 <0.9.0;

contract SmartLicense2 {
    string public licensee = "UMH Properties, Inc.";
    string public licensor = "Motor Vehicles";
    string public devices = "540";
    string public startDate = "10/08/2021";
    string constant contractId = "SmartLicense2";

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
