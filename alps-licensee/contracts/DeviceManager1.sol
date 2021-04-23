pragma solidity >=0.4.22 <0.9.0;

contract DeviceManager1 {
    string public licensee = "DM1 Licensee";
    string public licensor = "DM1 Licensor";
    // List of ips related to this device
    uint[] ips = [1111, 2222, 3333];
    string public deviceName = "Device 1";
    string constant contractId = "DeviceManager1";

    // maps ip - contracts; actual mapping: uint IP id => address of contract
    mapping(uint => string) public ipContractsMap;

    constructor () public {
        ipContractsMap[ips[0]] = "Contract 1";
        ipContractsMap[ips[1]] = "Contract 2";
        ipContractsMap[ips[2]] = "Contract 3";
    }

    function setDeviceName(string memory x) public {
        deviceName = x;
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
}
