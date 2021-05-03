pragma solidity >=0.4.22 <0.9.0;

contract DeviceManager1 {
    string public licensee = "Licensee1";
    // List of ips related to this device
    uint[] public ips = [1111, 2222, 3333];
    string public deviceName = "Device 1";
    uint public deviceId = 1000;
    string constant contractId = "DeviceManager1";

    // maps ip - contracts; actual mapping: uint IP id => address of contract
    mapping(uint => string) public ipContractsMap;

    constructor () public {
        ipContractsMap[ips[0]] = "0xb9Ad1B2549331FB0B667A65B2410c49Df5EF2E6D";
        ipContractsMap[ips[1]] = "0xc2C41009E8826e932E194E04Bc08115e8EA1f558";
        ipContractsMap[ips[2]] = "0x09a1a5b12A8052329d575FdFF05F866299D82D66";
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
