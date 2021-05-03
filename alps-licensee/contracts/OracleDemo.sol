pragma solidity >=0.4.22 <0.9.0;

contract OracleDemo {
    mapping(uint256 => uint256) public deviceIdToNumber;
    mapping(uint256 => uint256) public deviceIdToPrice;

    constructor() public {
        deviceIdToNumber[1000] = 231;
        deviceIdToNumber[2000] = 570;
        deviceIdToPrice[1000] = 90;
        deviceIdToPrice[2000] = 17;
    }
}
