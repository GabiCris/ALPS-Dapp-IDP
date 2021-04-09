pragma solidity >=0.4.22 <0.9.0;

contract DeviceManager2 {
    // List of ips related to this device
    uint[] ips = [1111, 5555];
    string public deviceName = "Device 2";

    // maps ip - contracts; actual mapping: uint IP id => address of contract
    mapping(uint => string) public ipContractsMap;

    constructor () public {
        ipContractsMap[ips[0]] = "Contract 1";
        ipContractsMap[ips[1]] = "Contract 5";
    }
    function setDeviceName(string memory x) public {
        deviceName = x;
    }
}
