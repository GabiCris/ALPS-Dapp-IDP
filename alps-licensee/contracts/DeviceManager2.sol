pragma solidity >=0.4.22 <0.9.0;

contract DeviceManager2 {
    string public licensee = "Licensee 1";
    // List of ips related to this device
    uint[] public ips = [1111, 5555];
    string public deviceName = "Device 2";
    uint public deviceId = 2000;
    string constant contractId = "DeviceManager2";

    // maps ip - contracts; actual mapping: uint IP id => address of contract
    mapping(uint => string) public ipContractsMap;

    constructor () public {
        ipContractsMap[ips[0]] = "0xb9Ad1B2549331FB0B667A65B2410c49Df5EF2E6D";
        ipContractsMap[ips[1]] = "Contract 5";
    }
    function setDeviceName(string memory x) public {
        deviceName = x;
    }

    function getContractType() public pure returns (string memory) {
        return contractId;
    }
    function getIps() public returns (uint []memory) {
        return ips;
    }
    function setLicensee(string memory x) public {
        licensee = x;
    }
}
