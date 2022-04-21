// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Aggregator.sol";
import "./RoyaltyComputation.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface Manager {
    function updateAggregator(address) external;

    function updateRoyaltyComputation(address) external;

    function getRoyaltyHistoryList() external returns (uint256[] memory);
}

contract ManagerContract is Manager, Ownable {
    Aggregator aggregator;
    RoyaltyComputation royaltyComputation;
    uint256 public immutable creationDate;
    address public licensee;
    address public licensor;

    uint256 testVar = 123;

    constructor(
        address _aggregator,
        address _royaltyComputation,
        address _licensee,
        address _licensor,
        uint256 _testVar
    ) {
        aggregator = Aggregator(_aggregator);
        royaltyComputation = RoyaltyComputation(_royaltyComputation);
        licensor = _licensor;
        licensee = _licensee;
        creationDate = block.timestamp;
        testVar = _testVar;
    }

    function updateAggregator(address _aggregator) public onlyOwner override {
        aggregator = Aggregator(_aggregator);
    }

    function updateRoyaltyComputation(address _royaltyComputation) public onlyOwner override {
        royaltyComputation = RoyaltyComputation(_royaltyComputation);
    }

    // test input for dapp, format [royalty, time]
    function getRoyaltyHistoryList() external returns (uint256[] memory) {
        uint256[] memory hist =  new uint256[](4);
        hist[0] = block.timestamp % 1234;
        hist[1] = block.timestamp;
        hist[2] = block.timestamp % 5678;
        hist[3] = block.timestamp + 10000;
        return hist;
    }

}

